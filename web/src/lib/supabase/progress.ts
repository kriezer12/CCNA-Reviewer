import { createClient } from "./server"

export interface TopicProgressRow {
  objective_id: string
  status: "not_started" | "in_progress" | "complete"
  completed_at: string | null
  updated_at: string
}

export interface LabProgressRow {
  lab_id: string
  status: "not_started" | "in_progress" | "complete"
  evidence_mode: "self_reported" | "verified"
  evidence_note: string | null
  completed_at: string | null
  updated_at: string
}

export interface StudySessionRow {
  id: string
  study_date: string
  duration_minutes: number
  objective_id: string | null
  lab_id: string | null
  notes: string | null
  created_at: string
}

export interface QuizAttemptRow {
  id: string
  quiz_id: string
  topic_id: string
  score: number
  total_questions: number
  selected_answers: Record<string, string>
  attempted_at: string
}

export interface DashboardData {
  topics: TopicProgressRow[]
  labs: LabProgressRow[]
  sessions: StudySessionRow[]
  attempts: QuizAttemptRow[]
}

export async function loadDashboardData(userId: string): Promise<DashboardData> {
  const supabase = await createClient()
  const [topics, labs, sessions, attempts] = await Promise.all([
    supabase.from("topic_progress").select("objective_id,status,completed_at,updated_at").eq("user_id", userId),
    supabase.from("lab_progress").select("lab_id,status,evidence_mode,evidence_note,completed_at,updated_at").eq("user_id", userId),
    supabase.from("study_sessions").select("id,study_date,duration_minutes,objective_id,lab_id,notes,created_at").eq("user_id", userId).order("study_date", { ascending: false }),
    supabase.from("quiz_attempts").select("id,quiz_id,topic_id,score,total_questions,selected_answers,attempted_at").eq("user_id", userId).order("attempted_at", { ascending: false }),
  ])

  const error = topics.error ?? labs.error ?? sessions.error ?? attempts.error
  if (error) throw new Error(`Unable to load study progress: ${error.message}`)

  return {
    topics: (topics.data ?? []) as TopicProgressRow[],
    labs: (labs.data ?? []) as LabProgressRow[],
    sessions: (sessions.data ?? []) as StudySessionRow[],
    attempts: (attempts.data ?? []) as QuizAttemptRow[],
  }
}

