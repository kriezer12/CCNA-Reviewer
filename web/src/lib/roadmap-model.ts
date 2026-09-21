import { curriculum, type BrowserActivity, type Lab, type Objective, type ObjectiveId, type RoadmapWeek } from "../content/curriculum.ts"

export interface RoadmapWeekDetail {
  week: RoadmapWeek
  objectives: readonly Objective[]
  labs: readonly Lab[]
  browserActivities: readonly BrowserActivity[]
}

export function getRoadmapHref(weekNumber: number): string {
  return `/roadmap/week/${String(weekNumber).padStart(2, "0")}`
}

export function getRoadmapWeek(weekParam: string | number): RoadmapWeekDetail | null {
  const rawValue = String(weekParam)
  if (!/^\d+$/.test(rawValue)) return null

  const weekNumber = Number(rawValue)
  const week = curriculum.roadmap.weeks.find((item) => item.week === weekNumber)
  if (!week) return null

  const activityIds = new Set(week.activityIds)
  const labs = curriculum.labs.filter((lab) => activityIds.has(lab.id))
  const browserActivities = curriculum.browserActivities.filter((activity) => activityIds.has(activity.id))
  const objectiveIds = new Set<ObjectiveId>([
    ...labs.flatMap((lab) => lab.objectiveIds),
    ...browserActivities.flatMap((activity) => activity.objectiveIds),
  ])
  const objectives = curriculum.objectives.filter((objective) => objectiveIds.has(objective.id))

  return { week, objectives, labs, browserActivities }
}

export function getRoadmapWeekObjectiveIds(week: RoadmapWeek): readonly ObjectiveId[] {
  const activityIds = new Set(week.activityIds)
  const objectiveIds = new Set<ObjectiveId>()

  for (const lab of curriculum.labs) {
    if (!activityIds.has(lab.id)) continue
    for (const objectiveId of lab.objectiveIds) objectiveIds.add(objectiveId)
  }

  for (const activity of curriculum.browserActivities) {
    if (!activityIds.has(activity.id)) continue
    for (const objectiveId of activity.objectiveIds) objectiveIds.add(objectiveId)
  }

  return curriculum.objectives.filter((objective) => objectiveIds.has(objective.id)).map((objective) => objective.id)
}
