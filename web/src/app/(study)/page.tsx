import Link from "next/link"
import { ArrowUpRight, BookOpen, Clock3, FlaskConical, ShieldCheck } from "lucide-react"

import { DashboardDataError } from "@/components/dashboard/dashboard-data-error"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { calculateQuizScore, loadDashboardModel } from "@/lib/dashboard-model"
import { requireOwner } from "@/lib/supabase/auth"

export const dynamic = "force-dynamic"

export default async function Home() {
  const user = await requireOwner()
  const model = await loadDashboardModel(user.id)
  const {
    dataError,
    objectiveCompletion,
    studyMinutes,
    streak,
    latestAttempt,
    recentActivity,
  } = model

  return (
    <>
      <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-end">
        <div className="flex max-w-3xl flex-col gap-5">
          <Badge className="w-fit font-mono text-[10px] uppercase tracking-[0.16em]" variant="secondary">Study context</Badge>
          <h1 className="max-w-2xl text-4xl font-semibold leading-[1.08] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
            Build the route. <span className="text-muted-foreground">Understand the path.</span>
          </h1>
          <p className="max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
            Your short view of progress, recent activity, and the next study action after work.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link className={buttonVariants({ size: "lg" })} href="/roadmap">
              <BookOpen data-icon="inline-start" /> Continue roadmap <ArrowUpRight data-icon="inline-end" />
            </Link>
            <Link className={buttonVariants({ size: "lg", variant: "outline" })} href="/labs">
              <FlaskConical data-icon="inline-start" /> Open labs
            </Link>
          </div>
        </div>
        <Card className="halftone border-border bg-muted/40">
          <CardHeader>
            <CardDescription className="font-mono text-[10px] uppercase tracking-[0.15em]">Objective coverage</CardDescription>
            <CardTitle className="font-mono text-3xl tracking-tight">{objectiveCompletion ? `${objectiveCompletion.completed} / ${objectiveCompletion.total}` : "Unavailable"}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {objectiveCompletion ? <><Progress value={objectiveCompletion.percentage} aria-label="Objective coverage" /><div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground"><span>Lesson understanding</span><span>{objectiveCompletion.percentage}%</span></div></> : <p className="text-sm text-muted-foreground">Retry to load saved objective progress.</p>}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-3 border-y border-border py-5 sm:grid-cols-3 sm:gap-0" aria-label="Progress analytics">
        <Stat value={objectiveCompletion ? String(objectiveCompletion.completed).padStart(2, "0") : "—"} label="Objectives complete" />
        <Stat value={studyMinutes === null ? "—" : `${Math.floor(studyMinutes / 60)}:${String(studyMinutes % 60).padStart(2, "0")}`} label="Recorded study time" />
        <Stat value={streak === null ? "—" : String(streak).padStart(2, "0")} label="30-minute streak" />
      </section>

      {dataError ? <DashboardDataError /> : null}

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)]">
        <Card>
          <CardHeader>
            <CardDescription className="font-mono text-[10px] uppercase tracking-[0.15em]">Saved activity</CardDescription>
            <CardTitle>Recent study activity</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {recentActivity.length ? recentActivity.map((activity, index) => <div className="flex items-start justify-between gap-4 border-b border-border pb-3 last:border-0 last:pb-0" key={`${activity.date}-${index}`}><div className="flex min-w-0 flex-col gap-1"><span className="truncate text-sm font-medium">{activity.label}</span><span className="truncate text-xs text-muted-foreground">{activity.detail}</span></div><span className="shrink-0 font-mono text-[10px] text-muted-foreground">{activity.date.slice(0, 10)}</span></div>) : <p className="text-sm leading-6 text-muted-foreground">{dataError ? "Saved activity is unavailable. Retry to load it." : "No saved activity yet. Record a lesson, lab, session, or quiz to see it here."}</p>}
          </CardContent>
        </Card>

        <Card className="bg-primary text-primary-foreground">
          <CardHeader>
            <div className="flex items-center justify-between"><Badge className="border-primary-foreground/20 bg-primary-foreground/10 font-mono text-[10px] uppercase tracking-[0.15em] text-primary-foreground" variant="outline">Next signal</Badge><Clock3 className="size-4 text-primary-foreground/70" /></div>
            <CardTitle className="mt-4 text-2xl">{latestAttempt ? `${calculateQuizScore(latestAttempt.score, latestAttempt.total_questions)}% latest quiz` : "Start your first checkpoint"}</CardTitle>
            <CardDescription className="text-primary-foreground/70">Use the readiness view to find weak objectives and choose a focused next step.</CardDescription>
          </CardHeader>
          <CardContent><Link className={buttonVariants({ className: "w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90", size: "lg" })} href="/readiness"><ShieldCheck data-icon="inline-start" /> Review readiness <ArrowUpRight data-icon="inline-end" /></Link></CardContent>
        </Card>
      </section>

    </>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return <div className="flex flex-col gap-1"><span className="font-mono text-2xl font-semibold tracking-tight text-foreground">{value}</span><span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">{label}</span></div>
}
