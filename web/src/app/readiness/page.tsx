import Link from "next/link"
import { ArrowUpRight, CheckCircle2, Clock3, Flame, Target } from "lucide-react"

import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardDataError } from "@/components/dashboard/dashboard-data-error"
import { QuizRunner } from "@/components/dashboard/quiz-runner"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { calculateQuizScore, loadDashboardModel } from "@/lib/dashboard-model"
import { requireOwner } from "@/lib/supabase/auth"

export const dynamic = "force-dynamic"

export default async function ReadinessPage() {
  const user = await requireOwner()
  const model = await loadDashboardModel(user.id)

  return (
    <DashboardShell active="readiness" headerLabel="Readiness / exam signals" userEmail={user.email}>
      <DashboardPageHeader
        description="Readiness is a set of signals, not a blended score: coverage, practical evidence, retrieval, and consistent study time."
        eyebrow="Exam signal / decision view"
        title="Know what deserves the next hour."
      >
        <div className="flex flex-wrap gap-3">
          <Link className={buttonVariants({ variant: "outline" })} href="/roadmap">Review weak objectives <ArrowUpRight data-icon="inline-end" /></Link>
          <Link className={buttonVariants({ variant: "outline" })} href="/labs">Build evidence <ArrowUpRight data-icon="inline-end" /></Link>
        </div>
      </DashboardPageHeader>

      {model.dataError ? <DashboardDataError /> : null}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Readiness signals">
        <SignalCard icon={Target} label="Objective coverage" value={model.objectiveCompletion ? `${model.objectiveCompletion.percentage}%` : "—"} detail={model.objectiveCompletion ? `${model.objectiveCompletion.completed} of ${model.objectiveCompletion.total} complete` : "Unavailable"} />
        <SignalCard icon={CheckCircle2} label="Lab evidence" value={model.labCompletion ? `${model.labCompletion.percentage}%` : "—"} detail={model.labCompletion ? `${model.labCompletion.completed} of ${model.labCompletion.total} demonstrated` : "Unavailable"} />
        <SignalCard icon={Clock3} label="Study time" value={model.studyMinutes === null ? "—" : `${Math.floor(model.studyMinutes / 60)}h ${model.studyMinutes % 60}m`} detail="Recorded in Supabase" />
        <SignalCard icon={Flame} label="30-minute streak" value={model.streak === null ? "—" : String(model.streak)} detail="Consecutive study days" />
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)]">
        <QuizRunner />
        <Card className="bg-muted/40">
          <CardHeader><CardDescription className="font-mono text-[10px] uppercase tracking-[0.15em]">Working threshold</CardDescription><CardTitle>Keep the weak spots visible.</CardTitle></CardHeader>
          <CardContent className="flex flex-col gap-4 text-sm leading-6 text-muted-foreground"><p>Use two fresh mixed assessments, keep every domain above your internal threshold, and pair recall with independent configuration evidence.</p><div className="flex flex-col gap-2"><span className="font-medium text-foreground">Suggested order</span><span>1. Command drill</span><span>2. Focused objective</span><span>3. Lab demonstration</span><span>4. Mixed checkpoint</span></div></CardContent>
        </Card>
      </section>

      <Card className="bg-muted/40">
        <CardHeader><CardDescription className="font-mono text-[10px] uppercase tracking-[0.15em]">Saved quiz history</CardDescription><CardTitle>{model.dataError ? "Unavailable" : model.latestAttempt ? `${calculateQuizScore(model.latestAttempt.score, model.latestAttempt.total_questions)}% latest` : "No attempts yet"}</CardTitle></CardHeader>
        <CardContent className="flex flex-col gap-4">
          {model.dataError ? <p className="text-sm leading-6 text-muted-foreground">Saved quiz history is unavailable. Retry to reload it.</p> : model.data.attempts.length ? <><div aria-label="Quiz score trend" className="flex h-20 items-end gap-2 border-b border-border pb-3">{model.quizTrend.map((score, index) => <div className="flex min-w-0 flex-1 flex-col items-center gap-1" key={`${score}-${index}`}><div className="w-full rounded-sm bg-primary/80" style={{ height: `${Math.max(score, 8)}%` }} /><span className="font-mono text-[9px] text-muted-foreground">{score}%</span></div>)}</div><div className="flex flex-col gap-2">{model.data.attempts.slice(0, 5).map((attempt) => <div className="flex items-center justify-between gap-3 border-b border-border pb-2 last:border-0 last:pb-0" key={attempt.id}><span className="truncate text-sm">{(attempt.objective_ids.length ? attempt.objective_ids : [attempt.topic_id]).join(", ")} tagged checkpoint</span><span className="font-mono text-xs">{calculateQuizScore(attempt.score, attempt.total_questions)}%</span></div>)}</div></> : <p className="text-sm leading-6 text-muted-foreground">Complete a checkpoint to start your quiz trend.</p>}
        </CardContent>
      </Card>
    </DashboardShell>
  )
}

function SignalCard({ icon: Icon, label, value, detail }: { icon: typeof Target; label: string; value: string; detail: string }) {
  return <Card><CardContent className="flex min-h-32 flex-col justify-between gap-5 pt-6"><div className="flex items-center justify-between gap-3"><span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{label}</span><Icon className="size-4 text-muted-foreground" /></div><div className="flex flex-col gap-1"><span className="font-mono text-2xl font-semibold">{value}</span><span className="text-xs text-muted-foreground">{detail}</span></div></CardContent></Card>
}
