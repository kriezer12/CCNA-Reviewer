import assert from "node:assert/strict"
import test from "node:test"

const {
  aggregateStudyMinutes,
  calculateCompletion,
  calculateQuizScore,
  calculateStudyStreak,
} = await import("../src/lib/analytics.ts")

test("calculates completion without exceeding the declared total", () => {
  assert.deepEqual(calculateCompletion([{ status: "complete" }, { status: "complete" }], 1), {
    completed: 1,
    total: 1,
    percentage: 100,
  })
})

test("calculates quiz score boundaries", () => {
  assert.equal(calculateQuizScore(8, 10), 80)
  assert.equal(calculateQuizScore(10, 0), 0)
  assert.equal(calculateQuizScore(12, 10), 100)
})

test("aggregates multiple sessions on one date", () => {
  assert.deepEqual(
    aggregateStudyMinutes([
      { study_date: "2026-09-20", duration_minutes: 20 },
      { study_date: "2026-09-20", duration_minutes: 15 },
    ]),
    { "2026-09-20": 35 }
  )
})

test("counts only consecutive days that reach 30 minutes", () => {
  const today = new Date(2026, 8, 20)
  assert.equal(
    calculateStudyStreak(
      [
        { study_date: "2026-09-18", duration_minutes: 30 },
        { study_date: "2026-09-19", duration_minutes: 20 },
        { study_date: "2026-09-20", duration_minutes: 30 },
      ],
      today
    ),
    1
  )
  assert.equal(
    calculateStudyStreak(
      [
        { study_date: "2026-09-18", duration_minutes: 30 },
        { study_date: "2026-09-19", duration_minutes: 30 },
        { study_date: "2026-09-20", duration_minutes: 15 },
      ],
      today
    ),
    2
  )
})

