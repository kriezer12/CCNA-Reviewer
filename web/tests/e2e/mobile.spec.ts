import { expect, test } from "@playwright/test"

test("mobile navigation changes routes and keeps roadmap detail reachable", async ({ page }) => {
  await page.goto("/")
  await expect(page.getByRole("heading", { name: /Build the route\./ })).toBeVisible()

  const nav = page.getByRole("navigation", { name: "Main navigation" })
  await nav.getByRole("link", { name: "Roadmap" }).click()
  await expect(page.getByRole("heading", { name: "A route you can actually finish." })).toBeVisible()
  await expect(nav.getByRole("link", { name: "Roadmap" })).toHaveAttribute("aria-current", "page")

  await page.getByRole("link", { name: "Open Week 01 detail" }).click()
  await expect(page.getByRole("heading", { name: "Make this week visible in your work." })).toBeVisible()
  await expect(page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Roadmap" })).toHaveAttribute("aria-current", "page")
})

test("phone checkpoint dialog and domain menu fit the viewport without clipping", async ({ page }) => {
  await page.goto("/readiness")
  await page.getByRole("button", { name: "Start checkpoint" }).click()

  const dialog = page.getByRole("dialog")
  await expect(dialog).toBeVisible()
  const viewport = page.viewportSize()
  const dialogBox = await dialog.boundingBox()
  expect(viewport).not.toBeNull()
  expect(dialogBox).not.toBeNull()
  expect(Math.abs((dialogBox?.x ?? 0) + (dialogBox?.width ?? 0) / 2 - (viewport?.width ?? 0) / 2)).toBeLessThan(2)
  expect(dialogBox?.width ?? 0).toBeLessThanOrEqual((viewport?.width ?? 0) - 20)

  const scrollY = await page.evaluate(() => window.scrollY)
  await page.mouse.move(4, 4)
  await page.mouse.wheel(0, 500)
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(scrollY)

  const domainSelect = dialog.getByRole("combobox", { name: "Quiz domain" })
  const triggerBox = await domainSelect.boundingBox()
  expect(triggerBox?.width ?? 0).toBeGreaterThan(300)
  await domainSelect.click()

  const longDomainOption = page.getByRole("option", { name: /6\.0 · Automation and Programmability/ })
  await expect(longDomainOption).toBeVisible()
  const optionBox = await longDomainOption.boundingBox()
  expect(optionBox).not.toBeNull()
  expect(optionBox?.x ?? -1).toBeGreaterThanOrEqual(0)
  expect((optionBox?.x ?? 0) + (optionBox?.width ?? 0)).toBeLessThanOrEqual((viewport?.width ?? 0) + 1)
  expect(await longDomainOption.evaluate((element) => element.scrollWidth <= element.clientWidth + 1)).toBe(true)
  await page.screenshot({ path: "test-results/readiness-domain-picker-phone.png", animations: "disabled" })

  await longDomainOption.click()
  await dialog.getByRole("button", { name: "Begin checkpoint" }).click()
  await expect(dialog.getByRole("heading", { name: "Question 1 of 10" })).toBeVisible()
  expect(await dialog.evaluate((element) => element.scrollHeight <= element.clientHeight + 1)).toBe(true)
  await page.screenshot({ path: "test-results/readiness-question-phone.png", animations: "disabled" })

  const selectedAnswer = dialog.getByRole("button", { name: /^A / })
  await selectedAnswer.click()
  await dialog.getByRole("button", { name: "Close" }).click()
  await page.getByRole("button", { name: "Resume checkpoint" }).click()
  const resumedDialog = page.getByRole("dialog")
  await expect(resumedDialog.getByRole("heading", { name: "Question 1 of 10" })).toBeVisible()
  await expect(resumedDialog.getByRole("button", { name: /^A / })).toHaveAttribute("aria-pressed", "true")
})
