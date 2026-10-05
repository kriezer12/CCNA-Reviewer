import {
  curriculum,
  type ObjectiveId,
  type SourceLocator,
} from "../curriculum.ts"
import { learningSources } from "./sources.ts"

export interface LearningSection {
  readonly title: string
  readonly body: string
}
export interface RecallCheck {
  readonly prompt: string
  readonly answer: string
}
export interface StudyGuide {
  readonly objectiveId: ObjectiveId
  readonly summary: string
  readonly sections: readonly LearningSection[]
  readonly terms: readonly LearningSection[]
  readonly example: LearningSection
  readonly mistakes: readonly string[]
  readonly recall: readonly RecallCheck[]
  readonly sourceLocators: readonly SourceLocator[]
}

export function guide(
  objectiveId: ObjectiveId,
  summary: string,
  sections: readonly [string, string][],
  terms: readonly [string, string][],
  example: readonly [string, string],
  mistakes: readonly string[],
  recall: readonly [string, string][],
  sourceLocators?: readonly SourceLocator[],
): StudyGuide {
  const objective = curriculum.objectives.find(
    (item) => item.id === objectiveId,
  )
  if (!objective) throw new Error(`Unknown guide objective ${objectiveId}`)
  return {
    objectiveId,
    summary,
    sections: sections.map(([title, body]) => ({ title, body })),
    terms: terms.map(([title, body]) => ({ title, body })),
    example: { title: example[0], body: example[1] },
    mistakes,
    recall: recall.map(([prompt, answer]) => ({ prompt, answer })),
    sourceLocators: sourceLocators ?? learningSources(objectiveId),
  }
}
