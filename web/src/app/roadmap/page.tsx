import Link from "next/link"
import { ArrowUpRight, Check, ChevronRight } from "lucide-react"

import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardDataError } from "@/components/dashboard/dashboard-data-error"
import { ObjectiveProgressControl } from "@/components/dashboard/objective-progress-control"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { curriculum } from "@/content/curriculum"
import { loadDashboardModel } from "@/lib/dashboard-model"
import { requireOwner } from "@/lib/supabase/auth"

export const dynamic = "force-dynamic"

export default async function RoadmapPage() {
  const user = await requireOwner()
  const model = await loadDashboardModel(user.id)

  return (
    <DashboardShell active="roadmap" headerLabel="Roadmap / 18-week sequence" userEmail={user.email}>
      <DashboardPageHeader
        description="Follow the 18-week sequence, then mark the objective understanding you can explain without notes."
        eyebrow="Study path / 200-301 v1.1"
        title="A route you can actually finish."
      >
        <div className="flex flex-wrap gap-3">
          <Link className={buttonVariants({ variant: "outline" })} href="/labs">Pair with a lab <ArrowUpRight data-icon="inline-end" /></Link>
          <Link className={buttonVariants({ variant: "outline" })} href="/readiness">Check readiness <ArrowUpRight data-icon="inline-end" /></Link>
        </div>
      </DashboardPageHeader>

      {model.dataError ? <DashboardDataError /> : null}

      <Card>
        <CardHeader className="border-b border-border">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1"><CardDescription className="font-mono text-[10px] uppercase tracking-[0.15em]">Path to exam day</CardDescription><CardTitle>18-week roadmap</CardTitle></div>
            <Badge variant="outline">{model.completedWeeks === null ? "Unavailable" : `${model.completedWeeks} / ${curriculum.roadmap.weeks.length} weeks`}</Badge>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-0 p-0">
          {model.roadmap.map((item) => {
            const Icon = item.icon
            return <Link aria-label={`Open ${item.label} detail`} className="group flex items-center gap-4 border-b border-border px-5 py-4 transition-colors last:border-b-0 hover:bg-muted/50 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset sm:px-6" href={item.href} key={item.label}><div className="flex size-9 shrink-0 items-center justify-center rounded-md border border-border bg-muted text-muted-foreground">{item.progress === 100 ? <Check className="size-4 text-foreground" /> : <Icon className="size-4" />}</div><div className="flex min-w-0 flex-1 flex-col gap-1.5"><div className="flex items-center justify-between gap-3"><span className="truncate text-sm font-medium">{item.label} · {item.focus}</span><span className="font-mono text-[10px] text-muted-foreground">{item.progress === null ? "Unavailable" : `${item.progress}%`}</span></div>{item.progress === null ? <span className="text-xs text-muted-foreground">Saved progress unavailable. Retry to reload this roadmap.</span> : <Progress className="h-1" value={item.progress} aria-label={item.label + " progress"} />}<span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">{item.meta} · {item.activityCount} activities</span></div><ChevronRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" /></Link>
          })}
        </CardContent>
      </Card>

      <ObjectiveProgressControl objectives={curriculum.objectives} initialRows={model.data.topics} />
    </DashboardShell>
  )
}
