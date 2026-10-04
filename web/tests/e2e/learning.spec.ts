import { expect, test } from "@playwright/test"
import { practiceQuestions } from "../../src/content/practice"
import { selectPracticeSession } from "../../src/lib/practice-model"

test("checkpoint practice reveals only on submit and retry-missed becomes guided", async ({
  page,
}) => {
  const selected = selectPracticeSession(
    practiceQuestions,
    { objective: "1.9" },
    5,
    "checkpoint-browser",
  )
  const question = selected[0]
  const wrong = question.choices.find(
    (item) => item.id !== question.correctOptionId,
  )!
  await page.goto(
    "/practice?objective=1.9&count=5&feedback=checkpoint&seed=checkpoint-browser",
  )
  await page
    .getByRole("button", { name: "Start practice", exact: true })
    .click()
  await page
    .getByRole("radio", { name: `${wrong.id}. ${wrong.text}`, exact: true })
    .check()
  await expect(
    page.getByText(question.explanation, { exact: true }),
  ).not.toBeVisible()
  await expect(
    page.getByRole("button", { name: "Finish and review", exact: true }),
  ).toBeDisabled()
  for (const item of selected.slice(1)) {
    await page.getByRole("button", { name: "Next", exact: true }).click()
    const correct = item.choices.find(
      (choice) => choice.id === item.correctOptionId,
    )!
    await page
      .getByRole("radio", {
        name: `${correct.id}. ${correct.text}`,
        exact: true,
      })
      .check()
    await expect(
      page.getByText(item.explanation, { exact: true }),
    ).not.toBeVisible()
  }
  await page
    .getByRole("button", { name: "Finish and review", exact: true })
    .click()
  await expect(
    page.getByRole("heading", { name: "Practice result: 4 / 5", exact: true }),
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

test("filters are keyboard usable and invalid or empty selections recover", async ({
  page,
}) => {
  await page.goto("/learn")
  const domains = page.getByRole("combobox", { name: "Domains" })
  await domains.focus()
  await page.keyboard.press("Enter")
  await page.keyboard.press("End")
  await page.keyboard.press("Enter")
  await page.getByRole("button", { name: "Find guides" }).click()
  await expect(page).toHaveURL(/domain=6.0/)
  await expect(
    page.getByRole("link", {
      name: "Explain how automation impacts network management",
      exact: true,
    }),
  ).toBeVisible()
  await page.goto("/practice?domain=1.0&objective=6.1")
  await expect(
    page.getByText("No questions available for this selection", {
      exact: true,
    }),
  ).toBeVisible()
  await page.goto("/practice?count=999")
  await expect(
    page.getByRole("alert").filter({ hasText: "invalid" }),
  ).toBeVisible()
  await page.getByRole("link", { name: "Reset filters", exact: true }).click()
  await expect(
    page.getByRole("button", { name: "Start practice", exact: true }),
  ).toBeVisible()
  await page.goto("/command-drills?domain=4.0")
  await expect(
    page.getByRole("link", {
      name: "Open Read a translation mapping",
      exact: true,
    }),
  ).toBeVisible()
  await expect(
    page.getByRole("link", { name: "Open Read interface state", exact: true }),
  ).toHaveCount(0)
  await page.goto("/command-drills?category=unknown")
  await expect(page.getByText("No drills match", { exact: true })).toBeVisible()
})

test("practice answers survive cancelled history and reload, then clear on refresh", async ({
  page,
}) => {
  await page.goto("/learn/1.6")
  await page
    .getByRole("link", { name: "Practice objective 1.6", exact: true })
    .click()
  await page
    .getByRole("button", { name: "Start practice", exact: true })
    .click()
  await page.getByRole("radio").first().focus()
  await page.keyboard.press("Space")
  await expect(page.getByRole("radio").first()).toBeChecked()
  page.once("dialog", (dialog) => dialog.dismiss())
  await page.goBack({ waitUntil: "domcontentloaded" }).catch(() => null)
  await expect(page).toHaveURL(/\/practice\?/)
  await expect(page.getByRole("radio").first()).toBeChecked()
  page.once("dialog", (dialog) => dialog.dismiss())
  await page.evaluate(() => window.location.reload()).catch(() => null)
  await expect(page.getByRole("radio").first()).toBeChecked()
  page.once("dialog", (dialog) => dialog.accept())
  await page.reload()
  await expect(
    page.getByRole("button", { name: "Start practice", exact: true }),
  ).toBeVisible()
  await page
    .getByRole("button", { name: "Start practice", exact: true })
    .click()
  await expect(page.getByRole("radio").first()).not.toBeChecked()
})

test("guides remain usable through failed progress reads and writes", async ({
  page,
  request,
}) => {
  try {
    await request.post("http://127.0.0.1:54321/__test/config", {
      data: { failReads: ["topic_progress"] },
    })
    await page.goto("/learn/1.9")
    await expect(
      page.getByRole("heading", {
        name: "Describe IPv6 address types",
        exact: true,
      }),
    ).toBeVisible()
    await expect(
      page
        .getByRole("alert")
        .filter({ hasText: "Saved study data is unavailable" }),
    ).toBeVisible()
    await expect(
      page.getByRole("button", { name: "Save understanding" }),
    ).toHaveCount(0)
    await request.post("http://127.0.0.1:54321/__test/config", { data: {} })
    await page.reload()
    const status = page.getByRole("combobox", { name: "Lesson status" })
    await status.click()
    await page.getByRole("option", { name: "In progress", exact: true }).click()
    await request.post("http://127.0.0.1:54321/__test/config", {
      data: { failWrites: ["topic_progress"] },
    })
    await page.getByRole("button", { name: "Save understanding" }).click()
    await expect(
      page.getByRole("alert").filter({ hasText: "Could not save" }),
    ).toBeVisible()
    await expect(status).toContainText("In progress")
    await request.post("http://127.0.0.1:54321/__test/config", { data: {} })
    await page.getByRole("button", { name: "Save understanding" }).click()
    await expect(
      page.getByText("Lesson understanding saved.", { exact: true }),
    ).toBeVisible()
  } finally {
    await request.post("http://127.0.0.1:54321/__test/config", { data: {} })
  }
})

test("a mixed checkpoint reviews twenty questions and supports same-session and new-session retries", async ({
  page,
  request,
}) => {
  await request.delete("http://127.0.0.1:54321/__test/requests")
  const selected = selectPracticeSession(
    practiceQuestions,
    {},
    20,
    "mixed-browser",
    true,
  )
  await page.goto("/practice?mode=mixed&feedback=checkpoint&seed=mixed-browser")
  await expect(
    page.getByText("20 questions · Review answers after submitting", {
      exact: true,
    }),
  ).toBeVisible()
  await page
    .getByRole("button", { name: "Start practice", exact: true })
    .click()
  for (const [index, question] of selected.entries()) {
    await expect(
      page.getByRole("heading", { name: question.prompt, exact: true }),
    ).toBeVisible()
    const correct = question.choices.find(
      (choice) => choice.id === question.correctOptionId,
    )!
    await page
      .getByRole("radio", {
        name: `${correct.id}. ${correct.text}`,
        exact: true,
      })
      .check()
    if (index < selected.length - 1)
      await page.getByRole("button", { name: "Next", exact: true }).click()
  }
  await page
    .getByRole("button", { name: "Finish and review", exact: true })
    .click()
  await expect(
    page.getByRole("heading", {
      name: "Practice result: 20 / 20",
      exact: true,
    }),
  ).toBeVisible()
  await page.setViewportSize({ width: 360, height: 800 })
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    ),
  ).toBe(false)
  await page.getByRole("button", { name: "Retry session", exact: true }).click()
  await expect(
    page.getByRole("heading", { name: selected[0].prompt, exact: true }),
  ).toBeVisible()
  await expect(page.getByRole("radio").first()).not.toBeChecked()
  await page.goto("/practice?mode=mixed&feedback=checkpoint&seed=mixed-browser")
  await page
    .getByRole("button", { name: "Start practice", exact: true })
    .click()
  for (let index = 0; index < selected.length; index++) {
    await page.getByRole("radio").first().check()
    if (index < selected.length - 1)
      await page.getByRole("button", { name: "Next", exact: true }).click()
  }
  await page
    .getByRole("button", { name: "Finish and review", exact: true })
    .click()
  await page.getByRole("link", { name: "New session", exact: true }).click()
  await expect(page).toHaveURL(/seed=(?!mixed-browser)[\w-]+/)
  await expect(
    page.getByRole("button", { name: "Start practice", exact: true }),
  ).toBeVisible()
  const calls = await (
    await request.get("http://127.0.0.1:54321/__test/requests")
  ).json()
  expect(
    calls.filter((call: { method: string }) => call.method === "POST"),
  ).toEqual([])
})
