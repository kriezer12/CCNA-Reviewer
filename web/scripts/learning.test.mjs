import assert from "node:assert/strict"
import test from "node:test"
import { curriculum } from "../src/content/curriculum.ts"
import {
  findGuides,
  studyGuides,
  validateLearningContent,
} from "../src/content/learning/index.ts"
import { addressingQuestions } from "../src/content/practice/addressing.ts"
import { practiceQuestions } from "../src/content/practice/index.ts"
import {
  matchingQuestions,
  seededShuffle,
  selectPracticeSession,
} from "../src/lib/practice-model.ts"

test("every canonical objective has a complete categorized guide with valid sources", () => {
  assert.equal(studyGuides.length, curriculum.objectives.length)
  assert.deepEqual(validateLearningContent(), { valid: true, errors: [] })
})
test("search finds guide terms and categories; invalid filters do not expand results", () => {
  assert.ok(
    findGuides({ q: "EUI-64" }).some((guide) => guide.objectiveId === "1.9"),
  )
  assert.ok(
    findGuides({ q: "IPv4 addressing" }).some(
      (guide) => guide.objectiveId === "1.6",
    ),
  )
  assert.equal(findGuides({ domain: "7.0" }).length, 0)
  assert.equal(findGuides({ category: "unknown" }).length, 0)
})
test("addressing questions have distinct choices, individual rationales, and a valid correct choice", () => {
  assert.equal(addressingQuestions.length, 30)
  for (const question of addressingQuestions) {
    assert.equal(question.choices.length, 4)
    assert.equal(
      new Set(question.choices.map((item) => item.text)).size,
      4,
      question.id,
    )
    assert.equal(
      new Set(question.choices.map((item) => item.rationale)).size,
      4,
      question.id,
    )
    assert.ok(
      question.choices.some((item) => item.id === question.correctOptionId),
      question.id,
    )
  }
})
test("published practice choices and mappings are well-formed across domains", () => {
  assert.equal(
    new Set(practiceQuestions.map((item) => item.id)).size,
    practiceQuestions.length,
  )
  assert.equal(
    new Set(practiceQuestions.map((item) => item.prompt)).size,
    practiceQuestions.length,
  )
  for (const question of practiceQuestions) {
    assert.equal(question.choices.length, 4)
    assert.equal(
      new Set(question.choices.map((item) => item.text)).size,
      4,
      question.id,
    )
    assert.equal(
      new Set(question.choices.map((item) => item.rationale)).size,
      4,
      question.id,
    )
    assert.ok(
      question.choices.some((item) => item.id === question.correctOptionId),
      question.id,
    )
    for (const id of question.objectiveIds)
      assert.ok(
        curriculum.objectives.some(
          (item) => item.id === id && item.domainId === question.domainId,
        ),
        question.id,
      )
    for (const id of question.childObjectiveIds)
      assert.ok(
        curriculum.objectives.some(
          (item) =>
            question.objectiveIds.includes(item.id) &&
            item.childObjectives.some((child) => child.id === id),
        ),
        question.id,
      )
  }
})
test("seeded sessions repeat exactly, do not mutate the bank, cap counts, and obey intersecting filters", () => {
  const original = addressingQuestions.map((item) => item.id)
  const first = selectPracticeSession(addressingQuestions, {}, 10, "session-a")
  assert.deepEqual(
    first,
    selectPracticeSession(addressingQuestions, {}, 10, "session-a"),
  )
  assert.notDeepEqual(
    first,
    selectPracticeSession(addressingQuestions, {}, 10, "session-b"),
  )
  assert.deepEqual(
    addressingQuestions.map((item) => item.id),
    original,
  )
  assert.equal(new Set(first.map((item) => item.id)).size, first.length)
  assert.equal(
    matchingQuestions(addressingQuestions, {
      objective: "1.8",
      category: "ipv4",
    }).length,
    0,
  )
  assert.equal(
    selectPracticeSession(addressingQuestions, { objective: "1.9" }, 20, "a")
      .length,
    1,
  )
  assert.deepEqual(seededShuffle([], "empty"), [])
})
test("mixed sessions preserve blueprint domain allocation and reject an incomplete domain bank", () => {
  const fixture = curriculum.domains.flatMap((domain) =>
    Array.from({ length: 12 }, (_, index) => ({
      ...addressingQuestions[0],
      id: `${domain.id}-${index}`,
      domainId: domain.id,
    })),
  )
  const mixed = selectPracticeSession(
    fixture,
    { domain: "1.0" },
    5,
    "mix",
    true,
  )
  assert.equal(mixed.length, 20)
  assert.deepEqual(
    curriculum.domains.map(
      (domain) => mixed.filter((item) => item.domainId === domain.id).length,
    ),
    [4, 4, 5, 2, 3, 2],
  )
  assert.deepEqual(
    selectPracticeSession(addressingQuestions, {}, 20, "mix", true),
    [],
  )
})
