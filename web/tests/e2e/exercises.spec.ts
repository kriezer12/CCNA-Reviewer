import { expect, test } from "@playwright/test"

test("solve a subnet case, inspect field feedback, and reset without recording activity", async ({
  page,
}) => {
  const writes: string[] = []
  page.on("request", (request) => {
    if (request.method() === "POST" && !request.url().includes("/__test/"))
      writes.push(request.url())
  })
  await page.goto("/exercises/subnetting?seed=exercise-20")
  await expect(
    page.getByRole("heading", {
      name: "IPv4 subnetting practice",
      exact: true,
    }),
  ).toBeVisible()
  await expect(page.getByText("192.0.2.77/27", { exact: true })).toBeVisible()
  await expect(
    page.getByText("Worked solution", { exact: true }),
  ).not.toBeVisible()
  await page.getByLabel("Network address", { exact: true }).fill("192.0.2.64")
  await page.getByLabel("Broadcast address", { exact: true }).fill("192.0.2.95")
  await page.getByLabel("Subnet mask", { exact: true }).fill("255.255.255.224")
  await page.getByLabel("Usable host count", { exact: true }).fill("32")
  await page.getByRole("button", { name: "Check answers", exact: true }).click()
  await expect(page.getByRole("status")).toContainText("3 of 4 fields correct")
  await expect(page.getByText("Expected: 30", { exact: true })).toBeVisible()
  await expect(
    page.getByRole("heading", { name: "Worked solution", exact: true }),
  ).toBeVisible()
  await page
    .getByRole("button", { name: "Try this case again", exact: true })
    .click()
  await expect(page.getByLabel("Network address", { exact: true })).toHaveValue(
    "",
  )
  await expect(
    page.getByRole("heading", { name: "Worked solution", exact: true }),
  ).not.toBeVisible()
  await page.getByRole("button", { name: "New case", exact: true }).click()
  await expect(page).not.toHaveURL(/seed=exercise-20/)
  await expect(
    page.getByText("192.0.2.77/27", { exact: true }),
  ).not.toBeVisible()
  expect(writes).toEqual([])
})

test("subnet exercises are keyboard usable and fit narrow and text-scaled screens", async ({
  page,
}) => {
  await page.goto("/exercises/subnetting?seed=exercise-20")
  await page.getByLabel("Network address", { exact: true }).focus()
  await page.keyboard.type("999.0.2.64")
  await page.keyboard.press("Tab")
  await expect(
    page.getByLabel("Broadcast address", { exact: true }),
  ).toBeFocused()
  await page.getByRole("button", { name: "Check answers", exact: true }).click()
  await expect(
    page.getByLabel("Network address", { exact: true }),
  ).toHaveAttribute("aria-invalid", "true")
  await expect(
    page.getByRole("heading", { name: "Worked solution", exact: true }),
  ).toBeFocused()
  await expect(
    page.getByText(/Enter a valid dotted-decimal address/).first(),
  ).toBeVisible()
  for (const width of [360, 390, 640, 1280]) {
    await page.setViewportSize({ width, height: 900 })
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    )
    expect(overflow, `document overflow at ${width}px`).toBe(false)
  }
  await page.addStyleTag({ content: "html { font-size: 200% !important; }" })
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    ),
  ).toBe(false)
  await page.screenshot({
    path: ".playwright/subnet-exercise-text-scale.png",
    fullPage: true,
  })
  await page
    .getByRole("button", { name: "Try this case again", exact: true })
    .click()
  await expect(
    page.getByLabel("Network address", { exact: true }),
  ).toBeFocused()
  await expect(
    page.getByLabel("Network address", { exact: true }),
  ).toBeEnabled()
})
