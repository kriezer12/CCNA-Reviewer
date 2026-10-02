import { curriculum, type Lab, type Objective } from "../content/curriculum.ts"
import { getRoadmapHref, getRoadmapWeek } from "./roadmap-model.ts"

type ProgressStatus = "not_started" | "in_progress" | "complete"
type ObjectiveProgress = { readonly objective_id: string; readonly status: ProgressStatus }
type LabProgress = { readonly lab_id: string; readonly status: ProgressStatus }
type DrillMapping = { readonly id: string; readonly title: string; readonly objectiveIds: readonly string[] }

interface SuggestedDrill {
  id: string
  title: string
  href: string
  suggestedMinutes: 5
}

interface StudyTodayBase {
  week: number
  weekLabel: string
  focus: string
  reason: string
  href: string
  actionLabel: string
  suggestedMinutes: number
  drill: SuggestedDrill | null
}

export type StudyTodayRecommendation =
  | { kind: "unavailable" }
  | { kind: "review" }
  | (StudyTodayBase & { kind: "lesson"; objective: Objective; relatedLab: Lab | null })
  | (StudyTodayBase & { kind: "lab"; lab: Lab })

function statusById<T extends { status: ProgressStatus }>(rows: readonly T[], idKey: keyof T): Map<string, ProgressStatus> {
  return new Map(rows.map((row) => [String(row[idKey]), row.status]))
}

function firstUnfinishedLab(labs: readonly Lab[], statuses: Map<string, ProgressStatus>): Lab | undefined {
  return labs.find((lab) => statuses.get(lab.id) === "in_progress")
    ?? labs.find((lab) => (statuses.get(lab.id) ?? "not_started") !== "complete")
}

function mappedDrill(objectiveIds: readonly string[], drills: readonly DrillMapping[]): SuggestedDrill | null {
  const drill = drills.find((item) => item.objectiveIds.some((id) => objectiveIds.includes(id)))
  return drill ? { id: drill.id, title: drill.title, href: `/command-drills?drill=${encodeURIComponent(drill.id)}`, suggestedMinutes: 5 } : null
}

export function selectStudyToday(
  objectiveRows: readonly ObjectiveProgress[],
  labRows: readonly LabProgress[],
  drills: readonly DrillMapping[],
  progressAvailable = true,
): StudyTodayRecommendation {
  if (!progressAvailable) return { kind: "unavailable" }

  const objectiveStatuses = statusById(objectiveRows, "objective_id")
  const labStatuses = statusById(labRows, "lab_id")

  for (const week of curriculum.roadmap.weeks) {
    const detail = getRoadmapWeek(week.week)
    if (!detail || (detail.objectives.length === 0 && detail.labs.length === 0)) continue

    const objective = detail.objectives.find((item) => objectiveStatuses.get(item.id) === "in_progress")
      ?? detail.objectives.find((item) => (objectiveStatuses.get(item.id) ?? "not_started") !== "complete")
    const orderedLabs = week.activityIds.flatMap((id) => detail.labs.filter((lab) => lab.id === id))
    const lab = firstUnfinishedLab(orderedLabs, labStatuses)
    if (!objective && !lab) continue

    const weekLabel = `Week ${String(week.week).padStart(2, "0")}`
    const common = { week: week.week, weekLabel, focus: week.focus }
    if (objective) {
      const relatedLab = firstUnfinishedLab(orderedLabs.filter((item) => item.objectiveIds.includes(objective.id)), labStatuses) ?? null
      const status = objectiveStatuses.get(objective.id) ?? "not_started"
      return {
        ...common,
        kind: "lesson",
        objective,
        relatedLab,
        reason: status === "in_progress" ? "This lesson is already in progress." : "This is the first lesson awaiting understanding in roadmap order.",
        href: `${getRoadmapHref(week.week)}#objective-${objective.id.replace(".", "-")}`,
        actionLabel: `Continue ${weekLabel}: ${objective.id}`,
        suggestedMinutes: 20,
        drill: mappedDrill([objective.id], drills),
      }
    }

    if (lab) {
      const status = labStatuses.get(lab.id) ?? "not_started"
      return {
        ...common,
        kind: "lab",
        lab,
        reason: status === "in_progress" ? "This lab demonstration is already in progress." : "Lesson understanding is complete; this lab still needs demonstration evidence.",
        href: `/labs/${lab.id}`,
        actionLabel: `Open ${lab.id}: ${lab.title}`,
        suggestedMinutes: lab.durationMinutes,
        drill: mappedDrill(lab.objectiveIds, drills),
      }
    }
  }

  return { kind: "review" }
}
