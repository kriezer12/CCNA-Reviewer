"use client"

import { useState } from "react"
import type { PracticeQuestion } from "@/content/practice/types"
import { Button } from "@/components/ui/button"
import { Field, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field"

export function ReviewCheck({question,contentRevision}:{question:PracticeQuestion;contentRevision:number}) {
  const [choice,setChoice]=useState("")
  const [result,setResult]=useState<{correct:boolean;dueOn:string;alreadyChecked:boolean}|null>(null)
  const [error,setError]=useState("")
  const [pending,setPending]=useState(false)
  async function check(event:React.FormEvent) {
    event.preventDefault()
    if (!choice || pending || result) return
    setPending(true); setError("")
    try {
      const response=await fetch("/api/review-checks",{method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({questionId:question.id,contentRevision,selectedChoice:choice})})
      const body=await response.json()
      if (!response.ok) throw new Error(body.error ?? "Your answer could not be recorded. Retry this check.")
      setResult({correct:body.correct,dueOn:body.dueOn,alreadyChecked:body.alreadyChecked})
    } catch (failure) { setError(failure instanceof Error?failure.message:"Your answer could not be recorded. Retry this check.") }
    finally { setPending(false) }
  }
  const correctChoice=question.choices.find(item=>item.id===question.correctOptionId)
  return <form className="flex flex-col gap-4" onSubmit={check}>
    {!result ? <FieldSet>
      <FieldLegend>Choose your answer before checking</FieldLegend>
      {question.choices.map(option=><Field key={option.id} orientation="horizontal" className="min-h-11 rounded-lg border border-border">
        <FieldLabel className="min-h-11 w-full flex-1 items-center whitespace-normal break-words p-3" htmlFor={`${question.id}-review-${option.id}`}>
          <input className="size-4 shrink-0 accent-primary focus-visible:outline-2 focus-visible:outline-ring" id={`${question.id}-review-${option.id}`} type="radio" name={`review-${question.id}`} value={option.id} checked={choice===option.id} onChange={()=>setChoice(option.id)} />
          <span className="min-w-0">{option.id}. {option.text}</span>
        </FieldLabel>
      </Field>)}
    </FieldSet> : <div role="status" aria-live="polite" className="flex flex-col gap-3 rounded-lg border border-border p-4">
      <p className="font-medium">{result.correct?"Correct.":`Review this: the answer is ${correctChoice?.id ?? question.correctOptionId}.`}</p>
      <p className="text-sm leading-6">{question.explanation}</p>
      <p className="text-sm">{result.alreadyChecked?"This question was already checked today. Its earlier result and schedule are unchanged.":"Checked and saved for this study date."} Next due: {result.dueOn}.</p>
    </div>}
    {!result ? <Button className="min-h-11 w-fit" disabled={!choice||pending} type="submit">{pending?"Checking…":"Check answer"}</Button>:null}
    {error?<p role="alert" className="text-sm text-destructive">{error}</p>:null}
  </form>
}
