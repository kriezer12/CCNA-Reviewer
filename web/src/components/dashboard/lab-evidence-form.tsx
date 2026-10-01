"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import type { Lab } from "@/content/curriculum"
import { createClient } from "@/lib/supabase/client"
import type { LabProgressRow } from "@/lib/supabase/progress"

type Status = LabProgressRow["status"]
type Mode = LabProgressRow["evidence_mode"]

export function LabEvidenceForm({ lab, initialRow }: { lab: Lab; initialRow: LabProgressRow | null }) {
  const router = useRouter()
  const [status, setStatus] = useState<Status>(initialRow?.status ?? "not_started")
  const [mode, setMode] = useState<Mode>(initialRow?.evidence_mode ?? lab.evidence.mode)
  const [note, setNote] = useState(initialRow?.evidence_note ?? "")
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [saved, setSaved] = useState({ status: initialRow?.status ?? "not_started", mode: initialRow?.evidence_mode ?? lab.evidence.mode, note: initialRow?.evidence_note ?? "" })
  const dirty = status !== saved.status || mode !== saved.mode || note !== saved.note
  const dirtyRef = useRef(dirty)
  dirtyRef.current = dirty

  useEffect(() => {
    const prompt = "You have unsaved lab evidence. Discard these edits and leave?"
    function beforeUnload(event: BeforeUnloadEvent) {
      if (!dirtyRef.current) return
      event.preventDefault()
      event.returnValue = ""
    }
    function onLink(event: MouseEvent) {
      if (!dirtyRef.current || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const anchor = (event.target as Element).closest<HTMLAnchorElement>("a[href]")
      if (!anchor || !document.contains(anchor)) return
      if (anchor.hash && anchor.pathname === location.pathname && anchor.search === location.search) return
      if (!window.confirm(prompt)) event.preventDefault()
    }
    function onPopState() {
      if (!dirtyRef.current) return
      if (window.confirm(prompt)) return
      window.history.forward()
    }
    window.addEventListener("beforeunload", beforeUnload)
    document.addEventListener("click", onLink, true)
    window.addEventListener("popstate", onPopState)
    return () => { window.removeEventListener("beforeunload", beforeUnload); document.removeEventListener("click", onLink, true); window.removeEventListener("popstate", onPopState) }
  }, [])

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (saving) return
    setError(""); setMessage("")
    if (status === "complete" && !note.trim()) {
      setError("Add an evidence note before recording a completed demonstration.")
      document.getElementById("lab-evidence-note")?.focus()
      return
    }
    setSaving(true)
    try {
      const supabase = createClient()
      const { data, error: authError } = await supabase.auth.getUser()
      if (authError || !data.user) throw new Error("Your session expired. Sign in again, then retry. Your edits remain here until you leave or reload.")
      const trimmed = note.trim()
      const { error: writeError } = await supabase.from("lab_progress").upsert({
        user_id: data.user.id, lab_id: lab.id, status, evidence_mode: mode,
        evidence_note: trimmed || null,
        completed_at: status === "complete" ? initialRow?.completed_at ?? new Date().toISOString() : null,
        updated_at: new Date().toISOString(),
      }, { onConflict: "user_id,lab_id" })
      if (writeError) throw writeError
      setNote(trimmed)
      setSaved({ status, mode, note: trimmed })
      setMessage(status === "complete" ? "Saved. Recorded demonstration refreshed." : "Saved. Lab progress refreshed.")
      router.refresh()
    } catch (cause) {
      setError(cause instanceof Error && cause.message.startsWith("Your session expired") ? cause.message : "Could not save the lab evidence. Check your connection and retry; your edits are still here.")
    } finally { setSaving(false) }
  }

  return <form className="space-y-5" onSubmit={save}>
    <p className="text-sm leading-6 text-muted-foreground">Saved status: {saved.status.replaceAll("_", " ")}. Saved evidence mode: {saved.mode.replaceAll("_", " ")}. Completing this form records a demonstration; it does not mark lesson understanding or study time.</p>
    <div className="grid gap-5 sm:grid-cols-2">
      <div className="space-y-2"><label className="block font-medium" htmlFor="lab-status">Lab status</label><select className="min-h-11 w-full rounded-md border border-input bg-background px-3" id="lab-status" value={status} onChange={(event) => { setStatus(event.target.value as Status); setMessage("") }}><option value="not_started">Not started</option><option value="in_progress">In progress</option><option value="complete">Complete — recorded demonstration</option></select></div>
      <div className="space-y-2"><label className="block font-medium" htmlFor="lab-mode">Evidence mode</label><select className="min-h-11 w-full rounded-md border border-input bg-background px-3" id="lab-mode" value={mode} onChange={(event) => { setMode(event.target.value as Mode); setMessage("") }}><option value="self_reported">Self reported</option><option value="verified">Verified</option></select></div>
    </div>
    <p className="text-sm leading-6 text-muted-foreground">Verified means you checked the declared platform and evidence contract yourself. Selecting it does not run an automatic checker. Platform boundary: {lab.platform.limitation}</p>
    <div className="space-y-2"><label className="block font-medium" htmlFor="lab-evidence-note">Evidence note {status === "complete" ? "(required)" : "(optional)"}</label><p className="text-sm leading-6 text-muted-foreground" id="lab-note-help">Describe topology, command output, test results, and limitations. Cover: {lab.evidence.required.join("; ")}.</p><textarea aria-describedby="lab-note-help" aria-invalid={Boolean(error && status === "complete" && !note.trim())} className="min-h-36 w-full rounded-md border border-input bg-background px-3 py-2 leading-6" id="lab-evidence-note" value={note} onChange={(event) => { setNote(event.target.value); setMessage("") }} /></div>
    <Button className="min-h-11" disabled={saving} type="submit">{saving ? "Saving…" : "Save lab evidence"}</Button>
    {dirty ? <p className="text-sm text-muted-foreground">Unsaved edits. Leaving will ask you to discard them.</p> : null}
    {error ? <p className="text-sm text-destructive" role="alert">{error}</p> : null}
    {message ? <p className="text-sm" role="status">{message}</p> : null}
  </form>
}
