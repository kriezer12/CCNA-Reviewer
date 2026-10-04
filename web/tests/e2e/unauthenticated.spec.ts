import { expect, test } from "@playwright/test"

test("protected routes redirect unsigned visitors to sign in", async ({
  page,
}) => {
  for (const route of [
    "/roadmap/week/01",
    "/learn",
    "/learn/1.9",
    "/learn/unknown",
    "/practice",
    "/command-drills",
  ]) {
    await page.goto(route)
    await expect(page).toHaveURL(/\/login\?error=auth-required$/)
    await expect(
      page.getByRole("heading", { name: "Welcome to CCNA Reviewer" }),
    ).toBeVisible()
  }
})
