import { learningCategories } from "../content/learning/categories.ts"
import type { PracticeQuestion } from "../content/practice/types.ts"

export interface PracticeFilters {
  readonly domain?: string
  readonly objective?: string
  readonly category?: string
  readonly difficulty?: string
}
export function matchingQuestions(
  bank: readonly PracticeQuestion[],
  filters: PracticeFilters,
) {
  const category = learningCategories.find(
    (item) => item.id === filters.category,
  )
  return bank.filter(
    (item) =>
      (!filters.domain || item.domainId === filters.domain) &&
      (!filters.objective ||
        item.objectiveIds.includes(filters.objective as never)) &&
      (!filters.difficulty || item.difficulty === filters.difficulty) &&
      (!filters.category ||
        category?.objectiveIds.some((id) => item.objectiveIds.includes(id))),
  )
}
export function seededShuffle<T>(items: readonly T[], seed: string): T[] {
  let state = 2166136261
  for (const char of seed)
    state = Math.imul(state ^ char.charCodeAt(0), 16777619) >>> 0
  const result = [...items]
  for (let index = result.length - 1; index > 0; index--) {
    state = (Math.imul(1664525, state) + 1013904223) >>> 0
    const selected = state % (index + 1)
    ;[result[index], result[selected]] = [result[selected], result[index]]
  }
  return result
}
export function selectPracticeSession(
  bank: readonly PracticeQuestion[],
  filters: PracticeFilters,
  count: number,
  seed: string,
  mixed = false,
) {
  if (mixed) {
    const allocations = [
      ["1.0", 4],
      ["2.0", 4],
      ["3.0", 5],
      ["4.0", 2],
      ["5.0", 3],
      ["6.0", 2],
    ] as const
    const questions = allocations.flatMap(([domain, count]) =>
      seededShuffle(
        bank.filter((item) => item.domainId === domain),
        `${seed}-${domain}`,
      ).slice(0, count),
    )
    if (questions.length !== 20) return []
    return seededShuffle(questions, seed)
  }
  return seededShuffle(matchingQuestions(bank, filters), seed).slice(
    0,
    Math.max(0, Math.min(count, 20)),
  )
}
