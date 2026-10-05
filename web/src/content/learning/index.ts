import { curriculum, type ObjectiveId } from "../curriculum.ts"
import { fundamentalsGuides } from "./fundamentals.ts"
import { networkAccessGuides } from "./network-access.ts"
import { connectivityGuides } from "./connectivity.ts"
import { servicesGuides } from "./services.ts"
import { securityGuides } from "./security.ts"
import { automationGuides } from "./automation.ts"
import { categoriesForObjective, learningCategories } from "./categories.ts"
export { categoriesForObjective, learningCategories } from "./categories.ts"
export type { StudyGuide } from "./types.ts"

export const studyGuides = [
  ...fundamentalsGuides,
  ...networkAccessGuides,
  ...connectivityGuides,
  ...servicesGuides,
  ...securityGuides,
  ...automationGuides,
]
export function guideForObjective(id: string) {
  return studyGuides.find((guide) => guide.objectiveId === id)
}
export interface LearningFilters {
  readonly q?: string
  readonly domain?: string
  readonly category?: string
}
export function findGuides({
  q = "",
  domain = "",
  category = "",
}: LearningFilters) {
  const query = q.trim().toLocaleLowerCase()
  return studyGuides.filter((guide) => {
    const objective = curriculum.objectives.find(
      (item) => item.id === guide.objectiveId,
    )!
    const categories = categoriesForObjective(guide.objectiveId)
    const text = [
      objective.id,
      objective.title,
      guide.summary,
      ...objective.childObjectives.map((child) => child.title),
      ...guide.sections.flatMap((section) => [section.title, section.body]),
      ...guide.terms.map((term) => term.title),
      ...categories.map((item) => item.title),
    ]
      .join(" ")
      .toLocaleLowerCase()
    return (
      (!domain || domain === objective.domainId) &&
      (!category || categories.some((item) => item.id === category)) &&
      (!query || text.includes(query))
    )
  })
}
export function validateLearningContent() {
  const errors: string[] = []
  const sources = new Set<string>(curriculum.sources.map((source) => source.id))
  const ids = studyGuides.map((guide) => guide.objectiveId)
  if (new Set(ids).size !== ids.length)
    errors.push("Duplicate guide objectives")
  for (const objective of curriculum.objectives) {
    const guide = guideForObjective(objective.id)
    if (!guide) {
      errors.push(`Missing guide ${objective.id}`)
      continue
    }
    if (
      guide.sections.length < 2 ||
      guide.terms.length < 2 ||
      guide.mistakes.length < 2 ||
      guide.recall.length !== 2 ||
      !guide.example.body
    )
      errors.push(`Incomplete guide ${objective.id}`)
    if (!categoriesForObjective(objective.id).length)
      errors.push(`Uncategorized objective ${objective.id}`)
    if (
      guide.sourceLocators.some(
        (source) => !sources.has(source.sourceId) || !source.locator.trim(),
      )
    )
      errors.push(`Invalid guide source ${objective.id}`)
  }
  for (const category of learningCategories) {
    if (category.objectiveIds.some((id: ObjectiveId) => !ids.includes(id)))
      errors.push(`Invalid category ${category.id}`)
  }
  return { valid: errors.length === 0, errors }
}
