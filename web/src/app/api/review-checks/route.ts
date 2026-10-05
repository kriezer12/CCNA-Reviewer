import { NextResponse } from "next/server"
import { practiceQuestions } from "@/content/practice"
import { createClient } from "@/lib/supabase/server"
import { getAllowedEmail, isAllowedEmail } from "@/lib/supabase/env"

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: auth, error: authError } = await supabase.auth.getUser()
  if (authError || !auth.user || !isAllowedEmail(auth.user.email, getAllowedEmail()))
    return NextResponse.json({error:"Sign in again to check a review answer."},{status:401})
  let body: unknown
  try { body = await request.json() }
  catch { return NextResponse.json({error:"Invalid request body."},{status:400}) }
  if (typeof body !== "object" || body === null || !("questionId" in body) || !("contentRevision" in body) || !("selectedChoice" in body) ||
    typeof body.questionId !== "string" || typeof body.contentRevision !== "number" || !Number.isSafeInteger(body.contentRevision) || typeof body.selectedChoice !== "string")
    return NextResponse.json({error:"Choose a saved question and answer."},{status:400})
  const question = practiceQuestions.find(item => item.id === body.questionId && item.contentRevision === body.contentRevision)
  if (!question || !question.choices.some(choice => choice.id === body.selectedChoice))
    return NextResponse.json({error:"This saved question has changed or is unavailable. Remove it and choose current practice."},{status:409})
  const {data,error} = await supabase.rpc("record_review_check", {
    p_question_id:question.id, p_content_revision:question.contentRevision, p_selected_choice:body.selectedChoice,
  })
  if (error) {
    if (error.code === "P0002") return NextResponse.json({error:"This question is no longer in your review list."},{status:404})
    if (error.code === "42501") return NextResponse.json({error:"Sign in again to check a review answer."},{status:401})
    return NextResponse.json({error:"Your answer could not be recorded. Retry this check."},{status:500})
  }
  const result = Array.isArray(data) ? data[0] : null
  if (!result) return NextResponse.json({error:"Your review result could not be loaded. Retry this check."},{status:500})
  return NextResponse.json({correct:result.is_correct,dueOn:result.due_on,successfulStage:result.successful_stage,alreadyChecked:result.already_checked})
}
