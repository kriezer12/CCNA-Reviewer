import {
  curriculum,
  type ObjectiveId,
  type SourceLocator,
} from "../curriculum.ts"

// Some legacy objective references combine both book volumes under one source ID.
// Split those locators for the expanded learning resources so each chapter is
// displayed under the book that actually contains it.
export function learningSources(
  objectiveId: ObjectiveId,
): readonly SourceLocator[] {
  const objective = curriculum.objectives.find(
    (item) => item.id === objectiveId,
  )
  if (!objective) throw new Error(`Unknown learning objective ${objectiveId}`)
  return objective.sourceLocators.flatMap((source) => {
    if (source.sourceId !== "v1-ocg" || !source.locator.includes("; V2 "))
      return [source]
    const [volumeOne, volumeTwo] = source.locator.split("; V2 ")
    return [
      { sourceId: "v1-ocg", locator: volumeOne },
      { sourceId: "v2-ocg", locator: `V2 ${volumeTwo}` },
    ]
  })
}
