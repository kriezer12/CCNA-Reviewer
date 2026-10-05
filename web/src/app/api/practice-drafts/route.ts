import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { getAllowedEmail, isAllowedEmail } from "@/lib/supabase/env"
import { validatePracticeDraft } from "@/lib/practice-draft-model"

async function ownerClient() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()
  return !error && data.user && isAllowedEmail(data.user.email, getAllowedEmail())
    ? { supabase, user: data.user } : null
}

export async function GET() {
  const owner = await ownerClient()
  if (!owner) return NextResponse.json({ error: "Sign in again to load your saved practice." }, { status: 401 })
  const { data, error } = await owner.supabase.from("practice_drafts").select("revision,draft,updated_at").eq("user_id", owner.user.id).maybeSingle()
  if (error) return NextResponse.json({ error: "Saved practice could not be loaded." }, { status: 500 })
  return NextResponse.json({ draft: data })
}

export async function POST(request: Request) {
  const owner = await ownerClient()
  if (!owner) return NextResponse.json({ error: "Sign in again to save practice." }, { status: 401 })
  const body = await request.json().catch(() => null)
  const draft = validatePracticeDraft(body)
  if (!draft) return NextResponse.json({ error: "This practice has changed or contains invalid answers. Restart it before saving." }, { status: 400 })
  const { error } = await owner.supabase.from("practice_drafts").insert({ user_id: owner.user.id, revision: 1, draft })
  if (error) return NextResponse.json({ error: error.code === "23505" ? "A saved practice already exists. Reload it before replacing." : "Practice could not be saved. Your answers are still here; retry." }, { status: error.code === "23505" ? 409 : 500 })
  return NextResponse.json({ saved: true, revision: 1 })
}

export async function PUT(request: Request) {
  const owner = await ownerClient()
  if (!owner) return NextResponse.json({ error: "Sign in again to save practice." }, { status: 401 })
  const body = await request.json().catch(() => null)
  if (!body || typeof body !== "object" || !Number.isSafeInteger(body.revision) || body.revision < 1) return NextResponse.json({ error: "Reload saved practice before editing." }, { status: 400 })
  const draft = validatePracticeDraft(body.draft)
  if (!draft) return NextResponse.json({ error: "This practice has changed or contains invalid answers. Restart it before saving." }, { status: 400 })
  const next = Number(body.revision) + 1
  const { data, error } = await owner.supabase.from("practice_drafts").update({ revision: next, draft, updated_at: new Date().toISOString() }).eq("user_id", owner.user.id).eq("revision", body.revision).select("revision").maybeSingle()
  if (error) return NextResponse.json({ error: "Practice could not be saved. Your answers are still here; retry." }, { status: 500 })
  if (!data) return NextResponse.json({ error: "This draft changed on another device. Reload it or explicitly replace it." }, { status: 409 })
  return NextResponse.json({ saved: true, revision: next })
}

export async function DELETE(request: Request) {
  const owner = await ownerClient()
  if (!owner) return NextResponse.json({ error: "Sign in again to discard saved practice." }, { status: 401 })
  const body = await request.json().catch(() => null)
  if (!body || !Number.isSafeInteger(body.revision) || body.revision < 1) return NextResponse.json({ error: "Reload saved practice before discarding." }, { status: 400 })
  const { data, error } = await owner.supabase.from("practice_drafts").delete().eq("user_id", owner.user.id).eq("revision", body.revision).select("revision").maybeSingle()
  if (error) return NextResponse.json({ error: "Saved practice remains available. Retry discard." }, { status: 500 })
  if (!data) return NextResponse.json({ error: "This draft changed on another device. Reload it before discarding." }, { status: 409 })
  return NextResponse.json({ discarded: true })
}
