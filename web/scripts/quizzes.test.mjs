import assert from "node:assert/strict"
import test from "node:test"

const { quizQuestions, validateQuizBank, validateQuizSubmission } = await import("../src/content/quizzes.ts")

test("quiz bank has six balanced domain banks and valid objective tags", () => {
  const result = validateQuizBank()
  assert.equal(result.valid, true, result.errors.join("\n"))
  assert.equal(quizQuestions.length, 60)
})

test("quiz questions have unique ids and four answer choices", () => {
  assert.equal(new Set(quizQuestions.map((question) => question.id)).size, quizQuestions.length)
  assert.ok(quizQuestions.every((question) => question.choices.length === 4))
})

test("quiz submissions reject missing or unknown answers", () => {
  const questions = quizQuestions.slice(0, 2)
  assert.equal(validateQuizSubmission(questions, { [questions[0].id]: "A" }), false)
  assert.equal(validateQuizSubmission(questions, { [questions[0].id]: "A", [questions[1].id]: "Z" }), false)
  assert.equal(validateQuizSubmission(questions, { [questions[0].id]: "A", [questions[1].id]: "B" }), true)
})
