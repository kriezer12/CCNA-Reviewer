import Link from "next/link"
import { ArrowLeft, ArrowUpRight, BookOpen, Check, CircleDot, ExternalLink, FlaskConical, Monitor, ShieldCheck } from "lucide-react"
import { notFound } from "next/navigation"

import { DashboardDataError } from "@/components/dashboard/dashboard-data-error"
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { LabProgressControl } from "@/components/dashboard/lab-progress-control"
import { ObjectiveProgressControl } from "@/components/dashboard/objective-progress-control"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { curriculum } from "@/content/curriculum"
import { loadDashboardModel } from "@/lib/dashboard-model"
import { getRoadmapWeek } from "@/lib/roadmap-model"
import { requireOwner } from "@/lib/supabase/auth"
import { cn } from "cn"

export const dynamic = "force-dynamic"

export default async function RoadmapWeekPage({ params }: { params: Promise<{ week: string }> }) {
  const user = await requireOwner()
  const { week: weekParam } = await params
  const detail = getRoadmapWeek(weekParam)
  if (!detail) notFound()

  const model = await loadDashboardModel(user.id)
  const objectiveIds = new Set<string>(detail.objectives.map((objective) => objective.id))
  const labIds = new Set<string>(detail.labs.map((lab) => lab.id))
  const objectiveRows = model.data.topics.filter((row) => objectiveIds.has(row.objective_id))
  const labRows = model.data.labs.filter((row) => labIds.has(row.lab_id))
  const completedObjectives = detail.objectives.filter((objective) => objectiveRows.find((row) => row.objective_id === objective.id)?.status === "complete").length
  const progress = model.dataError ? null : detail.objectives.length === 0 ? 0 : Math.round((completedObjectives / detail.objectives.length) * 100)

  return (
    <DashboardShell active="roadmap" headerLabel={`Roadmap / week ${String(detail.week.week).padStart(2, "0")}`} userEmail={user.email}>
      <Link className={cn(buttonVariants({ variant: "ghost" }), "-ml-3 w-fit")} href="/roadmap">
        <ArrowLeft data-icon="inline-start" /> Back to roadmap
      </Link>

      <DashboardPageHeader
        description={detail.week.focus}
        eyebrow={`Week ${String(detail.week.week).padStart(2, "0")} / ${detail.week.dates}`}
        title="Make this week visible in your work."
      >
        <div className="flex flex-wrap gap-3">
          <Link className={buttonVariants({ variant: "outline" })} href="/labs">
            Open labs <ArrowUpRight data-icon="inline-end" />
          </Link>
          <Link className={buttonVariants({ variant: "outline" })} href="/readiness">
            Check readiness <ArrowUpRight data-icon="inline-end" />
          </Link>
        </div>
      </DashboardPageHeader>

      {model.dataError ? <DashboardDataError /> : null}

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <Card className="halftone border-border bg-muted/40">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col gap-1">
                <CardDescription className="font-mono text-[10px] uppercase tracking-[0.15em]">Week objective coverage</CardDescription>
                <CardTitle>{progress === null ? "Unavailable" : `${completedObjectives} / ${detail.objectives.length} objectives`}</CardTitle>
              </div>
              <Badge variant="outline">{detail.week.activityIds.length} activities</Badge>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <Progress aria-label={`Week ${detail.week.week} objective coverage`} value={progress ?? 0} />
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
              <span>Lesson understanding</span>
              <span>{progress === null ? "Unavailable" : `${progress}%`}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription className="font-mono text-[10px] uppercase tracking-[0.15em]">Exit evidence</CardDescription>
            <CardTitle className="text-xl">Know when to move on.</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="text-sm leading-6 text-muted-foreground">{detail.week.exitEvidence}</p>
            <div className="flex flex-col gap-2 border-t border-border pt-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Sources</span>
              {detail.week.sourceLocators.map((locator) => {
                const source = curriculum.sources.find((item) => item.id === locator.sourceId)
                if (!source) return null
                const sourceUrl = "url" in source ? source.url : undefined
                return sourceUrl ? <a className="flex items-center gap-2 text-sm underline-offset-4 hover:underline" href={sourceUrl} key={`${locator.sourceId}-${locator.locator}`} rel="noreferrer" target="_blank"><ExternalLink className="size-3.5 text-muted-foreground" />{source.title} · {locator.locator}</a> : <span className="flex items-center gap-2 text-sm" key={`${locator.sourceId}-${locator.locator}`}><BookOpen className="size-3.5 text-muted-foreground" />{source.title} · {locator.locator}</span>
              })}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="flex flex-col gap-4" aria-labelledby="week-objectives-heading">
        <div className="flex flex-col gap-1"><span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Learn</span><h2 className="text-2xl font-semibold tracking-tight" id="week-objectives-heading">Objectives for this week.</h2></div>
        <div className="grid gap-4 lg:grid-cols-2">
          {detail.objectives.map((objective) => {
            const status = objectiveRows.find((row) => row.objective_id === objective.id)?.status ?? "not_started"
            return <Card key={objective.id}><CardHeader><div className="flex items-start justify-between gap-3"><div className="flex min-w-0 items-start gap-3"><div className="flex size-8 shrink-0 items-center justify-center rounded-md border border-border bg-muted font-mono text-[10px]">{status === "complete" ? <Check className="size-4" /> : objective.id}</div><div className="flex min-w-0 flex-col gap-1"><CardDescription>{objective.performance.replace("_", " ")}</CardDescription><CardTitle className="text-base leading-6">{objective.title}</CardTitle></div></div><Badge variant={status === "complete" ? "secondary" : "outline"}>{formatStatus(status)}</Badge></div></CardHeader>{objective.childObjectives.length ? <CardContent className="border-t border-border pt-4"><ul className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">{objective.childObjectives.map((child) => <li className="flex items-start gap-2" key={child.id}><CircleDot className="mt-1 size-3 shrink-0" />{child.id} · {child.title}</li>)}</ul></CardContent> : null}</Card>
          })}
        </div>
      </section>

      <section className="flex flex-col gap-4" aria-labelledby="week-practice-heading">
        <div className="flex flex-col gap-1"><span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Practice</span><h2 className="text-2xl font-semibold tracking-tight" id="week-practice-heading">Apply it, then leave evidence.</h2></div>
        <div className="grid gap-4 lg:grid-cols-2">
          {detail.labs.map((lab) => {
            const row = labRows.find((item) => item.lab_id === lab.id)
            return <Card key={lab.id}><CardHeader><div className="flex items-start justify-between gap-3"><div className="flex min-w-0 items-start gap-3"><div className="flex size-8 shrink-0 items-center justify-center rounded-md border border-border bg-muted"><FlaskConical className="size-4" /></div><div className="flex min-w-0 flex-col gap-1"><CardDescription>{lab.id} · {lab.durationMinutes} minutes · {formatPlatform(lab.platform.primary)}</CardDescription><CardTitle className="text-base leading-6">{lab.title}</CardTitle></div></div><Badge variant={row?.status === "complete" ? "secondary" : "outline"}>{formatStatus(row?.status ?? "not_started")}</Badge></div></CardHeader><CardContent className="flex flex-col gap-3 border-t border-border pt-4"><p className="text-sm leading-6 text-muted-foreground">{lab.summary}</p><div className="flex flex-col gap-2 text-xs text-muted-foreground"><span><strong className="font-medium text-foreground">Evidence:</strong> {lab.evidence.required.join("; ")}</span><span><strong className="font-medium text-foreground">Boundary:</strong> {lab.platform.limitation}</span></div><Link className={buttonVariants({ className: "w-fit", variant: "outline" })} href="/labs">Open lab workspace <ArrowUpRight data-icon="inline-end" /></Link></CardContent></Card>
          })}
          {detail.browserActivities.map((activity) => <Card key={activity.id}><CardHeader><div className="flex items-start gap-3"><div className="flex size-8 shrink-0 items-center justify-center rounded-md border border-border bg-muted"><Monitor className="size-4" /></div><div className="flex min-w-0 flex-col gap-1"><CardDescription>{activity.id} · conceptual/browser activity</CardDescription><CardTitle className="text-base leading-6">{activity.title}</CardTitle></div></div></CardHeader><CardContent className="border-t border-border pt-4"><p className="text-sm leading-6 text-muted-foreground">{activity.summary}</p></CardContent></Card>)}
        </div>
      </section>

      {detail.objectives.length ? <ObjectiveProgressControl initialRows={objectiveRows} objectives={detail.objectives} /> : null}
      {detail.labs.length ? <LabProgressControl initialRows={labRows} labs={detail.labs} /> : null}

      <Card className="border-primary/20 bg-primary text-primary-foreground">
        <CardHeader><div className="flex items-center gap-3"><ShieldCheck className="size-5" /><div><CardDescription className="text-primary-foreground/70">Study rhythm</CardDescription><CardTitle className="text-xl">Use the next 60 minutes deliberately.</CardTitle></div></div></CardHeader>
        <CardContent><p className="max-w-2xl text-sm leading-6 text-primary-foreground/80">Retrieve one concept, apply it to the mapped activity, then record what you can explain or verify. Keep the exit evidence as your handoff to the next week.</p></CardContent>
      </Card>
    </DashboardShell>
  )
}

function formatStatus(status: string): string {
  return status.replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase())
}

function formatPlatform(platform: string): string {
  if (platform === "packet-tracer") return "Packet Tracer"
  if (platform === "external-lab") return "External lab"
  return "Conceptual"
}
