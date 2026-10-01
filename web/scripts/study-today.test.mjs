import assert from "node:assert/strict"
import test from "node:test"

import { curriculum } from "../src/content/curriculum.ts"
import { getRoadmapWeek } from "../src/lib/roadmap-model.ts"
import { selectStudyToday } from "../src/lib/study-today-model.ts"

const first = getRoadmapWeek(1)
assert.ok(first)
const firstObjective = first.objectives[0]
const firstLab = first.labs[0]
assert.ok(firstObjective && firstLab)
const drill = { id: "first-drill", title: "First drill", objectiveIds: [firstObjective.id] }

test("empty progress selects the first eligible week, objective anchor, and mapped drill", () => {
  const result = selectStudyToday([], [], [drill])
  assert.equal(result.kind, "lesson")
  assert.equal(result.week, 1)
  assert.equal(result.objective.id, firstObjective.id)
  assert.equal(result.href, `/roadmap/week/01#objective-${firstObjective.id.replace(".", "-")}`)
  assert.equal(result.relatedLab?.id, firstLab.id)
  assert.equal(result.drill?.href, "/command-drills?drill=first-drill")
  assert.equal(result.suggestedMinutes, 20)
})

test("in-progress objective wins over not-started objective; canonical order breaks ties", () => {
  const second = first.objectives[1]
  const third = first.objectives[2]
  assert.ok(second && third)
  const result = selectStudyToday([
    { objective_id: third.id, status: "in_progress" },
    { objective_id: second.id, status: "in_progress" },
  ], [], [])
  assert.equal(result.kind, "lesson")
  assert.equal(result.objective.id, second.id)
  assert.equal(result.drill, null)
})

test("complete lessons still select unfinished lab, with in-progress lab priority", () => {
  const week = getRoadmapWeek(4)
  assert.ok(week && week.labs.length > 1)
  const objectiveRows = curriculum.objectives.map((objective) => ({ objective_id: objective.id, status: "complete" }))
  const completedEarlierLabs = curriculum.roadmap.weeks.slice(0, 3).flatMap((item) => item.activityIds)
    .filter((id) => id.startsWith("L")).map((id) => ({ lab_id: id, status: "complete" }))
  const result = selectStudyToday(objectiveRows, [
    ...completedEarlierLabs,
    { lab_id: week.labs[1].id, status: "in_progress" },
  ], [])
  assert.equal(result.kind, "lab")
  assert.equal(result.week, 4)
  assert.equal(result.lab.id, week.labs[1].id)
  assert.equal(result.href, `/labs/${week.labs[1].id}`)
  assert.equal(result.suggestedMinutes, week.labs[1].durationMinutes)
})

test("repeated objectives do not skip an earlier week with unfinished lab evidence", () => {
  const objectiveRows = curriculum.objectives.map((objective) => ({ objective_id: objective.id, status: "complete" }))
  const earlierLabs = first.labs.map((lab) => ({ lab_id: lab.id, status: "complete" }))
  const result = selectStudyToday(objectiveRows, earlierLabs, [])
  assert.equal(result.kind, "lab")
  assert.equal(result.week, 2)
})

test("the first unfinished lab uses week activity order when statuses tie", () => {
  const objectiveRows = curriculum.objectives.map((objective) => ({ objective_id: objective.id, status: "complete" }))
  const completedEarlierLabs = curriculum.roadmap.weeks.slice(0, 3).flatMap((item) => item.activityIds)
    .filter((id) => id.startsWith("L")).map((id) => ({ lab_id: id, status: "complete" }))
  const result = selectStudyToday(objectiveRows, completedEarlierLabs, [])
  assert.equal(result.kind, "lab")
  assert.equal(result.lab.id, "L05")
})

test("all mapped progress complete yields review; failed required read yields unavailable", () => {
  const objectives = curriculum.objectives.map((objective) => ({ objective_id: objective.id, status: "complete" }))
  const labs = curriculum.labs.map((lab) => ({ lab_id: lab.id, status: "complete" }))
  assert.deepEqual(selectStudyToday(objectives, labs, []), { kind: "review" })
  assert.deepEqual(selectStudyToday([], [], [], false), { kind: "unavailable" })
})
