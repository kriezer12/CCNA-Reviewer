import assert from "node:assert/strict"

const {
  EXPECTED_LAB_IDS,
  EXPECTED_PARENT_OBJECTIVE_IDS,
  curriculum,
  buildObjectiveCoverage,
  validateCurriculum,
} = await import("../src/content/curriculum.ts")

const valid = validateCurriculum(curriculum)
assert.equal(valid.valid, true, valid.errors.join("\n"))
assert.equal(curriculum.objectives.length, EXPECTED_PARENT_OBJECTIVE_IDS.length)
assert.equal(curriculum.labs.length, EXPECTED_LAB_IDS.length)
assert.equal(curriculum.domains.reduce((total, domain) => total + domain.weight, 0), 100)
assert.equal(curriculum.roadmap.weeks.length, 18)
assert.equal(buildObjectiveCoverage(curriculum).length, 53)

const withChanges = (changes) => ({ ...curriculum, ...changes })

const duplicateObjective = validateCurriculum(withChanges({
  objectives: [...curriculum.objectives, curriculum.objectives[0]],
}))
assert.equal(duplicateObjective.valid, false)
assert.ok(duplicateObjective.errors.some((error) => error.includes("Duplicate objective ID: 1.1")))

const missingLab = validateCurriculum(withChanges({
  labs: curriculum.labs.slice(0, -1),
}))
assert.equal(missingLab.valid, false)
assert.ok(missingLab.errors.some((error) => error.includes("Missing lab ID: L24")))

const unknownObjectiveReference = validateCurriculum(withChanges({
  labs: [
    { ...curriculum.labs[0], objectiveIds: [...curriculum.labs[0].objectiveIds, "9.9"] },
    ...curriculum.labs.slice(1),
  ],
}))
assert.equal(unknownObjectiveReference.valid, false)
assert.ok(unknownObjectiveReference.errors.some((error) => error.includes("Lab L01 references unknown objective 9.9")))

const unknownActivityReference = validateCurriculum(withChanges({
  roadmap: {
    ...curriculum.roadmap,
    weeks: curriculum.roadmap.weeks.map((week, index) => index === 0
      ? { ...week, activityIds: [...week.activityIds, "L99"] }
      : week),
  },
}))
assert.equal(unknownActivityReference.valid, false)
assert.ok(unknownActivityReference.errors.some((error) => error.includes("Roadmap week 1 references unknown activity L99")))

console.log("curriculum registry checks passed")
