import { expect, test } from "@playwright/test"

const authService = "http://127.0.0.1:54321"

test("command drill index keeps answers hidden and selected drills reset through history", async ({ page, request }) => {
  await request.delete(`${authService}/__test/requests`)
  await page.goto("/command-drills")
  await expect(page.getByRole("region", { name: "Command drills" })).toBeVisible()
  await expect(page.getByText("show ip interface brief", { exact: true })).toHaveCount(0)
  await expect(page.getByRole("link", { name: /Open Read interface state/ })).toHaveAttribute("href", "/command-drills?drill=interfaces")

  await page.goto("/command-drills?drill=interfaces")
  await expect(page.getByRole("heading", { name: "Read interface state" })).toBeVisible()
  await expect(page.getByText("show ip interface brief", { exact: true })).toHaveCount(0)
  await expect(page.getByText("Illustrative output", { exact: false })).toHaveCount(0)
  const command = page.getByRole("textbox", { name: "Your command (optional)" })
  await command.fill("show ip int brief")
  await page.getByRole("button", { name: "Reveal answer" }).focus()
  await page.keyboard.press("Enter")
  await expect(page.getByText("show ip interface brief", { exact: true })).toBeVisible()
  await expect(command).toHaveValue("show ip int brief")
  await expect(page.getByText(/Illustrative output — not run against a real device/)).toBeVisible()
  await expect(page.getByRole("link", { name: /Open L01:/ })).toHaveAttribute("href", "/labs/L01")

  await page.getByRole("button", { name: "Try again" }).click()
  await expect(command).toHaveValue("")
  await expect(page.getByText("show ip interface brief", { exact: true })).toHaveCount(0)
  await page.getByRole("button", { name: "Reveal answer" }).click()
  await page.getByRole("link", { name: "Next drill" }).click()
  await expect(page).toHaveURL(/drill=vlans/)
  await expect(page.getByRole("heading", { name: "Inspect VLAN membership" })).toBeVisible()
  await page.goBack()
  await expect(page).toHaveURL(/drill=interfaces/)
  await expect(page.getByText("show ip interface brief", { exact: true })).toHaveCount(0)
  await page.reload()
  await expect(page.getByText("show ip interface brief", { exact: true })).toHaveCount(0)
  await page.goForward()
  await expect(page).toHaveURL(/drill=vlans/)
  await expect(page.getByText("show vlan brief", { exact: true })).toHaveCount(0)

  const writes = await request.get(`${authService}/__test/requests`).then((response) => response.json()) as Array<{ method?: string; table?: string }>
  expect(writes.filter((item) => item.table && item.method !== "GET")).toEqual([])
})

test("invalid drill is recoverable and selected practice fits narrow screens", async ({ page }) => {
  await page.goto("/command-drills?drill=unknown")
  await expect(page.getByText("Drill not found")).toBeVisible()
  await page.getByRole("link", { name: /Browse command drills/ }).click()
  await expect(page).toHaveURL(/\/command-drills$/)
  await page.goto("/command-drills?drill=acls")
  await expect(page.getByRole("link", { name: "Next drill" })).toHaveAttribute("href", "/command-drills?drill=interfaces")

  for (const width of [360, 390, 1280]) {
    await page.setViewportSize({ width, height: 800 })
    await page.goto("/command-drills?drill=acls")
    await page.getByRole("button", { name: "Reveal answer" }).click()
    await expect(page.getByText("show access-lists", { exact: true })).toBeVisible()
    const documentWidth = await page.evaluate(() => document.documentElement.scrollWidth)
    expect(documentWidth).toBeLessThanOrEqual(width + 1)
    const reveal = page.getByRole("button", { name: "Try again" })
    expect((await reveal.boundingBox())?.height ?? 0).toBeGreaterThanOrEqual(44)
  }
})
