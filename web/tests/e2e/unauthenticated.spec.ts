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
    "/review",
    "/bookmarks",
    "/command-drills",
    "/exercises",
    "/exercises/subnetting",
  ]) {
    await page.goto(route)
    await expect(page).toHaveURL(/\/login\?error=auth-required$/)
    await expect(
      page.getByRole("heading", { name: "Welcome to CCNA Reviewer" }),
    ).toBeVisible()
  }
})

test("review answer writes require authenticated access", async ({request}) => {
  const response = await request.post("/api/review-checks", {data:{questionId:"ipv4-network-1",contentRevision:1,selectedChoice:"A"}})
  expect(response.status()).toBe(401)
})
