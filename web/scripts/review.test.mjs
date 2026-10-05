import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import { test } from "node:test"
import { practiceQuestions } from "../src/content/practice/index.ts"
import { curriculum } from "../src/content/curriculum.ts"
import { validateMissedSubmission } from "../src/lib/review-model.ts"

const first = practiceQuestions[0]
const second = practiceQuestions[1]
const answer = (item, selectedChoice = item.correctOptionId) => ({
  questionId: item.id, contentRevision: item.contentRevision, selectedChoice,
})
test("derive only missed canonical questions, ignoring a claimed client score", () => {
  const wrong = second.choices.find(item => item.id !== second.correctOptionId).id
  assert.deepEqual(validateMissedSubmission({ answers: [answer(first), answer(second, wrong)], score: 0 }),
    { ok: true, missed: [{ questionId: second.id, contentRevision: 1 }] })
})
test("a fully correct completed session produces no retained questions", () => {
  assert.deepEqual(validateMissedSubmission({ answers: [answer(first)] }), { ok: true, missed: [] })
})
test("reject incomplete, duplicate, unknown, stale and tampered answers atomically", () => {
  for (const body of [null, [], {}, { answers: [] }, { answers: [answer(first), answer(first)] },
    { answers: [{ ...answer(first), questionId: "retired" }] },
    { answers: [{ ...answer(first), contentRevision: 0 }] },
    { answers: [{ ...answer(first), selectedChoice: "bogus" }] },
    { answers: [{ questionId: first.id, contentRevision: 1 }] },
    { answers: Array.from({length:21}, () => answer(first)) }]) assert.equal(validateMissedSubmission(body).ok, false)
})
test("every published question revision is represented in the RLS catalog", async () => {
  const migration = await readFile(new URL("../../supabase/migrations/20261004163735_retained_review.sql", import.meta.url), "utf8")
  for (const item of practiceQuestions) assert.ok(migration.includes(`('${item.id}',${item.contentRevision})`), `missing catalog revision ${item.id}`)
  for (const contract of ["enable row level security", "private.is_learning_owner()",
    "grant insert (user_id, question_id, content_revision)", "successful_stage integer not null default 0",
    "due_on date not null default"]) assert.ok(migration.includes(contract), `missing persistence contract: ${contract}`)
})
test("every guide and question is in the separate saved-resource catalog", async () => {
  const migration = await readFile(new URL("../../supabase/migrations/20261005015546_saved_resources.sql", import.meta.url), "utf8")
  for (const objective of curriculum.objectives) assert.ok(migration.includes(`('guide','${objective.id}')`), `missing guide bookmark ${objective.id}`)
  for (const item of practiceQuestions) assert.ok(migration.includes(`('question','${item.id}')`), `missing question bookmark ${item.id}`)
  for (const contract of ["enable row level security", "private.is_learning_owner()",
    "primary key (user_id, resource_type, resource_id)", "grant insert (user_id, resource_type, resource_id)"]) {
    assert.ok(migration.includes(contract), `missing bookmark contract: ${contract}`)
  }
})
