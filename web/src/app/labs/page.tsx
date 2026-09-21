import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardDataError } from "@/components/dashboard/dashboard-data-error"
import { LabProgressControl } from "@/components/dashboard/lab-progress-control"
import { StudySessionForm } from "@/components/dashboard/study-session-form"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { curriculum } from "@/content/curriculum"
import { loadDashboardModel } from "@/lib/dashboard-model"
import { requireOwner } from "@/lib/supabase/auth"

export const dynamic = "force-dynamic"

export default async function LabsPage() {
  const user = await requireOwner()
  const model = await loadDashboardModel(user.id)

  return (
    <DashboardShell active="labs" headerLabel="Labs / evidence sequence" userEmail={user.email}>
      <DashboardPageHeader
        description="Configure, verify, and record the evidence that makes a lab demonstration trustworthy."
        eyebrow="Practical sequence / Packet Tracer and external labs"
        title="Make the topology prove it."
      >
        <div className="flex flex-wrap gap-3">
          <Link className={buttonVariants({ variant: "outline" })} href="/command-drills">Warm up with command drills <ArrowUpRight data-icon="inline-end" /></Link>
          <Link className={buttonVariants({ variant: "outline" })} href="/roadmap">Return to roadmap <ArrowUpRight data-icon="inline-end" /></Link>
        </div>
      </DashboardPageHeader>

      {model.dataError ? <DashboardDataError /> : null}

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        <Card>
          <CardHeader className="border-b border-border"><CardDescription className="font-mono text-[10px] uppercase tracking-[0.15em]">Practical sequence</CardDescription><div className="flex items-center justify-between gap-3"><CardTitle>Lab queue</CardTitle><Badge variant="outline">{model.labCompletion ? `${model.labCompletion.completed} / ${model.labCompletion.total}` : "Unavailable"}</Badge></div></CardHeader>
          <CardContent className="flex flex-col gap-0 p-0">
            {model.labs.map((lab) => <div className="flex flex-col gap-3 border-b border-border px-5 py-5 last:border-b-0 sm:flex-row sm:items-center sm:px-6" key={lab.id}><span className="font-mono text-xs text-muted-foreground">{lab.id}</span><div className="flex min-w-0 flex-1 flex-col gap-1"><span className="font-medium">{lab.name}</span><span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">{lab.type} · {lab.time} · evidence: {lab.evidence}</span></div><Badge variant={lab.state === "Next" ? "default" : lab.state === "Complete" ? "outline" : "secondary"}>{lab.state}</Badge></div>)}
          </CardContent>
        </Card>
        <Card className="halftone">
          <CardHeader><CardDescription className="font-mono text-[10px] uppercase tracking-[0.15em]">Lab rule</CardDescription><CardTitle>Evidence over memory</CardTitle></CardHeader>
          <CardContent className="flex flex-col gap-3 text-sm leading-6 text-muted-foreground"><p>Save the topology, show output, and the desired and forbidden connectivity checks.</p><Separator /><p>Phone time prepares the lab. Desktop time configures it.</p></CardContent>
        </Card>
      </section>

      <LabProgressControl labs={curriculum.labs} initialRows={model.data.labs} />
      <StudySessionForm objectives={curriculum.objectives} labs={curriculum.labs} />
    </DashboardShell>
  )
}
