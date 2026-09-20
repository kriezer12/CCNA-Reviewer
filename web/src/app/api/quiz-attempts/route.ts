import { NextResponse } from "next/server"

import { curriculum, type DomainId } from "@/content/curriculum"
import { quizQuestions, validateQuizSubmission } from "@/content/quizzes"
import { isAllowedEmail, getAllowedEmail } from "@/lib/supabase/env"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 })
  }

  if (!isRecord(body) || typeof body.domainId !== "string" || !isDomainId(body.domainId) || !isRecord(body.answers)) {
    return NextResponse.json({ error: "Choose a valid quiz domain and answer every question." }, { status: 400 })
  }

  const questions = quizQuestions.filter((question) => question.domainId === body.domainId)
  const answers = Object.fromEntries(Object.entries(body.answers).filter((entry): entry is [string, string] => typeof entry[1] === "string"))
  if (!validateQuizSubmission(questions, answers)) {
    return NextResponse.json({ error: "Answer every question with a valid option." }, { status: 400 })
  }

  const firstQuestion = questions[0]
  if (!firstQuestion) return NextResponse.json({ error: "That quiz is unavailable." }, { status: 400 })

  const supabase = await createClient()
  const { data: userData } = await supabase.auth.getUser()
  if (!userData.user || !isAllowedEmail(userData.user.email, getAllowedEmail())) {
    return NextResponse.json({ error: "Authentication is required." }, { status: 401 })
  }

  const score = questions.filter((question) => answers[question.id] === question.correctOptionId).length
  const objectiveIds = [...new Set(questions.flatMap((question) => question.objectiveIds))]
  const { error } = await supabase.from("quiz_attempts").insert({
    user_id: userData.user.id,
    quiz_id: firstQuestion.quizId,
    topic_id: firstQuestion.objectiveIds[0],
    objective_ids: objectiveIds,
    score,
    total_questions: questions.length,
    selected_answers: answers,
  })

  if (error) return NextResponse.json({ error: "The quiz attempt could not be saved." }, { status: 500 })
  return NextResponse.json({ score, totalQuestions: questions.length })
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function isDomainId(value: string): value is DomainId {
  return curriculum.domains.some((domain) => domain.id === value)
}
