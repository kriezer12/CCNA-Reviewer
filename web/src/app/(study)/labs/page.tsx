import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header"
import { DashboardDataError } from "@/components/dashboard/dashboard-data-error"
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
  const model = await loadDashboardModel(user.id, { topics: false, sessions: false, attempts: false })

  return (
    <>
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
            {curriculum.labs.map((lab) => {
              const saved = model.data.labs.find((row) => row.lab_id === lab.id)
              return <Link className="flex min-h-14 flex-col gap-2 border-b border-border px-5 py-5 text-sm last:border-b-0 hover:bg-muted/50 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ring sm:flex-row sm:items-center sm:px-6" href={`/labs/${lab.id}`} key={lab.id}><span className="font-mono text-xs text-muted-foreground">{lab.id}</span><span className="min-w-0 flex-1 font-medium">{lab.title}</span><span className="text-muted-foreground">{lab.durationMinutes} min</span><Badge variant={saved?.status === "complete" ? "outline" : "secondary"}>{model.dataError ? "Unavailable" : saved?.status?.replaceAll("_", " ") ?? "Not started"}</Badge><ArrowUpRight aria-hidden="true" className="size-4" /></Link>
            })}
          </CardContent>
        </Card>
        <Card className="halftone">
          <CardHeader><CardDescription className="font-mono text-[10px] uppercase tracking-[0.15em]">Lab rule</CardDescription><CardTitle>Evidence over memory</CardTitle></CardHeader>
          <CardContent className="flex flex-col gap-3 text-sm leading-6 text-muted-foreground"><p>Save the topology, show output, and the desired and forbidden connectivity checks.</p><Separator /><p>Phone time prepares the lab. Desktop time configures it.</p></CardContent>
        </Card>
      </section>

      <StudySessionForm objectives={curriculum.objectives} labs={curriculum.labs} />
    </>
  )
}
