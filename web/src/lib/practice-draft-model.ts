import { practiceQuestions } from "../content/practice/index.ts"

export type PracticeDraft = {
  revision: number
  questionRefs: { questionId: string; contentRevision: number }[]
  seed: string
  filters: { domain: string; category: string; objective: string; difficulty: string }
  mode: "topic" | "mixed"
  feedback: "guided" | "checkpoint"
  answers: Record<string, string>
  checked: string[]
  position: number
}

export function validatePracticeDraft(input: unknown): Omit<PracticeDraft, "revision"> | null {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null
  const d = input as Record<string, unknown>
  if (!Array.isArray(d.questionRefs) || d.questionRefs.length < 1 || d.questionRefs.length > 20 ||
      typeof d.seed !== "string" || d.seed.length > 100 ||
      !d.filters || typeof d.filters !== "object" || Array.isArray(d.filters) ||
      !["topic", "mixed"].includes(String(d.mode)) || !["guided", "checkpoint"].includes(String(d.feedback)) ||
      !d.answers || typeof d.answers !== "object" || Array.isArray(d.answers) || !Array.isArray(d.checked) ||
      !Number.isSafeInteger(d.position) || Number(d.position) < 0 || Number(d.position) >= d.questionRefs.length) return null
  const refs = d.questionRefs as Record<string, unknown>[]
  const ids = new Set<string>()
  for (const ref of refs) {
    if (!ref || typeof ref !== "object" || typeof ref.questionId !== "string" || ids.has(ref.questionId)) return null
    ids.add(ref.questionId)
    const q = practiceQuestions.find(item => item.id === ref.questionId && item.contentRevision === ref.contentRevision)
    if (!q) return null
  }
  const answers = d.answers as Record<string, unknown>
  if (Object.keys(answers).some(id => !ids.has(id) || typeof answers[id] !== "string" ||
    !practiceQuestions.find(q => q.id === id)?.choices.some(c => c.id === answers[id]))) return null
  const checked = d.checked as unknown[]
  if (checked.some(id => typeof id !== "string" || !ids.has(id) || typeof answers[id] !== "string") ||
      new Set(checked).size !== checked.length || d.feedback === "checkpoint" && checked.length > 0) return null
  const filters = d.filters as Record<string, unknown>
  if (["domain", "category", "objective", "difficulty"].some(key => typeof filters[key] !== "string" || String(filters[key]).length > 100)) return null
  return { questionRefs: refs as PracticeDraft["questionRefs"], seed: d.seed as string,
    filters: filters as PracticeDraft["filters"], mode: d.mode as PracticeDraft["mode"],
    feedback: d.feedback as PracticeDraft["feedback"], answers: answers as Record<string, string>,
    checked: checked as string[], position: Number(d.position) }
}

export function restoreDraftState(draft: Omit<PracticeDraft, "revision">) {
  const questions = draft.questionRefs.map(ref => practiceQuestions.find(q => q.id === ref.questionId && q.contentRevision === ref.contentRevision))
  if (questions.some(q => !q)) return null
  return { questions: questions as (typeof practiceQuestions)[number][], answers: draft.answers, checked: draft.feedback === "guided" ? draft.checked : [], index: draft.position }
}
