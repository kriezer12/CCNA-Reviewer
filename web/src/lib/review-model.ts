import { practiceQuestions } from "../content/practice/index.ts"

export function nextReviewSchedule(currentStage: number, correct: boolean) {
  if (!Number.isSafeInteger(currentStage) || currentStage < 0 || currentStage > 4)
    throw new RangeError("Review stage must be between zero and four.")
  return correct
    ? { nextStage: Math.min(currentStage + 1, 4), daysUntilDue: [3, 7, 14, 30][Math.min(currentStage, 3)] }
    : { nextStage: 0, daysUntilDue: 1 }
}

export interface QuestionReference {
  readonly questionId: string
  readonly contentRevision: number
}

type MissedSubmission =
  | { readonly ok: true; readonly missed: readonly QuestionReference[] }
  | { readonly ok: false; readonly error: string }

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

/** Validate the entire completed response before retaining any missed item.
 * The client sends choices, never an authoritative score or correct flag. */
export function validateMissedSubmission(body: unknown): MissedSubmission {
  const invalid = { ok: false, error: "Complete the session with current questions and valid choices before saving missed questions." } as const
  if (!isRecord(body) || !Array.isArray(body.answers) ||
      body.answers.length < 1 || body.answers.length > 20) return invalid
  const seen = new Set<string>()
  const missed: QuestionReference[] = []
  for (const response of body.answers) {
    if (!isRecord(response) || typeof response.questionId !== "string" || seen.has(response.questionId)) return invalid
    seen.add(response.questionId)
    const question = practiceQuestions.find(item => item.id === response.questionId)
    if (!question || response.contentRevision !== question.contentRevision ||
        !question.choices.some(choice => choice.id === response.selectedChoice)) return invalid
    if (response.selectedChoice !== question.correctOptionId)
      missed.push({ questionId: question.id, contentRevision: question.contentRevision })
  }
  return { ok: true, missed }
}

export function resolveReviewQuestion(reference: QuestionReference) {
  return practiceQuestions.find(item => item.id === reference.questionId &&
    item.contentRevision === reference.contentRevision) ?? null
}
