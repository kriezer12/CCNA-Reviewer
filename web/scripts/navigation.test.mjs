import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const scriptsDirectory = dirname(fileURLToPath(import.meta.url))
const webDirectory = dirname(scriptsDirectory)
const shellPath = join(webDirectory, "src", "components", "dashboard", "dashboard-shell.tsx")
const shell = await readFile(shellPath, "utf8")

const routes = ["/", "/roadmap", "/labs", "/command-drills", "/readiness"]
for (const route of routes) {
  const pagePath = route === "/" ? join(webDirectory, "src", "app", "page.tsx") : join(webDirectory, "src", "app", route.slice(1), "page.tsx")
  await readFile(pagePath, "utf8")
  assert.match(shell, new RegExp(`href: "${route.replace("/", "\\/")}"`), `navigation should link to ${route}`)
}

assert.match(shell, /aria-current=\{isActive \? "page" : undefined\}/)
const roadmapPage = await readFile(join(webDirectory, "src", "app", "roadmap", "page.tsx"), "utf8")
const roadmapDetailPage = await readFile(join(webDirectory, "src", "app", "roadmap", "week", "[week]", "page.tsx"), "utf8")
assert.match(roadmapPage, /href=\{item\.href\}/)
assert.match(roadmapPage, /Open \$\{item\.label\} detail/)
assert.match(roadmapDetailPage, /getRoadmapWeek\(weekParam\)/)
assert.match(roadmapDetailPage, /const user = await requireOwner\(\)/)
console.log("navigation route checks passed")
