import {
  LayoutDashboard,
  PanelLeft,
  Route,
  ShieldCheck,
  Wifi,
  type LucideIcon,
} from "lucide-react"
import {
  calculateCompletion,
  calculateQuizScore,
  calculateQuizTrend,
  calculateStudyStreak,
  todayInTimeZone,
} from "@/lib/analytics"
import { curriculum } from "@/content/curriculum"
import { loadDashboardData, type DashboardData } from "@/lib/supabase/progress"
import { getRoadmapHref, getRoadmapWeekObjectiveIds } from "@/lib/roadmap-model"

export interface RoadmapRow {
  week: number
  label: string
  meta: string
  focus: string
  progress: number | null
  activityCount: number
  href: string
  icon: LucideIcon
}

export interface LabQueueRow {
  id: string
  name: string
  type: string
  time: string
  state: string
  evidence: string
}

export interface RecentActivity {
  label: string
  detail: string
  date: string
}

export interface DashboardModel {
  data: DashboardData
  dataError: string | null
  objectiveCompletion: ReturnType<typeof calculateCompletion> | null
  labCompletion: ReturnType<typeof calculateCompletion> | null
  studyMinutes: number | null
  streak: number | null
  latestAttempt: DashboardData["attempts"][number] | undefined
  quizTrend: number[]
  roadmap: RoadmapRow[]
  completedWeeks: number | null
  labs: LabQueueRow[]
  recentActivity: RecentActivity[]
}

export async function loadDashboardModel(userId: string): Promise<DashboardModel> {
  let data: DashboardData = { topics: [], labs: [], sessions: [], attempts: [] }
  let dataError: string | null = null

  try {
    data = await loadDashboardData(userId)
  } catch (error) {
    console.error("[dashboard-data] failed to load saved study data", error)
    dataError = "Saved study data is unavailable. Retry to load the latest state."
  }

  const objectiveCompletion = dataError ? null : calculateCompletion(data.topics, curriculum.objectives.length)
  const labCompletion = dataError ? null : calculateCompletion(data.labs, curriculum.labs.length)
  const studyMinutes = dataError ? null : data.sessions.reduce((total, session) => total + session.duration_minutes, 0)
  const streak = dataError ? null : calculateStudyStreak(data.sessions, todayInTimeZone(process.env.STUDY_TIME_ZONE ?? "Asia/Manila"))
  const latestAttempt = dataError ? undefined : data.attempts[0]
  const quizTrend = dataError ? [] : calculateQuizTrend(data.attempts)
  const completedObjectiveIds = new Set(data.topics.filter((row) => row.status === "complete").map((row) => row.objective_id))
  const roadmap = curriculum.roadmap.weeks.map((week, index) => {
    const objectiveIds = getRoadmapWeekObjectiveIds(week)
    const completed = objectiveIds.filter((objectiveId) => completedObjectiveIds.has(objectiveId)).length
    const progress = dataError ? null : objectiveIds.length === 0 ? 0 : Math.round((completed / objectiveIds.length) * 100)
    return {
      week: week.week,
      label: `Week ${String(week.week).padStart(2, "0")}`,
      meta: week.dates,
      focus: week.focus,
      progress,
      activityCount: week.activityIds.length,
      href: getRoadmapHref(week.week),
      icon: [LayoutDashboard, PanelLeft, Route, ShieldCheck, Wifi][Math.min(Math.floor(index / 4), 4)],
    }
  })
  const completedWeeks = dataError ? null : roadmap.filter((week) => week.progress === 100).length
  const labProgressById = new Map(data.labs.map((row) => [row.lab_id, row]))
  const labs = curriculum.labs.slice(5, 8).map((lab, index) => {
    const row = labProgressById.get(lab.id)
    return {
      id: lab.id,
      name: lab.title,
      type: lab.platform.primary,
      time: `${lab.durationMinutes} min`,
      state: dataError ? "Unavailable" : row?.status === "complete" ? "Complete" : row?.status === "in_progress" ? "In progress" : index === 0 ? "Next" : "Queued",
      evidence: dataError ? "not loaded" : row?.evidence_mode?.replace("_", " ") ?? "not recorded",
    }
  })

  const objectiveById = new Map<string, string>(curriculum.objectives.map((objective) => [objective.id, objective.title]))
  const labById = new Map<string, string>(curriculum.labs.map((lab) => [lab.id, lab.title]))
  const recentActivity = [
    ...data.topics.map((row) => ({ label: `${row.objective_id} · ${objectiveById.get(row.objective_id) ?? "Objective"}`, detail: `Lesson ${row.status.replace("_", " ")}`, date: row.updated_at })),
    ...data.labs.map((row) => ({ label: `${row.lab_id} · ${labById.get(row.lab_id) ?? "Lab"}`, detail: `Lab ${row.status.replace("_", " ")} · ${row.evidence_mode.replace("_", " ")}`, date: row.updated_at })),
    ...data.sessions.map((row) => ({ label: `${row.duration_minutes} minutes recorded`, detail: row.notes ?? "Study session", date: row.created_at })),
    ...data.attempts.map((row) => ({ label: `${row.score}/${row.total_questions} quiz attempt`, detail: `${row.quiz_id} · ${(row.objective_ids.length ? row.objective_ids : [row.topic_id]).join(", ")}`, date: row.attempted_at })),
  ].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 6)

  return {
    data,
    dataError,
    objectiveCompletion,
    labCompletion,
    studyMinutes,
    streak,
    latestAttempt,
    quizTrend,
    roadmap,
    completedWeeks,
    labs,
    recentActivity,
  }
}

export { calculateQuizScore }
