import { expect, test } from "@playwright/test"

test("protected routes redirect unsigned visitors to sign in", async ({ page }) => {
  await page.goto("/roadmap/week/01")
  await expect(page).toHaveURL(/\/login\?error=auth-required$/)
  await expect(page.getByRole("heading", { name: "Welcome to CCNA Reviewer" })).toBeVisible()
})
