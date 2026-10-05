"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export function ObjectiveNoteEditor({ objectiveId, initial, initialError = false }: { objectiveId: string; initial: { revision: number; body: string } | null; initialError?: boolean }) {
  const [revision, setRevision] = useState(initial?.revision ?? null)
  const [savedBody, setSavedBody] = useState(initial?.body ?? "")
  const [body, setBody] = useState(initial?.body ?? "")
  const [state, setState] = useState("")
  const [loadError, setLoadError] = useState(initialError)
  const dirty = body !== savedBody
  useEffect(() => {
    if (!dirty) return
    const beforeUnload = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = "" }
    const guardLink = (event: MouseEvent) => {
      const link = (event.target as Element).closest<HTMLAnchorElement>("a[href]")
      if (link && link.pathname !== location.pathname && !window.confirm("Your note has unsaved edits. Leave this guide and discard them?")) event.preventDefault()
    }
    const customGuard = (event: Event) => { if (!window.confirm("Your note has unsaved edits. Leave and discard them?")) event.preventDefault() }
    window.addEventListener("beforeunload", beforeUnload)
    document.addEventListener("click", guardLink, true)
    window.addEventListener("study:before-navigation", customGuard)
    return () => { window.removeEventListener("beforeunload", beforeUnload); document.removeEventListener("click", guardLink, true); window.removeEventListener("study:before-navigation", customGuard) }
  }, [dirty])

  async function save() {
    if (!body.trim() || body.length > 5000) { setState("Write 1 to 5,000 characters before saving."); return }
    setState("Saving note…")
    const response = await fetch(`/api/objective-notes/${objectiveId}`, { method: revision === null ? "POST" : "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify(revision === null ? { note: body } : { revision, note: body }) })
    const result = await response.json().catch(() => ({}))
    if (!response.ok) { setState(result.error ?? "Your note was not saved. Your text is still here; retry."); return }
    setRevision(result.revision)
    setSavedBody(body)
    setState("Note saved privately.")
  }

  async function reload() {
    const response = await fetch(`/api/objective-notes/${objectiveId}`)
    const result = await response.json().catch(() => ({}))
    if (!response.ok) { setLoadError(true); setState(result.error ?? "Your note could not be loaded."); return }
    setLoadError(false)
    setRevision(result.note?.revision ?? null)
    setSavedBody(result.note?.body ?? "")
    setBody(result.note?.body ?? "")
    setState("Latest saved note loaded. Your previous local edits were replaced.")
  }

  async function remove() {
    if (revision === null) { setBody(""); setSavedBody(""); setState("Unsaved note cleared."); return }
    const response = await fetch(`/api/objective-notes/${objectiveId}`, { method: "DELETE", headers: { "content-type": "application/json" }, body: JSON.stringify({ revision }) })
    const result = await response.json().catch(() => ({}))
    if (!response.ok) { setState(result.error ?? "Your note remains saved. Retry delete."); return }
    setRevision(null); setSavedBody(""); setBody(""); setState("Note deleted.")
  }

  return <section aria-labelledby="objective-note-heading" className="flex min-w-0 flex-col gap-3 rounded-xl border border-border p-5">
    <h2 id="objective-note-heading" className="text-xl font-semibold">My private objective note</h2>
    <p className="text-sm leading-6 text-muted-foreground">Plain text for your own reminder. This is separate from study-session notes and lab evidence.</p>
    {loadError ? <p role="alert">Your note could not be loaded. Retry before editing so a saved note is not mistaken for an empty one.</p> : null}
    <label htmlFor={`objective-note-${objectiveId}`} className="font-medium">Note for objective {objectiveId}</label>
    <Textarea id={`objective-note-${objectiveId}`} value={body} disabled={loadError} maxLength={5000} rows={7} className="min-h-36 resize-y whitespace-pre-wrap break-words" onChange={event => { setBody(event.target.value); setState("") }} aria-describedby="objective-note-count" placeholder="Write a reminder or explain this concept in your own words…" />
    <p id="objective-note-count" className="text-sm text-muted-foreground">{body.length} / 5,000 characters</p>
    <div className="flex flex-wrap gap-3">
      <Button className="min-h-11" onClick={() => void save()} disabled={!dirty || loadError}>Save note</Button>
      {loadError ? <Button className="min-h-11" variant="outline" onClick={() => void reload()}>Retry loading note</Button> : null}
      {revision !== null ? <Button className="min-h-11" variant="outline" onClick={() => void remove()}>Delete note</Button> : body ? <Button className="min-h-11" variant="outline" onClick={() => void remove()}>Clear unsaved note</Button> : null}
      {state.includes("another device") ? <Button className="min-h-11" variant="outline" onClick={() => void reload()}>Reload latest note</Button> : null}
    </div>
    {state ? <p role="status" className="text-sm" aria-live="polite">{state}</p> : null}
  </section>
}
