import { expect, test } from "@playwright/test"
import { practiceQuestions } from "../../src/content/practice"
import { selectPracticeSession } from "../../src/lib/practice-model"

const fixture = "http://127.0.0.1:54321"
test.beforeEach(async ({ request }) => { await request.post(`${fixture}/__test/config`, { data: {} }) })
test.afterEach(async ({ request }) => { await request.post(`${fixture}/__test/config`, { data: {} }) })

test("explicitly save and resume a private draft without moving answers into the URL", async ({ page }) => {
  const selected = selectPracticeSession(practiceQuestions, {}, 5, "draft-e2e")
  await page.goto("/practice?count=5&feedback=guided&seed=draft-e2e")
  await page.getByRole("button", { name: "Start practice", exact: true }).click()
  const first = selected[0]
  const option = first.choices[0]
  await page.getByRole("radio", { name: `${option.id}. ${option.text}`, exact: true }).check()
  await page.getByRole("button", { name: "Save practice", exact: true }).click()
  await expect(page.getByRole("status")).toContainText("saved privately")
  await page.reload()
  await page.getByRole("button", { name: "Resume saved practice", exact: true }).click()
  await expect(page.getByRole("radio", { name: `${option.id}. ${option.text}`, exact: true })).toBeChecked()
  expect(page.url()).not.toContain(option.id)
  expect(page.url()).not.toContain(option.text)
})

test("draft endpoint rejects stale content and expired authentication", async ({ page, request }) => {
  await page.goto("/practice")
  const question = practiceQuestions[0]
  const payload = { questionRefs: [{ questionId: question.id, contentRevision: 999 }], seed: "x", filters: { domain: "", category: "", objective: "", difficulty: "" }, mode: "topic", feedback: "guided", answers: {}, checked: [], position: 0 }
  const stale = await page.request.post("/api/practice-drafts", { data: payload })
  expect(stale.status()).toBe(400)
  await request.post(`${fixture}/__test/config`, { data: { expireAuth: true } })
  const expired = await page.request.get("/api/practice-drafts")
  expect(expired.status()).toBe(401)
})

test("conditional revisions reject an overwrite from an older browser state", async ({ page }) => {
  await page.goto("/practice")
  const question = practiceQuestions[0]
  const draft = { questionRefs: [{ questionId: question.id, contentRevision: question.contentRevision }], seed: "conflict", filters: { domain: "", category: "", objective: "", difficulty: "" }, mode: "topic", feedback: "guided", answers: {}, checked: [], position: 0 }
  const created = await page.request.post("/api/practice-drafts", { data: draft })
  expect(created.status()).toBe(200)
  const first = await page.request.put("/api/practice-drafts", { data: { revision: 1, draft: { ...draft, seed: "newer" } } })
  expect(first.status()).toBe(200)
  const stale = await page.request.put("/api/practice-drafts", { data: { revision: 1, draft } })
  expect(stale.status()).toBe(409)
})
