import { NextResponse } from "next/server"
import { validateMissedSubmission } from "@/lib/review-model"
import { createClient } from "@/lib/supabase/server"
import { getAllowedEmail, isAllowedEmail } from "@/lib/supabase/env"

async function ownerClient() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()
  return !error && data.user && isAllowedEmail(data.user.email, getAllowedEmail())
    ? { supabase, user: data.user } : null
}

export async function POST(request: Request) {
  const owner = await ownerClient()
  if (!owner) return NextResponse.json({ error: "Sign in again to save missed questions." }, { status: 401 })
  let body: unknown
  try { body = await request.json() }
  catch { return NextResponse.json({ error: "Invalid request body." }, { status: 400 }) }
  const submission = validateMissedSubmission(body)
  if (!submission.ok) return NextResponse.json({ error: submission.error }, { status: 400 })
  if (!submission.missed.length) return NextResponse.json({ saved: 0 })
  const { error } = await owner.supabase.from("review_items").upsert(
    submission.missed.map(item => ({ user_id: owner.user.id, question_id: item.questionId, content_revision: item.contentRevision })),
    { onConflict: "user_id,question_id,content_revision", ignoreDuplicates: true },
  )
  if (error) return NextResponse.json({ error: "Missed questions could not be saved. Retry this action." }, { status: 500 })
  return NextResponse.json({ saved: submission.missed.length })
}

export async function DELETE(request: Request) {
  const owner = await ownerClient()
  if (!owner) return NextResponse.json({ error: "Sign in again to remove this question." }, { status: 401 })
  let body: unknown
  try { body = await request.json() }
  catch { return NextResponse.json({ error: "Invalid request body." }, { status: 400 }) }
  // Retired references must remain removable; do not require current publication.
  if (typeof body !== "object" || body === null || !("questionId" in body) || !("contentRevision" in body) ||
      typeof body.questionId !== "string" || body.questionId.length < 1 || body.questionId.length > 100 ||
      typeof body.contentRevision !== "number" || !Number.isSafeInteger(body.contentRevision) || body.contentRevision < 1)
    return NextResponse.json({ error: "Choose a valid saved question." }, { status: 400 })
  const { error } = await owner.supabase.from("review_items").delete().eq("user_id", owner.user.id)
    .eq("question_id", body.questionId).eq("content_revision", body.contentRevision)
  if (error) return NextResponse.json({ error: "The question could not be removed. Retry this action." }, { status: 500 })
  return NextResponse.json({ removed: true })
}
