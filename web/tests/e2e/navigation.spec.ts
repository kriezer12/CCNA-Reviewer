import { expect, test, type APIRequestContext } from "@playwright/test"

const authService = "http://127.0.0.1:54321"

test("Study today opens the selected objective, mapped drill, and exact lab without recording activity", async ({ page, request }) => {
  await page.goto("/")
  await page.screenshot({ path: "test-results/study-today-desktop.png", fullPage: true, animations: "disabled" })
  const firstAction = page.getByRole("link", { name: /Continue Week 01: 1\.1/ })
  await expect(firstAction).toHaveAttribute("href", "/roadmap/week/01#objective-1-1")
  await firstAction.click()
  await expect(page).toHaveURL(/\/roadmap\/week\/01#objective-1-1$/)
  await expect(page.locator("#objective-1-1")).toBeVisible()

  await request.post(`${authService}/__test/config`, { data: { rows: { topic_progress: [
    { objective_id: "1.1", status: "complete", updated_at: "2026-10-01T00:00:00Z", completed_at: "2026-10-01T00:00:00Z" },
    { objective_id: "1.3", status: "complete", updated_at: "2026-10-01T00:00:00Z", completed_at: "2026-10-01T00:00:00Z" },
    { objective_id: "1.4", status: "in_progress", updated_at: "2026-10-01T00:00:00Z", completed_at: null },
  ] } } })
  await request.delete(`${authService}/__test/requests`)
  await page.goto("/")
  await expect(page.getByRole("link", { name: /Continue Week 01: 1\.4/ })).toBeVisible()
  await page.getByRole("link", { name: "Practice Read interface state" }).click()
  await expect(page).toHaveURL(/\/command-drills\?drill=interfaces$/)
  await page.getByRole("link", { name: /Open L01:/ }).click()
  await expect(page).toHaveURL(/\/labs\/L01$/)
  const requests = await (await request.get(`${authService}/__test/requests`)).json() as { method: string; table?: string }[]
  expect(requests.filter((entry) => entry.table && entry.method !== "GET")).toEqual([])
})

test("saved lesson understanding updates Study today on the next dashboard render", async ({ page }) => {
  await page.goto("/roadmap/week/01")
  await page.getByRole("combobox", { name: "Lesson status" }).click()
  await page.getByRole("option", { name: "Complete" }).click()
  await page.getByRole("button", { name: "Save understanding" }).click()
  await expect(page.getByRole("button", { name: "Saved" })).toBeVisible()
  await page.goto("/")
  await expect(page.getByRole("link", { name: /Continue Week 01: 1\.3/ })).toBeVisible()
})

test("Study today and lab workspace fit narrow and zoom-equivalent viewports", async ({ page }) => {
  for (const width of [360, 390, 640]) {
    await page.setViewportSize({ width, height: 800 })
    await page.goto("/")
    await expect(page.getByRole("heading", { name: /1\.1 · Explain the role/ })).toBeVisible()
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width + 1)
    const action = page.getByRole("link", { name: /Continue Week 01: 1\.1/ })
    expect((await action.boundingBox())?.height ?? 0).toBeGreaterThanOrEqual(44)
    if (width === 360) await page.screenshot({ path: "test-results/study-today-phone.png", fullPage: true, animations: "disabled" })

    await page.goto("/labs/L06")
    await expect(page.getByRole("heading", { name: "L06: Bundle the uplinks" })).toBeVisible()
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width + 1)
    if (width === 360) await page.screenshot({ path: "test-results/lab-workspace-phone.png", fullPage: true, animations: "disabled" })
  }
})

test("lab queue and roadmap open a specific source-grounded workspace", async ({ page, request }) => {
  await page.goto("/labs")
  await expect(page.getByRole("link", { name: /L06 Bundle the uplinks/ })).toBeVisible()
  await page.getByRole("link", { name: /L06 Bundle the uplinks/ }).click()
  await expect(page).toHaveURL(/\/labs\/L06$/)
  await expect(page.getByRole("heading", { name: "L06: Bundle the uplinks" })).toBeVisible()
  await page.screenshot({ path: "test-results/lab-workspace-desktop.png", fullPage: true, animations: "disabled" })
  await expect(page.getByText("Layer 2 evidence alone does not complete L06.")).toBeVisible()
  await expect(page.getByRole("heading", { name: "Verification" })).toBeVisible()
  const preparation = page.getByRole("checkbox").first()
  await preparation.check()
  await expect(preparation).toBeChecked()
  await page.getByRole("link", { name: "Week 04" }).click()
  await page.getByRole("link", { name: "Open lab workspace" }).first().click()
  await expect(page).toHaveURL(/\/labs\/L05$/)
  await request.delete(`${authService}/__test/requests`)
  await page.goto("/labs/invalid")
  await expect(page.getByText(/not found|404/i).first()).toBeVisible()
  const writes = (await (await request.get(`${authService}/__test/requests`)).json()).filter((entry: { method: string }) => entry.method !== "GET")
  expect(writes).toEqual([])
})

test("lab evidence requires a note, saves only this lab, and guards edits", async ({ page, request }) => {
  await page.goto("/labs/L01")
  await page.getByLabel("Lab status").selectOption("complete")
  await page.getByRole("button", { name: "Save lab evidence" }).click()
  await expect(page.getByText("Add an evidence note before recording a completed demonstration.")).toBeVisible()
  await page.getByLabel(/Evidence note/).fill("Switch and two clients; saved configuration, interface and MAC output, reload check observed.")
  await request.delete(`${authService}/__test/requests`)
  await page.getByRole("button", { name: "Save lab evidence" }).click()
  await expect(page.getByRole("status")).toContainText("Saved")
  const requests = await (await request.get(`${authService}/__test/requests`)).json() as { method: string; table?: string }[]
  expect(requests.filter((entry) => entry.method === "POST" && entry.table === "lab_progress")).toHaveLength(1)
  expect(requests.filter((entry) => entry.table === "topic_progress" || entry.table === "study_sessions" || entry.table === "quiz_attempts")).toHaveLength(0)
  await page.getByLabel(/Evidence note/).fill("unsaved change")
  page.once("dialog", (dialog) => dialog.dismiss())
  await page.getByRole("link", { name: "Labs", exact: true }).first().click()
  await expect(page).toHaveURL(/\/labs\/L01$/)
  await expect(page.getByLabel(/Evidence note/)).toHaveValue("unsaved change")
})

test("lab instructions remain readable when progress fails, then evidence edits can be retried", async ({ page, request }) => {
  await request.post(`${authService}/__test/config`, { data: { failReads: ["lab_progress"] } })
  await page.goto("/labs/L01")
  await expect(page.getByRole("heading", { name: "Brief" })).toBeVisible()
  await expect(page.getByText(/Saved evidence is unavailable/)).toBeVisible()
  await expect(page.getByLabel("Lab status")).toHaveCount(0)

  await request.post(`${authService}/__test/config`, { data: {} })
  await page.getByRole("button", { name: "Retry" }).click()
  await expect(page.getByLabel("Lab status")).toBeVisible()
  await page.getByLabel(/Evidence note/).fill("Topology and output remain in the form after a failed write.")
  await request.post(`${authService}/__test/config`, { data: { failWrites: ["lab_progress"] } })
  await page.getByRole("button", { name: "Save lab evidence" }).click()
  await expect(page.getByText(/Could not save the lab evidence/)).toBeVisible()
  await expect(page.getByLabel(/Evidence note/)).toHaveValue("Topology and output remain in the form after a failed write.")
  await expect(page.getByRole("status").filter({ hasText: "Saved" })).toHaveCount(0)

  await request.post(`${authService}/__test/config`, { data: {} })
  await page.getByRole("button", { name: "Save lab evidence" }).click()
  await expect(page.getByText("Saved. Lab progress refreshed.")).toBeVisible()
})

test("lab evidence guards browser Back and reload until edits are discarded", async ({ page }) => {
  await page.goto("/labs")
  await page.getByRole("link", { name: /L01/ }).first().click()
  await page.getByLabel(/Evidence note/).fill("Unsaved evidence")

  page.once("dialog", (dialog) => dialog.dismiss())
  await page.goBack({ waitUntil: "domcontentloaded" }).catch(() => null)
  await expect(page).toHaveURL(/\/labs\/L01$/)
  await expect(page.getByLabel(/Evidence note/)).toHaveValue("Unsaved evidence")

  page.once("dialog", (dialog) => dialog.dismiss())
  await page.evaluate(() => window.location.reload()).catch(() => null)
  await expect(page).toHaveURL(/\/labs\/L01$/)
  await expect(page.getByLabel(/Evidence note/)).toHaveValue("Unsaved evidence")

  page.once("dialog", (dialog) => dialog.accept())
  await page.getByRole("link", { name: "Labs", exact: true }).first().click()
  await expect(page).toHaveURL(/\/labs$/)
})

test("expired session cannot report a successful lab save", async ({ page, request }) => {
  await page.goto("/labs/L01")
  await page.getByLabel(/Evidence note/).fill("Evidence to retry after signing in")
  await request.post(`${authService}/__test/config`, { data: { expireAuth: true } })
  await page.getByRole("button", { name: "Save lab evidence" }).click()
  await expect(page.getByText(/Your session expired/)).toBeVisible()
  await expect(page.getByLabel(/Evidence note/)).toHaveValue("Evidence to retry after signing in")
  await expect(page.getByText("Saved. Lab progress refreshed.")).toHaveCount(0)
})

test("desktop navigation stays mounted and loads only route data", async ({ page, request }) => {
  await page.goto("/")
  await expect(page.getByRole("heading", { name: /Build the route\./ })).toBeVisible()
  await expect(page.getByRole("region", { name: "Progress analytics" })).toBeVisible()
  await expect(page.getByText("Recent study activity", { exact: true })).toBeVisible()
  await expect(page.getByText("Choose where to work next.")).toHaveCount(0)

  await request.delete(`${authService}/__test/requests`)
  await request.post(`${authService}/__test/config`, { data: { delayMs: 350 } })

  const nav = page.getByRole("navigation", { name: "Main navigation" }).first()
  await nav.evaluate((element) => element.setAttribute("data-persistent-navigation", "mounted"))
  const startedAt = Date.now()
  await nav.getByRole("link", { name: "Roadmap" }).click()
  await expect(page.getByTestId("route-loading")).toBeVisible({ timeout: 1_000 })
  const shellReadyMs = Date.now() - startedAt
  await expect(page.getByRole("heading", { name: "A route you can actually finish." })).toBeVisible({ timeout: 5_000 })
  const contentReadyMs = Date.now() - startedAt
  expect(contentReadyMs).toBeLessThan(5_000)
  console.log(`Navigation with 350ms database delay: shell ${shellReadyMs}ms, content ${contentReadyMs}ms`)
  await expect(nav.getByRole("link", { name: "Roadmap" })).toHaveAttribute("aria-current", "page")
  await expect(nav).toHaveAttribute("data-persistent-navigation", "mounted")

  let tables = await readTables(request)
  expect(tables).toContain("topic_progress")
  expect(tables).not.toContain("lab_progress")
  expect(tables).not.toContain("study_sessions")
  expect(tables).not.toContain("quiz_attempts")

  await request.delete(`${authService}/__test/requests`)
  await page.getByRole("link", { name: "Open Week 01 detail" }).click()
  await expect(page.getByRole("heading", { name: "Make this week visible in your work." })).toBeVisible()
  await expect(page.getByRole("heading", { name: "Objectives for this week." })).toBeVisible()
  tables = await readTables(request)
  expect(tables).toContain("topic_progress")
  expect(tables).toContain("lab_progress")
  expect(tables).not.toContain("study_sessions")
  expect(tables).not.toContain("quiz_attempts")

  await request.delete(`${authService}/__test/requests`)
  await nav.getByRole("link", { name: "Labs" }).click()
  await expect(page.getByRole("heading", { name: "Make the topology prove it." })).toBeVisible()
  tables = await readTables(request)
  expect(tables).toContain("lab_progress")
  expect(tables).not.toContain("topic_progress")
  expect(tables).not.toContain("study_sessions")
  expect(tables).not.toContain("quiz_attempts")

  await nav.getByRole("link", { name: "Readiness" }).click()
  await expect(page.getByRole("heading", { name: "Know what deserves the next hour." })).toBeVisible()
  await nav.getByRole("link", { name: "Command drills" }).click()
  await expect(page.getByRole("heading", { name: "Short drills. Better verification." })).toBeVisible()
  await nav.getByRole("link", { name: "Dashboard" }).click()
  await expect(page.getByRole("heading", { name: /Build the route\./ })).toBeVisible()

  await request.post(`${authService}/__test/config`, { data: { delayMs: 0 } })
})

test("readiness checkpoint launches in a centered dialog and saves a step-by-step attempt", async ({ page, request }) => {
  await request.delete(`${authService}/__test/requests`)
  await page.goto("/readiness")
  await expect(page.getByRole("heading", { name: "Know what deserves the next hour." })).toBeVisible()
  await expect(page.getByRole("region", { name: "Readiness signals" })).toBeVisible()
  await expect(page.getByText("Which transport protocol provides sequencing and acknowledgements?")).toHaveCount(0)

  await page.getByRole("button", { name: "Start checkpoint" }).click()
  const dialog = page.getByRole("dialog")
  await expect(dialog).toBeVisible()
  const dialogBox = await dialog.boundingBox()
  await page.screenshot({ path: "test-results/readiness-checkpoint-desktop.png", animations: "disabled" })
  expect(dialogBox).not.toBeNull()
  expect(dialogBox?.width ?? 0).toBeGreaterThan(550)
  expect(Math.abs((dialogBox?.x ?? 0) + (dialogBox?.width ?? 0) / 2 - 1280 / 2)).toBeLessThan(2)
  await expect(dialog.getByRole("heading", { name: "Choose your exam domain" })).toBeVisible()

  const domainSelect = dialog.getByRole("combobox", { name: "Quiz domain" })
  const triggerBox = await domainSelect.boundingBox()
  expect(triggerBox?.width ?? 0).toBeGreaterThan(300)
  await domainSelect.click()
  const finalDomainOption = page.getByRole("option", { name: /6\.0 · Automation and Programmability/ })
  await expect(finalDomainOption).toBeVisible()
  const popupBox = await page.locator('[data-slot="select-content"]').boundingBox()
  await page.screenshot({ path: "test-results/readiness-domain-picker-desktop.png", animations: "disabled" })
  expect(popupBox?.width ?? 0).toBeGreaterThan(300)
  expect(Math.abs((popupBox?.width ?? 0) - (triggerBox?.width ?? 0))).toBeLessThan(24)
  expect(await finalDomainOption.evaluate((element) => element.scrollWidth <= element.clientWidth + 1)).toBe(true)

  await page.keyboard.press("End")
  await page.keyboard.press("Enter")
  await expect(domainSelect).toContainText("6.0 · Automation and Programmability")
  await domainSelect.click()
  await page.getByRole("option", { name: /1\.0 · Network Fundamentals/ }).click()
  await dialog.getByRole("button", { name: "Begin checkpoint" }).click()

  await expect(dialog.getByRole("heading", { name: "Question 1 of 10" })).toBeVisible()
  await expect(dialog.getByText("How many usable host addresses are in a /27 IPv4 subnet?")).toHaveCount(0)
  const next = dialog.getByRole("button", { name: "Next question" })
  await expect(next).toBeDisabled()
  const firstAnswer = dialog.getByRole("button", { name: "A UDP" })
  await firstAnswer.click()
  await expect(firstAnswer).toHaveAttribute("aria-pressed", "true")
  await expect(next).toBeEnabled()
  await next.click()
  await expect(dialog.getByRole("heading", { name: "Question 2 of 10" })).toBeVisible()
  await dialog.getByRole("button", { name: "Back" }).click()
  await expect(dialog.getByRole("button", { name: "A UDP" })).toHaveAttribute("aria-pressed", "true")

  await dialog.getByRole("button", { name: "Next question" }).click()
  for (let currentQuestion = 2; currentQuestion <= 10; currentQuestion++) {
    await expect(dialog.getByRole("heading", { name: `Question ${currentQuestion} of 10` })).toBeVisible()
    const answerA = dialog.getByRole("button", { name: /^A / })
    await answerA.click()
    if (currentQuestion < 10) {
      await dialog.getByRole("button", { name: "Next question" }).click()
    }
  }

  await expect(dialog.getByRole("heading", { name: "Question 10 of 10" })).toBeVisible()
  await expect(dialog.getByRole("button", { name: "Save checkpoint" })).toBeEnabled()
  await dialog.getByRole("button", { name: "Save checkpoint" }).click()
  await expect(dialog.getByText("Attempt saved")).toBeVisible()
  await expect(dialog.getByRole("heading", { name: /%/ })).toBeVisible()

  const requests = await request.get(`${authService}/__test/requests`).then((response) => response.json()) as Array<{ method?: string; table?: string }>
  expect(requests).toContainEqual(expect.objectContaining({ method: "POST", table: "quiz_attempts" }))

  await dialog.getByRole("button", { name: "Review answers" }).click()
  await expect(dialog.getByRole("heading", { name: "Review 1 of 10" })).toBeVisible()
  await expect(dialog.getByText("Why", { exact: true })).toBeVisible()
  await dialog.getByRole("button", { name: "Next answer" }).click()
  await expect(dialog.getByRole("heading", { name: "Review 2 of 10" })).toBeVisible()
})

test.afterEach(async ({ request }) => {
  await request.post(`${authService}/__test/config`, { data: { delayMs: 0 } })
})

async function readTables(request: APIRequestContext) {
  const response = await request.get(`${authService}/__test/requests`)
  const rows = await response.json() as Array<{ table?: string }>
  return [...new Set(rows.flatMap((row) => row.table ? [row.table] : []))]
}
