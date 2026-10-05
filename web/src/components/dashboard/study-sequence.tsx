"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"

export interface StudySequenceStep {
  readonly id: string
  readonly title: string
  readonly description: string
  readonly href: string
  readonly estimate: number
  readonly optional?: boolean
}

export function StudySequence({steps}:{steps:readonly StudySequenceStep[]}) {
  const [skipped,setSkipped]=useState<ReadonlySet<string>>(new Set())
  return <section className="flex flex-col gap-4 border-t border-border pt-5" aria-label="Daily study sequence">
    <div><h3 className="text-lg font-semibold">Read · recall · practice · apply · review</h3>
      <p className="text-sm text-muted-foreground">Choose a step. Times are estimates; using or skipping a link does not record completion or study time.</p></div>
    <ol className="grid gap-3 md:grid-cols-2">
      {steps.map((step,index)=>{
        const isSkipped=skipped.has(step.id)
        return <li key={step.id} className="flex min-w-0 flex-col gap-3 rounded-lg border border-border p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0"><p className="font-medium">{index+1}. {step.title}</p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">{step.description}</p>
              <p className="mt-2 text-xs text-muted-foreground">About {step.estimate} minutes{step.optional?" · Optional":""}</p></div>
          </div>
          {!isSkipped?<div className="flex flex-wrap gap-3">
            <Link className={buttonVariants({variant:"outline",className:"min-h-11 whitespace-normal"})} href={step.href}>
              {step.title}<ArrowUpRight aria-hidden="true" data-icon="inline-end"/>
            </Link>
            {step.optional?<Button type="button" variant="ghost" className="min-h-11" onClick={()=>setSkipped(current=>new Set([...current,step.id]))}>Skip optional step</Button>:null}
          </div>:<div className="flex flex-wrap items-center gap-3"><p className="text-sm text-muted-foreground" role="status">Skipped for this visit. No progress or study time was saved.</p>
            <Button type="button" variant="ghost" className="min-h-11" onClick={()=>setSkipped(current=>{const next=new Set(current);next.delete(step.id);return next})}>Restore step</Button></div>}
        </li>
      })}
    </ol>
  </section>
}
