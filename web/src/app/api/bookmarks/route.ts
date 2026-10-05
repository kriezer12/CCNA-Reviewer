import { NextResponse } from "next/server"
import { curriculum } from "@/content/curriculum"
import { practiceQuestions } from "@/content/practice"
import { createClient } from "@/lib/supabase/server"
import { getAllowedEmail, isAllowedEmail } from "@/lib/supabase/env"

type ResourceType = "guide" | "question"
async function ownerClient() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()
  return !error && data.user && isAllowedEmail(data.user.email, getAllowedEmail())
    ? { supabase, user: data.user } : null
}
function validResource(type: unknown, id: unknown): type is ResourceType {
  if (typeof id !== "string") return false
  if (type === "guide") return curriculum.objectives.some(objective => objective.id === id)
  return type === "question" && practiceQuestions.some(question => question.id === id)
}

export async function GET() {
  const owner = await ownerClient()
  if (!owner) return NextResponse.json({ error: "Sign in again to view bookmarks." }, { status: 401 })
  const { data, error } = await owner.supabase.from("bookmarks").select("resource_type,resource_id,saved_at")
    .eq("user_id", owner.user.id).order("saved_at", { ascending: false })
  if (error) return NextResponse.json({ error: "Bookmarks could not be loaded." }, { status: 500 })
  return NextResponse.json({ bookmarks: data })
}

export async function POST(request: Request) {
  const owner = await ownerClient()
  if (!owner) return NextResponse.json({ error: "Sign in again to save this bookmark." }, { status: 401 })
  let body: unknown
  try { body = await request.json() }
  catch { return NextResponse.json({ error: "Invalid request body." }, { status: 400 }) }
  if (typeof body !== "object" || body === null || !("resourceType" in body) || !("resourceId" in body) ||
    !validResource(body.resourceType, body.resourceId)) return NextResponse.json({ error: "Choose a current guide or practice question." }, { status: 400 })
  const { error } = await owner.supabase.from("bookmarks").upsert({ user_id: owner.user.id,
    resource_type: body.resourceType, resource_id: body.resourceId },
    { onConflict: "user_id,resource_type,resource_id", ignoreDuplicates: true })
  if (error) return NextResponse.json({ error: "Bookmark could not be saved. Retry this action." }, { status: 500 })
  return NextResponse.json({ saved: true })
}

export async function DELETE(request: Request) {
  const owner = await ownerClient()
  if (!owner) return NextResponse.json({ error: "Sign in again to remove this bookmark." }, { status: 401 })
  let body: unknown
  try { body = await request.json() }
  catch { return NextResponse.json({ error: "Invalid request body." }, { status: 400 }) }
  if (typeof body !== "object" || body === null || !("resourceType" in body) || !("resourceId" in body) ||
    (body.resourceType !== "guide" && body.resourceType !== "question") || typeof body.resourceId !== "string" ||
    body.resourceId.length < 1 || body.resourceId.length > 100) return NextResponse.json({ error: "Choose a saved resource." }, { status: 400 })
  const { error } = await owner.supabase.from("bookmarks").delete().eq("user_id", owner.user.id)
    .eq("resource_type", body.resourceType).eq("resource_id", body.resourceId)
  if (error) return NextResponse.json({ error: "Bookmark could not be removed. Retry this action." }, { status: 500 })
  return NextResponse.json({ removed: true })
}
