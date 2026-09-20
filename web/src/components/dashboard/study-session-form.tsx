"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Check, LoaderCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import type { Lab, Objective } from "@/content/curriculum"
import { createClient } from "@/lib/supabase/client"

export function StudySessionForm({ objectives, labs }: { objectives: readonly Objective[]; labs: readonly Lab[] }) {
  const router = useRouter()
  const [studyDate, setStudyDate] = useState("")
  const [duration, setDuration] = useState(30)
  const [objectiveId, setObjectiveId] = useState<string>("")
  const [labId, setLabId] = useState<string>("")
  const [notes, setNotes] = useState("")
  const [state, setState] = useState<"idle" | "saving" | "saved" | "error">("idle")

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!studyDate || duration < 1 || duration > 720) { setState("error"); return }
    setState("saving")
    const supabase = createClient()
    const { data: userData, error: userError } = await supabase.auth.getUser()
    if (userError || !userData.user) { setState("error"); return }
    const objective = objectiveId ? objectives.find((item) => item.id === objectiveId) : undefined
    const lab = labId ? labs.find((item) => item.id === labId) : undefined
    if ((objectiveId && !objective) || (labId && !lab)) { setState("error"); return }
    const { error } = await supabase.from("study_sessions").insert({ user_id: userData.user.id, study_date: studyDate, duration_minutes: duration, objective_id: objective?.id ?? null, lab_id: lab?.id ?? null, notes: notes.trim() || null })
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
        <div className="grid gap-4 sm:grid-cols-2"><Select value={objectiveId || "none"} onValueChange={(value) => { setObjectiveId(value === "none" ? "" : value ?? ""); setState("idle") }}><SelectTrigger aria-label="Related objective"><SelectValue placeholder="Related objective (optional)" /></SelectTrigger><SelectContent><SelectItem value="none">No objective</SelectItem>{objectives.map((objective) => <SelectItem key={objective.id} value={objective.id}>{objective.id} · {objective.title}</SelectItem>)}</SelectContent></Select><Select value={labId || "none"} onValueChange={(value) => { setLabId(value === "none" ? "" : value ?? ""); setState("idle") }}><SelectTrigger aria-label="Related lab"><SelectValue placeholder="Related lab (optional)" /></SelectTrigger><SelectContent><SelectItem value="none">No lab</SelectItem>{labs.map((lab) => <SelectItem key={lab.id} value={lab.id}>{lab.id} · {lab.title}</SelectItem>)}</SelectContent></Select></div>
        <Textarea aria-label="Session notes" value={notes} onChange={(event) => { setNotes(event.target.value); setState("idle") }} placeholder="What did you retrieve, configure, or verify?" />
        <Button disabled={state === "saving"} type="submit">{state === "saving" ? <LoaderCircle className="animate-spin" /> : state === "saved" ? <Check /> : null}{state === "saved" ? "Session saved" : "Save session"}</Button>
        {state === "error" ? <p className="text-sm text-destructive" role="alert">Could not save the session. Choose a date and 1–720 minutes, then retry.</p> : null}
      </form></CardContent>
    </Card>
  )
}
