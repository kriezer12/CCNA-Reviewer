import assert from "node:assert/strict"
import test from "node:test"

import { curriculum } from "../src/content/curriculum.ts"
import { getRoadmapHref, getRoadmapWeek, getRoadmapWeekObjectiveIds } from "../src/lib/roadmap-model.ts"

test("every roadmap week resolves to one detail model and stable URL", () => {
  assert.equal(curriculum.roadmap.weeks.length, 18)

  for (const week of curriculum.roadmap.weeks) {
    const detail = getRoadmapWeek(String(week.week).padStart(2, "0"))
    assert.ok(detail)
    assert.equal(detail.week.week, week.week)
    assert.equal(getRoadmapHref(week.week), `/roadmap/week/${String(week.week).padStart(2, "0")}`)
    assert.deepEqual(getRoadmapWeekObjectiveIds(week), detail.objectives.map((objective) => objective.id))
    assert.equal(detail.labs.length + detail.browserActivities.length, week.activityIds.length)
  }
})

test("invalid roadmap week parameters do not resolve", () => {
  assert.equal(getRoadmapWeek(""), null)
  assert.equal(getRoadmapWeek("0"), null)
  assert.equal(getRoadmapWeek("19"), null)
  assert.equal(getRoadmapWeek("1.5"), null)
  assert.equal(getRoadmapWeek("week-01"), null)
})
