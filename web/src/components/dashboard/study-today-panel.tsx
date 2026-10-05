import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { RetryButton } from "@/components/dashboard/retry-button"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import type { StudyTodayRecommendation } from "@/lib/study-today-model"
import { StudySequence, type StudySequenceStep } from "@/components/dashboard/study-sequence"
import { randomUUID } from "node:crypto"

export function StudyTodayPanel({ recommendation, dueReviewCount, dueReviewError }: {
  recommendation: StudyTodayRecommendation; dueReviewCount:number|null; dueReviewError:boolean
}) {
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
  const objectiveId = isLesson ? recommendation.objective.id : recommendation.lab.objectiveIds[0]
  const application = isLesson ? recommendation.relatedLab : recommendation.lab
  const practice = `/practice?objective=${encodeURIComponent(objectiveId)}&count=5&mode=topic&feedback=guided&seed=${randomUUID()}`
  const steps:StudySequenceStep[] = [
    {id:"read",title:"Read the guide",description:"Study the objective and its worked example.",href:`/learn/${objectiveId}`,estimate:20},
    {id:"recall",title:"Recall twice",description:"Answer both checks before revealing the explanations.",href:`/learn/${objectiveId}#recall`,estimate:5},
    {id:"practice",title:"Practice five questions",description:"Use focused guided practice for this objective.",href:practice,estimate:10},
    ...(application?[{id:"apply",title:"Apply in a lab",description:`Show the practical steps in ${application.id}: ${application.title}.`,href:`/labs/${application.id}`,estimate:application.durationMinutes,optional:true}]:recommendation.drill?[{id:"apply",title:"Apply with a command drill",description:`Practice ${recommendation.drill.title}.`,href:recommendation.drill.href,estimate:recommendation.drill.suggestedMinutes,optional:true}]:objectiveId==="1.6"?[{id:"apply",title:"Apply with subnetting practice",description:"Calculate a seeded subnet and inspect field-specific feedback.",href:"/exercises/subnetting",estimate:10,optional:true}]:[]),
    {id:"review",title:"Review due questions",description:dueReviewError?"The due count could not be loaded; open the list to retry.":`${dueReviewCount??0} questions are due in your study date.`,href:"/review",estimate:10,optional:true},
  ]
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
        <StudySequence steps={steps}/>
        <p className="text-sm text-muted-foreground">{isLesson ? `Suggested study block: ${recommendation.suggestedMinutes} minutes` : `Lab duration estimate: ${recommendation.suggestedMinutes} minutes`}. Planning estimate only; no study time is recorded by opening this activity.</p>
        <NavigationLinks />
      </CardContent>
    </Card>
  )
}

function NavigationLinks() {
  return <nav aria-label="Other study destinations" className="flex flex-wrap gap-x-5 gap-y-2 text-sm"><Link className="min-h-11 content-center underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring" href="/roadmap">Full roadmap</Link><Link className="min-h-11 content-center underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring" href="/labs">All labs</Link></nav>
}
