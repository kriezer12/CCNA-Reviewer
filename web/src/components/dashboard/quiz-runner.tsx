"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Check, CircleAlert, LoaderCircle } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { curriculum, type DomainId } from "@/content/curriculum"
import { quizQuestions, validateQuizSubmission } from "@/content/quizzes"
import { calculateQuizScore } from "@/lib/analytics"

export function QuizRunner() {
  const router = useRouter()
  const [domainId, setDomainId] = useState<DomainId>("1.0")
  const questions = useMemo(() => quizQuestions.filter((question) => question.domainId === domainId), [domainId])
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [state, setState] = useState<"idle" | "saving" | "saved" | "error">("idle")
  const score = questions.filter((question) => answers[question.id] === question.correctOptionId).length

  function changeDomain(value: string | null) {
    setDomainId((value ?? "1.0") as DomainId)
    setAnswers({})
    setSubmitted(false)
    setState("idle")
  }

  async function submit() {
    if (!validateQuizSubmission(questions, answers)) { setState("error"); return }
    setState("saving")
    const response = await fetch("/api/quiz-attempts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ domainId, answers }),
    })
    if (!response.ok) { setState("error"); return }
    setSubmitted(true)
    setState("saved")
    router.refresh()
  }

  return (
    <Card>
      <CardHeader><div className="flex items-center justify-between gap-3"><div><CardDescription className="font-mono text-[10px] uppercase tracking-[0.15em]">Retrieval check · {curriculum.domains.find((domain) => domain.id === domainId)?.title}</CardDescription><CardTitle>Ten-question checkpoint</CardTitle></div><Badge variant="outline">{submitted ? `${calculateQuizScore(score, questions.length)}%` : `${Object.keys(answers).length}/${questions.length}`}</Badge></div><Select value={domainId} onValueChange={changeDomain}><SelectTrigger aria-label="Quiz domain"><SelectValue /></SelectTrigger><SelectContent>{curriculum.domains.map((domain) => <SelectItem key={domain.id} value={domain.id}>{domain.id} · {domain.title}</SelectItem>)}</SelectContent></Select></CardHeader>
      <CardContent className="flex flex-col gap-6">
        {questions.map((question, index) => <fieldset className="flex flex-col gap-3 border-b border-border pb-5 last:border-0 last:pb-0" key={question.id}><legend className="text-sm font-medium leading-6">{index + 1}. {question.prompt}</legend><div className="grid gap-2">{question.choices.map((choice) => <Button className="justify-start whitespace-normal text-left" disabled={submitted} key={choice.id} onClick={() => setAnswers((current) => ({ ...current, [question.id]: choice.id }))} variant={answers[question.id] === choice.id ? "secondary" : "outline"} type="button">{choice.id}. {choice.text}</Button>)}</div>{submitted ? <p className={`text-sm leading-6 ${answers[question.id] === question.correctOptionId ? "text-foreground" : "text-destructive"}`}>{answers[question.id] === question.correctOptionId ? <Check className="mr-1 inline size-4" /> : <CircleAlert className="mr-1 inline size-4" />}{question.explanation}</p> : null}</fieldset>)}
        <Button disabled={submitted || state === "saving"} onClick={submit}>{state === "saving" ? <LoaderCircle className="animate-spin" /> : null}{submitted ? "Attempt saved" : "Submit checkpoint"}</Button>
        {state === "error" ? <p className="text-sm text-destructive" role="alert">Answer every question and make sure you are signed in before saving.</p> : null}
      </CardContent>
    </Card>
  )
}
