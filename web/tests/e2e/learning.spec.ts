import { expect, test } from "@playwright/test"
import { practiceQuestions } from "../../src/content/practice"

test("checkpoint practice reveals only on submit and retry-missed becomes guided", async ({
  page,
}) => {
  const question = practiceQuestions.find(
    (item) => item.id === "ipv6-eui64-flip",
  )!
  const wrong = question.choices.find(
    (item) => item.id !== question.correctOptionId,
  )!
  await page.goto("/practice?objective=1.9&feedback=checkpoint")
  await page
    .getByRole("button", { name: "Start practice", exact: true })
    .click()
  await page
    .getByRole("radio", { name: `${wrong.id}. ${wrong.text}`, exact: true })
    .check()
  await expect(
    page.getByText(question.explanation, { exact: true }),
  ).not.toBeVisible()
  await page
    .getByRole("button", { name: "Finish and review", exact: true })
    .click()
  await expect(
    page.getByRole("heading", { name: "Practice result: 0 / 1", exact: true }),
  ).toBeVisible()
  await page
    .getByRole("button", { name: "Retry missed (1)", exact: true })
    .click()
  await expect(
    page.getByRole("button", { name: "Check answer", exact: true }),
  ).toBeVisible()
  await page
    .getByRole("radio", {
      name: `${question.correctOptionId}. ${question.choices.find((item) => item.id === question.correctOptionId)!.text}`,
      exact: true,
    })
    .check()
  await page.getByRole("button", { name: "Check answer", exact: true }).click()
  await page
    .getByRole("button", { name: "Finish and review", exact: true })
    .click()
  await expect(
    page.getByText("All correct — no missed questions to retry.", {
      exact: true,
    }),
  ).toBeVisible()
})

test("find an IPv6 guide, reveal recall, and open its mapped practice", async ({
  page,
  request,
}) => {
  await request.delete("http://127.0.0.1:54321/__test/requests")
  await page.goto("/learn")
  await page.getByLabel("Find a subject").fill("EUI-64")
  await page.getByRole("button", { name: "Find guides" }).click()
  await expect(page).toHaveURL(/q=EUI-64/)
  await page
    .getByRole("link", { name: "Describe IPv6 address types", exact: true })
    .click()
  await expect(page).toHaveURL(/\/learn\/1\.9$/)
  await expect(page.getByText("ff00::/8.", { exact: true })).not.toBeVisible()
  await page
    .getByRole("button", { name: "Reveal answer 1", exact: true })
    .click()
  await expect(page.locator("#recall").getByRole("status")).toContainText(
    "ff00::/8",
  )
  await page
    .getByRole("link", { name: "Practice objective 1.9", exact: true })
    .click()
  await expect(page).toHaveURL(/objective=1\.9/)
  await expect(page.getByText(/capped to the available bank/)).toBeVisible()
  const calls = await (
    await request.get("http://127.0.0.1:54321/__test/requests")
  ).json()
  expect(
    calls.filter((call: { method: string }) => call.method === "POST"),
  ).toEqual([])
})

test("guided practice hides answers, locks checked choices, and protects temporary answers", async ({
  page,
}) => {
  await page.goto("/practice?objective=1.6&count=5&seed=guided-browser")
  await page
    .getByRole("button", { name: "Start practice", exact: true })
    .click()
  await expect(
    page.getByText("Correct answer:", { exact: false }),
  ).not.toBeVisible()
  await expect(
    page.getByRole("button", { name: "Check answer", exact: true }),
  ).toBeDisabled()
  await page.getByRole("radio").first().check()
  await page.getByRole("button", { name: "Check answer", exact: true }).click()
  await expect(page.getByRole("radio").first()).toBeDisabled()
  await expect(page.getByRole("status")).toBeVisible()
  page.once("dialog", (dialog) => dialog.dismiss())
  await page.getByRole("link", { name: "Learn", exact: true }).first().click()
  await expect(page).toHaveURL(/\/practice\?/)
  page.once("dialog", (dialog) => dialog.accept())
  await page.getByRole("link", { name: "Learn", exact: true }).first().click()
  await expect(page).toHaveURL(/\/learn$/)
})

test("narrow guide and practice content stays within the viewport", async ({
  page,
}) => {
  for (const width of [360, 390, 1280]) {
    await page.setViewportSize({ width, height: 900 })
    for (const route of ["/learn", "/learn/1.9", "/practice?objective=1.6"]) {
      await page.goto(route)
      await expect(page.locator("h1")).toBeVisible()
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth,
      )
      expect(overflow, `${route} at ${width}`).toBe(false)
    }
  }
  await page.setViewportSize({ width: 1280, height: 900 })
  await page.goto("/learn/1.9")
  await page.screenshot({
    path: ".playwright/learning-guide.png",
    fullPage: true,
  })
})
