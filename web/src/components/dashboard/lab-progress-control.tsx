"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Check, LoaderCircle } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import type { Lab } from "@/content/curriculum"
import { createClient } from "@/lib/supabase/client"
import type { LabProgressRow } from "@/lib/supabase/progress"

type Status = "not_started" | "in_progress" | "complete"
type EvidenceMode = "self_reported" | "verified"

export function LabProgressControl({ labs, initialRows }: { labs: readonly Lab[]; initialRows: readonly LabProgressRow[] }) {
  const router = useRouter()
  const initial = useMemo(() => new Map(initialRows.map((row) => [row.lab_id, row])), [initialRows])
  const [labId, setLabId] = useState<string>(labs[0]?.id ?? "")
  const [status, setStatus] = useState<Status>(initial.get(labs[0]?.id ?? "")?.status ?? "not_started")
  const [evidenceMode, setEvidenceMode] = useState<EvidenceMode>(initial.get(labs[0]?.id ?? "")?.evidence_mode ?? "self_reported")
  const [evidenceNote, setEvidenceNote] = useState(initial.get(labs[0]?.id ?? "")?.evidence_note ?? "")
  const [state, setState] = useState<"idle" | "saving" | "saved" | "error">("idle")

  function changeLab(value: string | null) {
    const nextId = value ?? ""
    const row = initial.get(nextId)
    setLabId(nextId)
    setStatus(row?.status ?? "not_started")
    setEvidenceMode(row?.evidence_mode ?? "self_reported")
    setEvidenceNote(row?.evidence_note ?? "")
    setState("idle")
  }

  async function save() {
    if (!labs.some((lab) => lab.id === labId)) { setState("error"); return }
    setState("saving")
    const supabase = createClient()
    const { data: userData, error: userError } = await supabase.auth.getUser()
    if (userError || !userData.user) { setState("error"); return }
    const { error } = await supabase.from("lab_progress").upsert({
      user_id: userData.user.id,
      lab_id: labId,
      status,
      evidence_mode: evidenceMode,
      evidence_note: evidenceNote.trim() || null,
      completed_at: status === "complete" ? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    }, { onConflict: "user_id,lab_id" })
    setState(error ? "error" : "saved")
    if (!error) router.refresh()
  }

  const selectedLab = labs.find((lab) => lab.id === labId)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <div><CardDescription className="font-mono text-[10px] uppercase tracking-[0.15em]">Lab evidence</CardDescription><CardTitle>Record a demonstration</CardTitle></div>
          <Badge variant="outline">{labs.length} labs</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Select value={labId} onValueChange={changeLab}><SelectTrigger aria-label="Lab"><SelectValue placeholder="Choose a lab" /></SelectTrigger><SelectContent>{labs.map((lab) => <SelectItem key={lab.id} value={lab.id}>{lab.id} · {lab.title}</SelectItem>)}</SelectContent></Select>
        <p className="text-sm leading-6 text-muted-foreground">{selectedLab?.platform.limitation}</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <Select value={status} onValueChange={(value) => { setStatus((value ?? "not_started") as Status); setState("idle") }}><SelectTrigger aria-label="Lab status"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="not_started">Not started</SelectItem><SelectItem value="in_progress">In progress</SelectItem><SelectItem value="complete">Complete</SelectItem></SelectContent></Select>
          <Select value={evidenceMode} onValueChange={(value) => { setEvidenceMode((value ?? "self_reported") as EvidenceMode); setState("idle") }}><SelectTrigger aria-label="Evidence mode"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="self_reported">Self reported</SelectItem><SelectItem value="verified">Verified</SelectItem></SelectContent></Select>
        </div>
        <Textarea aria-label="Evidence note" value={evidenceNote} onChange={(event) => { setEvidenceNote(event.target.value); setState("idle") }} placeholder="Topology, output, test result, or simulator limitation" />
        <Button disabled={state === "saving" || !labId} onClick={save}>{state === "saving" ? <LoaderCircle className="animate-spin" /> : state === "saved" ? <Check /> : null}{state === "saved" ? "Saved" : "Save lab evidence"}</Button>
        {state === "error" ? <p className="text-sm text-destructive" role="alert">Could not save this lab. Check the connection and retry.</p> : null}
      </CardContent>
    </Card>
  )
}
