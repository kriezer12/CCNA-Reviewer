"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Check, LoaderCircle } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createClient } from "@/lib/supabase/client"
import type { Objective } from "@/content/curriculum"
import type { TopicProgressRow } from "@/lib/supabase/progress"

type Status = "not_started" | "in_progress" | "complete"

export function ObjectiveProgressControl({
  objectives,
  initialRows,
}: {
  objectives: readonly Objective[]
  initialRows: readonly TopicProgressRow[]
}) {
  const router = useRouter()
  const initial = useMemo(() => new Map(initialRows.map((row) => [row.objective_id, row.status])), [initialRows])
  const [objectiveId, setObjectiveId] = useState<string>(objectives[0]?.id ?? "")
  const [status, setStatus] = useState<Status>(initial.get(objectives[0]?.id ?? "") ?? "not_started")
  const [state, setState] = useState<"idle" | "saving" | "saved" | "error">("idle")

  function changeObjective(value: string | null) {
    const nextId = value ?? ""
    setObjectiveId(nextId)
    setStatus(initial.get(nextId) ?? "not_started")
    setState("idle")
  }

  async function save() {
    if (!objectives.some((objective) => objective.id === objectiveId)) { setState("error"); return }
    setState("saving")
    const supabase = createClient()
    const { data: userData, error: userError } = await supabase.auth.getUser()
    if (userError || !userData.user) {
      setState("error")
      return
    }

    const { error } = await supabase.from("topic_progress").upsert(
      {
        user_id: userData.user.id,
        objective_id: objectiveId,
        status,
        completed_at: status === "complete" ? new Date().toISOString() : null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id,objective_id" }
    )

    setState(error ? "error" : "saved")
    if (!error) router.refresh()
  }

  const selectedObjective = objectives.find((objective) => objective.id === objectiveId)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <div>
            <CardDescription className="font-mono text-[10px] uppercase tracking-[0.15em]">Lesson understanding</CardDescription>
            <CardTitle>Record one objective</CardTitle>
          </div>
          <Badge variant="outline">{objectives.length} objectives</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Select value={objectiveId} onValueChange={changeObjective}>
          <SelectTrigger aria-label="Objective"><SelectValue placeholder="Choose an objective" /></SelectTrigger>
          <SelectContent>
            {objectives.map((objective) => <SelectItem key={objective.id} value={objective.id}>{objective.id} · {objective.title}</SelectItem>)}
          </SelectContent>
        </Select>
        <p className="text-sm leading-6 text-muted-foreground">{selectedObjective?.title}</p>
        <Select value={status} onValueChange={(value) => { setStatus((value ?? "not_started") as Status); setState("idle") }}>
          <SelectTrigger aria-label="Lesson status"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="not_started">Not started</SelectItem>
            <SelectItem value="in_progress">In progress</SelectItem>
            <SelectItem value="complete">Complete</SelectItem>
          </SelectContent>
        </Select>
        <Button disabled={state === "saving" || !objectiveId} onClick={save}>
          {state === "saving" ? <LoaderCircle className="animate-spin" /> : state === "saved" ? <Check /> : null}
          {state === "saved" ? "Saved" : "Save understanding"}
        </Button>
        {state === "error" ? <p className="text-sm text-destructive" role="alert">Could not save this objective. Check the connection and retry.</p> : null}
      </CardContent>
    </Card>
  )
}
