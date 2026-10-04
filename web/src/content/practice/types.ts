import {
  curriculum,
  type ObjectiveId,
  type SourceLocator,
} from "../curriculum.ts"

export type Difficulty = "foundation" | "applied" | "challenge"
export type QuestionFormat = "concept" | "scenario" | "calculation" | "output"
export interface PracticeChoice {
  readonly id: string
  readonly text: string
  readonly rationale: string
}
export interface PracticeQuestion {
  readonly id: string
  readonly objectiveIds: readonly ObjectiveId[]
  readonly childObjectiveIds: readonly string[]
  readonly domainId: string
  readonly prompt: string
  readonly choices: readonly PracticeChoice[]
  readonly correctOptionId: string
  readonly explanation: string
  readonly difficulty: Difficulty
  readonly format: QuestionFormat
  readonly sourceLocators: readonly SourceLocator[]
}

// Author the correct choice first with a rationale for every choice. Rotate positions
// deterministically at publication; question IDs/semantics must remain stable afterward.
export function question(
  id: string,
  objectiveId: ObjectiveId,
  prompt: string,
  options: readonly [string, string][],
  explanation: string,
  difficulty: Difficulty = "applied",
  format: QuestionFormat = "scenario",
  childObjectiveIds: readonly string[] = [],
): PracticeQuestion {
  if (options.length !== 4) throw new Error(`${id} needs four authored choices`)
  const objective = curriculum.objectives.find(
    (item) => item.id === objectiveId,
  )!
  const offset =
    Array.from(id).reduce((sum, char) => sum + char.charCodeAt(0), 0) % 4
  const rotated = [...options.slice(offset), ...options.slice(0, offset)]
  return {
    id,
    objectiveIds: [objectiveId],
    childObjectiveIds,
    domainId: objective.domainId,
    prompt,
    choices: rotated.map(([text, rationale], index) => ({
      id: String.fromCharCode(65 + index),
      text,
      rationale,
    })),
    correctOptionId: String.fromCharCode(65 + ((4 - offset) % 4)),
    explanation,
    difficulty,
    format,
    sourceLocators: objective.sourceLocators,
  }
}
