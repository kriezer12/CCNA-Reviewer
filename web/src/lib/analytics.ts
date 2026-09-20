export type ProgressStatus = "not_started" | "in_progress" | "complete"

export interface ProgressRecord {
  status: ProgressStatus
}

export interface StudySessionRecord {
  study_date: string
  duration_minutes: number
}

export function calculateCompletion(records: readonly ProgressRecord[], total: number) {
  const completed = records.filter((record) => record.status === "complete").length
  const safeTotal = Math.max(total, 0)

  return {
    completed: Math.min(completed, safeTotal),
    total: safeTotal,
    percentage: safeTotal === 0 ? 0 : Math.round((Math.min(completed, safeTotal) / safeTotal) * 100),
  }
}

export function calculateQuizScore(score: number, totalQuestions: number) {
  if (totalQuestions <= 0 || score <= 0) return 0
  return Math.round((Math.min(score, totalQuestions) / totalQuestions) * 100)
}

export function aggregateStudyMinutes(sessions: readonly StudySessionRecord[]) {
  return sessions.reduce<Record<string, number>>((dailyTotals, session) => {
    dailyTotals[session.study_date] = (dailyTotals[session.study_date] ?? 0) + session.duration_minutes
    return dailyTotals
  }, {})
}

export function calculateStudyStreak(
  sessions: readonly StudySessionRecord[],
  today = new Date()
) {
  const dailyTotals = aggregateStudyMinutes(sessions)
  const todayKey = toLocalDateKey(today)
  const startDate = dailyTotals[todayKey] >= 30 ? today : shiftDate(today, -1)
  let streak = 0
  let cursor = startDate

  while (dailyTotals[toLocalDateKey(cursor)] >= 30) {
    streak += 1
    cursor = shiftDate(cursor, -1)
  }

  return streak
}

export function toLocalDateKey(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

function shiftDate(date: Date, days: number) {
  const shifted = new Date(date)
  shifted.setDate(shifted.getDate() + days)
  return shifted
}
