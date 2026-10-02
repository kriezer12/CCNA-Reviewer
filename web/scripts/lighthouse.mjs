import { spawn } from "node:child_process"
import { mkdir, readFile, writeFile } from "node:fs/promises"
import { setTimeout as delay } from "node:timers/promises"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import lighthouse from "lighthouse"
import { launch } from "chrome-launcher"
import { chromium } from "@playwright/test"

const webDirectory = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const serverScript = resolve(webDirectory, "scripts", "playwright-server.mjs")
const authStatePath = resolve(webDirectory, ".playwright", "owner.json")
const reportDirectory = resolve(webDirectory, "lighthouse-reports")
const chromeProfileDirectory = resolve(webDirectory, ".playwright", "lighthouse-profile")
const baseURL = "http://127.0.0.1:3002"
const reportRoutes = [
  { name: "login", path: "/login", authenticated: false },
  { name: "dashboard", path: "/", authenticated: true },
  { name: "roadmap", path: "/roadmap", authenticated: true },
  { name: "roadmap-week", path: "/roadmap/week/01", authenticated: true },
  { name: "labs", path: "/labs", authenticated: true },
  { name: "lab-workspace", path: "/labs/L01", authenticated: true },
  { name: "command-drill", path: "/command-drills?drill=interfaces", authenticated: true },
  { name: "readiness", path: "/readiness", authenticated: true },
]

await mkdir(reportDirectory, { recursive: true })
await mkdir(dirname(authStatePath), { recursive: true })
await mkdir(chromeProfileDirectory, { recursive: true })
const server = spawn(process.execPath, [serverScript], {
  cwd: webDirectory,
  stdio: "inherit",
  env: { ...process.env, NEXT_DIST_DIR: ".next-e2e", E2E_RESPONSE_DELAY_MS: "0" },
})

let browser
let chrome

try {
  await waitForServer(`${baseURL}/login`, server)
  await fetch("http://127.0.0.1:54321/__test/config", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ delayMs: 0 }),
  })

  browser = await chromium.launch({ headless: true })
  const context = await browser.newContext()
  const page = await context.newPage()
  await page.goto(`${baseURL}/login`)
  await page.getByLabel("Email").fill("owner@e2e.test")
  await page.getByLabel("Password").fill("local-e2e-password")
  await page.getByRole("button", { name: "Sign in" }).click()
  await page.waitForURL(`${baseURL}/`)
  await context.storageState({ path: authStatePath })
  const storageState = JSON.parse(await readFile(authStatePath, "utf8"))
  const cookieHeader = storageState.cookies
    .filter((cookie) => cookie.domain.includes("127.0.0.1"))
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ")
  await browser.close()
  browser = undefined

  chrome = await launch({
    userDataDir: chromeProfileDirectory,
    chromeFlags: ["--headless=new", "--no-sandbox", "--disable-gpu"],
    logLevel: "error",
  })

  const summary = []
  for (const route of reportRoutes) {
    const result = await lighthouse(`${baseURL}${route.path}`, {
      port: chrome.port,
      output: ["json", "html"],
      logLevel: "error",
      onlyCategories: ["performance", "accessibility", "best-practices"],
      extraHeaders: route.authenticated && cookieHeader ? { Cookie: cookieHeader } : undefined,
    })
    if (!result) throw new Error(`Lighthouse returned no result for ${route.path}`)

    await writeFile(resolve(reportDirectory, `${route.name}.json`), result.report[0])
    await writeFile(resolve(reportDirectory, `${route.name}.html`), result.report[1])
    summary.push({
      route: route.path,
      performance: result.lhr.categories.performance.score,
      accessibility: result.lhr.categories.accessibility.score,
      bestPractices: result.lhr.categories["best-practices"].score,
      fcpMs: result.lhr.audits["first-contentful-paint"].numericValue,
      lcpMs: result.lhr.audits["largest-contentful-paint"].numericValue,
      tbtMs: result.lhr.audits["total-blocking-time"].numericValue,
      cls: result.lhr.audits["cumulative-layout-shift"].numericValue,
      totalBytes: result.lhr.audits["total-byte-weight"].numericValue,
    })
    console.log(`${route.path}: ${Math.round((result.lhr.categories.performance.score ?? 0) * 100)} performance`)
  }

  await writeFile(resolve(reportDirectory, "summary.json"), `${JSON.stringify(summary, null, 2)}\n`)
  console.log(`Lighthouse reports saved in ${reportDirectory}`)
} finally {
  if (browser) await browser.close()
  if (chrome) chrome.kill()
  server.kill("SIGTERM")
  await new Promise((resolveExit) => {
    if (server.exitCode !== null) return resolveExit(undefined)
    server.once("exit", () => resolveExit(undefined))
    setTimeout(() => resolveExit(undefined), 5_000).unref()
  })
}

async function waitForServer(url, process) {
  const startedAt = Date.now()
  while (Date.now() - startedAt < 60_000) {
    if (process.exitCode !== null) throw new Error(`Test server exited with ${process.exitCode}`)
    try {
      const response = await fetch(url)
      if (response.ok) return
    } catch {
      // The Next.js production server is still starting.
    }
    await delay(250)
  }
  throw new Error(`Test server did not become ready at ${url}`)
}
