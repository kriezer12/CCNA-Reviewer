import assert from "node:assert/strict"
import test from "node:test"

const { quizQuestions, validateQuizBank } = await import("../src/content/quizzes.ts")

test("quiz bank has six balanced domain banks and valid objective tags", () => {
  const result = validateQuizBank()
  assert.equal(result.valid, true, result.errors.join("\n"))
  assert.equal(quizQuestions.length, 60)
})

test("quiz questions have unique ids and four answer choices", () => {
  assert.equal(new Set(quizQuestions.map((question) => question.id)).size, quizQuestions.length)
  assert.ok(quizQuestions.every((question) => question.choices.length === 4))
})

