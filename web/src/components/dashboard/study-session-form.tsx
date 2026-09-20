"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Check, LoaderCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { createClient } from "@/lib/supabase/client"

export function StudySessionForm() {
  const router = useRouter()
  const [studyDate, setStudyDate] = useState("")
  const [duration, setDuration] = useState(30)
  const [notes, setNotes] = useState("")
  const [state, setState] = useState<"idle" | "saving" | "saved" | "error">("idle")

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!studyDate || duration < 1 || duration > 720) { setState("error"); return }
    setState("saving")
    const supabase = createClient()
    const { data: userData, error: userError } = await supabase.auth.getUser()
    if (userError || !userData.user) { setState("error"); return }
    const { error } = await supabase.from("study_sessions").insert({ user_id: userData.user.id, study_date: studyDate, duration_minutes: duration, notes: notes.trim() || null })
    if (error) { setState("error"); return }
    setNotes("")
    setState("saved")
    router.refresh()
  }

  return (
    <Card>
      <CardHeader><CardDescription className="font-mono text-[10px] uppercase tracking-[0.15em]">Study log</CardDescription><CardTitle>Add a focused session</CardTitle></CardHeader>
      <CardContent><form className="flex flex-col gap-4" onSubmit={save}>
        <div className="grid gap-4 sm:grid-cols-2"><label className="flex flex-col gap-2 text-sm"><span>Study date</span><Input required type="date" value={studyDate} onChange={(event) => { setStudyDate(event.target.value); setState("idle") }} /></label><label className="flex flex-col gap-2 text-sm"><span>Minutes</span><Input required min={1} max={720} type="number" value={duration} onChange={(event) => { setDuration(Number(event.target.value)); setState("idle") }} /></label></div>
        <Textarea aria-label="Session notes" value={notes} onChange={(event) => { setNotes(event.target.value); setState("idle") }} placeholder="What did you retrieve, configure, or verify?" />
        <Button disabled={state === "saving"} type="submit">{state === "saving" ? <LoaderCircle className="animate-spin" /> : state === "saved" ? <Check /> : null}{state === "saved" ? "Session saved" : "Save session"}</Button>
        {state === "error" ? <p className="text-sm text-destructive" role="alert">Could not save the session. Choose a date and 1–720 minutes, then retry.</p> : null}
      </form></CardContent>
    </Card>
  )
}
