import Link from "next/link"
import { ArrowUpRight, BookOpen, FlaskConical, Terminal } from "lucide-react"

import { RetryButton } from "@/components/dashboard/retry-button"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import type { StudyTodayRecommendation } from "@/lib/study-today-model"

export function StudyTodayPanel({ recommendation }: { recommendation: StudyTodayRecommendation }) {
  if (recommendation.kind === "unavailable") {
    return (
      <Card aria-labelledby="study-today-heading">
        <CardHeader>
          <CardDescription>Study Today</CardDescription>
          <h2 className="text-2xl font-semibold" id="study-today-heading">Recommendations unavailable</h2>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p className="text-base leading-7" role="alert">Saved objective or lab progress could not be loaded. Retry before choosing a suggested activity.</p>
          <div className="flex flex-wrap gap-3"><RetryButton /><NavigationLinks /></div>
        </CardContent>
      </Card>
    )
  }

  if (recommendation.kind === "review") {
    return (
      <Card aria-labelledby="study-today-heading">
        <CardHeader>
          <CardDescription>Study Today</CardDescription>
          <h2 className="text-2xl font-semibold" id="study-today-heading">Review your work</h2>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p className="text-base leading-7 text-muted-foreground">All mapped lessons and labs have recorded complete status. Review each learning dimension before choosing what to revisit.</p>
          <div className="flex flex-wrap gap-3">
            <Link className={buttonVariants({ className: "min-h-11", size: "lg" })} href="/readiness">Review readiness <ArrowUpRight aria-hidden="true" data-icon="inline-end" /></Link>
            <Link className={buttonVariants({ className: "min-h-11", size: "lg", variant: "outline" })} href="/roadmap">View full roadmap</Link>
          </div>
        </CardContent>
      </Card>
    )
  }

  const isLesson = recommendation.kind === "lesson"
  return (
    <Card aria-labelledby="study-today-heading" className="border-primary/30 bg-muted/40">
      <CardHeader className="gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="secondary">Study Today</Badge>
          <span className="text-xs font-medium text-muted-foreground">{recommendation.weekLabel}</span>
        </div>
        <h2 id="study-today-heading" className="break-words text-2xl font-semibold text-pretty">{isLesson ? `${recommendation.objective.id} · ${recommendation.objective.title}` : `${recommendation.lab.id} · ${recommendation.lab.title}`}</h2>
        <CardDescription className="text-base leading-7">{recommendation.focus}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <p className="text-base leading-7">{recommendation.reason}</p>
        <p className="text-sm text-muted-foreground">{isLesson ? `Suggested study block: ${recommendation.suggestedMinutes} minutes` : `Lab duration estimate: ${recommendation.suggestedMinutes} minutes`}. Planning estimate only; no study time is recorded by opening this activity.</p>
        <div className="flex flex-wrap gap-3">
          <Link className={buttonVariants({ className: "min-h-11 max-w-full whitespace-normal text-left", size: "lg" })} href={recommendation.href}>{isLesson ? <BookOpen aria-hidden="true" data-icon="inline-start" /> : <FlaskConical aria-hidden="true" data-icon="inline-start" />}{recommendation.actionLabel}<ArrowUpRight aria-hidden="true" data-icon="inline-end" /></Link>
          {isLesson && recommendation.relatedLab ? <Link className={buttonVariants({ className: "min-h-11 max-w-full whitespace-normal text-left", size: "lg", variant: "outline" })} href={`/labs/${recommendation.relatedLab.id}`}>Open {recommendation.relatedLab.id}: {recommendation.relatedLab.title}</Link> : null}
        </div>
        {recommendation.drill ? <div className="flex flex-col gap-2 border-t border-border pt-4"><span className="text-sm text-muted-foreground">Suggested warm-up: 5 minutes. Practice is temporary and does not record study time.</span><Link className="inline-flex min-h-11 w-fit items-center gap-2 text-base font-medium underline underline-offset-4 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring" href={recommendation.drill.href}><Terminal aria-hidden="true" className="size-4" />Practice {recommendation.drill.title}</Link></div> : null}
        <NavigationLinks />
      </CardContent>
    </Card>
  )
}

function NavigationLinks() {
  return <nav aria-label="Other study destinations" className="flex flex-wrap gap-x-5 gap-y-2 text-sm"><Link className="min-h-11 content-center underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring" href="/roadmap">Full roadmap</Link><Link className="min-h-11 content-center underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring" href="/labs">All labs</Link></nav>
}
