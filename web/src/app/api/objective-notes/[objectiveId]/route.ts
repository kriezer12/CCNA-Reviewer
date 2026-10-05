import { NextResponse } from "next/server"
import { curriculum } from "@/content/curriculum"
import { createClient } from "@/lib/supabase/server"
import { getAllowedEmail, isAllowedEmail } from "@/lib/supabase/env"

async function ownerClient() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()
  return !error && data.user && isAllowedEmail(data.user.email, getAllowedEmail()) ? { supabase, user: data.user } : null
}

async function objective(context: { params: Promise<{ objectiveId: string }> }) {
  const { objectiveId } = await context.params
  return curriculum.objectives.some(item => item.id === objectiveId) ? objectiveId : null
}

export async function GET(_request: Request, context: { params: Promise<{ objectiveId: string }> }) {
  const id = await objective(context)
  if (!id) return NextResponse.json({ error: "Choose a current objective." }, { status: 404 })
  const owner = await ownerClient()
  if (!owner) return NextResponse.json({ error: "Sign in again to load your note." }, { status: 401 })
  const { data, error } = await owner.supabase.from("objective_notes").select("revision,body,updated_at").eq("user_id", owner.user.id).eq("objective_id", id).maybeSingle()
  if (error) return NextResponse.json({ error: "Your note could not be loaded." }, { status: 500 })
  return NextResponse.json({ note: data })
}

async function noteBody(request: Request): Promise<string | null> {
  const body = await request.json().catch(() => null)
  if (!body || typeof body.note !== "string" || body.note.trim().length < 1 || body.note.length > 5000) return null
  return body.note
}

export async function POST(request: Request, context: { params: Promise<{ objectiveId: string }> }) {
  const id = await objective(context)
  if (!id) return NextResponse.json({ error: "Choose a current objective." }, { status: 404 })
  const owner = await ownerClient()
  if (!owner) return NextResponse.json({ error: "Sign in again to save your note." }, { status: 401 })
  const note = await noteBody(request)
  if (note === null) return NextResponse.json({ error: "Write a note of 1 to 5,000 characters." }, { status: 400 })
  const { error } = await owner.supabase.from("objective_notes").insert({ user_id: owner.user.id, objective_id: id, revision: 1, body: note })
  if (error) return NextResponse.json({ error: error.code === "23505" ? "A note already exists. Reload it before editing." : "Your note was not saved. Your text is still here; retry." }, { status: error.code === "23505" ? 409 : 500 })
  return NextResponse.json({ saved: true, revision: 1 })
}

export async function PUT(request: Request, context: { params: Promise<{ objectiveId: string }> }) {
  const id = await objective(context)
  if (!id) return NextResponse.json({ error: "Choose a current objective." }, { status: 404 })
  const owner = await ownerClient()
  if (!owner) return NextResponse.json({ error: "Sign in again to save your note." }, { status: 401 })
  const body = await request.json().catch(() => null)
  if (!body || !Number.isSafeInteger(body.revision) || body.revision < 1) return NextResponse.json({ error: "Reload your note before editing." }, { status: 400 })
  const note = await noteBody(new Request("http://local", { method: "POST", body: JSON.stringify(body) }))
  if (note === null) return NextResponse.json({ error: "Write a note of 1 to 5,000 characters." }, { status: 400 })
  const next = Number(body.revision) + 1
  const { data, error } = await owner.supabase.from("objective_notes").update({ revision: next, body: note, updated_at: new Date().toISOString() }).eq("user_id", owner.user.id).eq("objective_id", id).eq("revision", body.revision).select("revision").maybeSingle()
  if (error) return NextResponse.json({ error: "Your note was not saved. Your text is still here; retry." }, { status: 500 })
  if (!data) return NextResponse.json({ error: "This note changed on another device. Reload or copy your edits before replacing it." }, { status: 409 })
  return NextResponse.json({ saved: true, revision: next })
}

export async function DELETE(request: Request, context: { params: Promise<{ objectiveId: string }> }) {
  const id = await objective(context)
  if (!id) return NextResponse.json({ error: "Choose a current objective." }, { status: 404 })
  const owner = await ownerClient()
  if (!owner) return NextResponse.json({ error: "Sign in again to delete your note." }, { status: 401 })
  const body = await request.json().catch(() => null)
  if (!body || !Number.isSafeInteger(body.revision) || body.revision < 1) return NextResponse.json({ error: "Reload your note before deleting." }, { status: 400 })
  const { data, error } = await owner.supabase.from("objective_notes").delete().eq("user_id", owner.user.id).eq("objective_id", id).eq("revision", body.revision).select("revision").maybeSingle()
  if (error) return NextResponse.json({ error: "Your note remains saved. Retry delete." }, { status: 500 })
  if (!data) return NextResponse.json({ error: "This note changed on another device. Reload before deleting." }, { status: 409 })
  return NextResponse.json({ deleted: true })
}
