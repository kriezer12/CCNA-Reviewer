"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, ArrowRight, BookOpenCheck, Check, CircleAlert, Clock3, RotateCcw } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { curriculum, type DomainId } from "@/content/curriculum"
import { quizQuestions, validateQuizSubmission } from "@/content/quizzes"
import { calculateQuizScore } from "@/lib/analytics"

type CheckpointStep = "setup" | "question" | "result" | "review"
type SaveState = "idle" | "saving" | "saved" | "error"

export function QuizRunner() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<CheckpointStep>("setup")
  const [domainId, setDomainId] = useState<DomainId>("1.0")
  const [questionIndex, setQuestionIndex] = useState(0)
  const [reviewIndex, setReviewIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [saveState, setSaveState] = useState<SaveState>("idle")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const questionHeadingRef = useRef<HTMLHeadingElement>(null)
  const reviewHeadingRef = useRef<HTMLHeadingElement>(null)

  const questions = useMemo(
    () => quizQuestions.filter((question) => question.domainId === domainId),
    [domainId]
  )
  const question = questions[questionIndex]
  const reviewQuestion = questions[reviewIndex]
  const selectedCount = questions.filter((item) => answers[item.id]).length
  const score = questions.filter((item) => answers[item.id] === item.correctOptionId).length
  const scorePercent = calculateQuizScore(score, questions.length)
  const domain = curriculum.domains.find((item) => item.id === domainId)
  const isInProgress = step === "question" || step === "review"

  useEffect(() => {
    if (open && step === "question") questionHeadingRef.current?.focus()
    if (open && step === "review") reviewHeadingRef.current?.focus()
  }, [open, questionIndex, reviewIndex, step])

  function launchCheckpoint() {
    if (saveState === "saved") resetAttempt()
    setOpen(true)
  }

  function resetAttempt() {
    setStep("setup")
    setQuestionIndex(0)
    setReviewIndex(0)
    setAnswers({})
    setSaveState("idle")
    setErrorMessage(null)
  }

  function changeDomain(value: string | null) {
    if (!curriculum.domains.some((item) => item.id === value)) return
    setDomainId(value as DomainId)
    setQuestionIndex(0)
    setReviewIndex(0)
    setAnswers({})
    setSaveState("idle")
    setErrorMessage(null)
  }

  function startQuestions() {
    if (questions.length === 0) return
    setQuestionIndex(0)
    setStep("question")
  }

  function selectAnswer(answerId: string) {
    if (!question || saveState === "saving") return
    setAnswers((current) => ({ ...current, [question.id]: answerId }))
    setSaveState("idle")
    setErrorMessage(null)
  }

  function goToNextQuestion() {
    if (!question || !answers[question.id]) return
    if (questionIndex < questions.length - 1) {
      setQuestionIndex((current) => current + 1)
      return
    }
    void submitCheckpoint()
  }

  async function submitCheckpoint() {
    if (!validateQuizSubmission(questions, answers)) {
      setErrorMessage("Choose an answer for every question before saving this checkpoint.")
      setSaveState("error")
      return
    }

    setSaveState("saving")
    setErrorMessage(null)

    try {
      const response = await fetch("/api/quiz-attempts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domainId, answers }),
      })
      const body = await response.json().catch(() => null) as { error?: unknown } | null

      if (!response.ok) {
        const message = typeof body?.error === "string"
          ? body.error
          : "We couldn't save your checkpoint. Check your connection and try again."
        setErrorMessage(message)
        setSaveState("error")
        return
      }

      setSaveState("saved")
      setStep("result")
      setErrorMessage(null)
      router.refresh()
    } catch {
      setErrorMessage("We couldn't save your checkpoint. Check your connection and try again.")
      setSaveState("error")
    }
  }

  function startAnswerReview() {
    setReviewIndex(0)
    setStep("review")
  }

  return (
    <>
      <Card className="h-full bg-muted/40">
        <CardHeader className="flex flex-row items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <CardDescription className="font-mono text-[10px] uppercase tracking-[0.15em]">
              Retrieval check
            </CardDescription>
            <CardTitle>Ten-question checkpoint</CardTitle>
          </div>
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full border bg-background text-muted-foreground">
            <BookOpenCheck aria-hidden="true" className="size-4" />
          </div>
        </CardHeader>
        <CardContent className="flex h-full flex-col items-start gap-5">
          <p className="max-w-prose text-sm leading-6 text-muted-foreground">
            Check your recall in one CCNA domain. Answer ten questions, then review every explanation.
          </p>
          <div className="flex w-full flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-2"><Clock3 aria-hidden="true" className="size-3.5" />About 10 minutes</span>
            <span>{isInProgress ? `${selectedCount} of ${questions.length} answered` : "Your score is saved to readiness"}</span>
          </div>
          <Button className="mt-auto" onClick={launchCheckpoint}>
            {saveState === "saved" ? "Start another checkpoint" : isInProgress ? "Resume checkpoint" : "Start checkpoint"}
            {saveState === "saved" ? <RotateCcw data-icon="inline-end" /> : <ArrowRight data-icon="inline-end" />}
          </Button>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex max-h-[min(90dvh,48rem)] w-[calc(100vw-1.5rem)] max-w-xl flex-col gap-0 overflow-y-auto overscroll-contain p-0 sm:max-w-xl sm:rounded-2xl">
          <DialogHeader className="border-b px-5 py-5 pr-14 sm:px-7 sm:py-6 sm:pr-16">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              {domainId} / {domain?.title}
            </p>
            <DialogTitle className="font-heading text-xl leading-tight sm:text-2xl">Readiness checkpoint</DialogTitle>
            <DialogDescription>
              {step === "setup" && "Choose a domain and set aside a few focused minutes."}
              {step === "question" && "Choose the best answer. You can move back and change earlier answers."}
              {step === "result" && "Your attempt is saved. Take a moment to review what you know."}
              {step === "review" && "Compare your answer with the correct response and its explanation."}
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-5 px-5 py-5 sm:gap-6 sm:px-7 sm:py-6">
            {step === "setup" ? (
              <section aria-labelledby="checkpoint-setup-title" className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <h3 className="font-medium" id="checkpoint-setup-title">Choose your exam domain</h3>
                  <p className="text-sm leading-6 text-muted-foreground">
                    Each checkpoint contains ten questions linked to the current CCNA exam objectives.
                  </p>
                </div>
                <Select
                  itemToStringLabel={(value) => {
                    const selected = curriculum.domains.find((item) => item.id === value)
                    return selected ? `${selected.id} · ${selected.title}` : ""
                  }}
                  value={domainId}
                  onValueChange={changeDomain}
                >
                  <SelectTrigger aria-label="Quiz domain" className="h-11 w-full justify-between">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent align="start" alignItemWithTrigger={false} className="max-h-64">
                    <SelectGroup>
                      {curriculum.domains.map((item) => (
                        <SelectItem className="h-auto min-h-9 whitespace-normal py-2" key={item.id} value={item.id}>
                          {item.id} · {item.title}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <div className="rounded-lg border bg-muted/40 px-4 py-3 text-sm leading-6 text-muted-foreground">
                  Your answers are saved with your readiness history after you finish.
                </div>
                <div className="flex justify-end border-t pt-4">
                  <Button disabled={questions.length === 0} onClick={startQuestions}>
                    Begin checkpoint <ArrowRight data-icon="inline-end" />
                  </Button>
                </div>
              </section>
            ) : null}

            {step === "question" && question ? (
              <section aria-labelledby="checkpoint-question-title" className="flex flex-col gap-5">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground" id="checkpoint-question-title" ref={questionHeadingRef} tabIndex={-1}>
                      Question {questionIndex + 1} of {questions.length}
                    </h3>
                    <Badge variant="outline">{selectedCount}/{questions.length} answered</Badge>
                  </div>
                  <Progress aria-label="Question progress" className="gap-2" value={((questionIndex + 1) / questions.length) * 100}>
                    <div className="flex w-full justify-between font-mono text-[10px] text-muted-foreground">
                      <span>Checkpoint progress</span>
                      <span>{Math.round(((questionIndex + 1) / questions.length) * 100)}%</span>
                    </div>
                  </Progress>
                </div>

                <div className="flex flex-col gap-4 rounded-xl border bg-card p-4 sm:p-5">
                  <p className="text-base font-medium leading-7 sm:text-lg" aria-live="polite">{question.prompt}</p>
                  <div className="grid gap-2" aria-label="Answer choices">
                    {question.choices.map((choice) => {
                      const selected = answers[question.id] === choice.id
                      return (
                        <Button
                          aria-pressed={selected}
                          className="h-auto min-h-11 w-full justify-start whitespace-normal px-3 py-2.5 text-left leading-5 sm:px-4"
                          key={choice.id}
                          onClick={() => selectAnswer(choice.id)}
                          variant={selected ? "secondary" : "outline"}
                          type="button"
                        >
                          <span className="flex size-6 shrink-0 items-center justify-center rounded-full border font-mono text-[10px]">{choice.id}</span>
                          <span className="min-w-0 flex-1">{choice.text}</span>
                          {selected ? <Check aria-hidden="true" className="size-4" /> : null}
                        </Button>
                      )
                    })}
                  </div>
                </div>

                {errorMessage ? <p className="text-sm leading-5 text-destructive" role="alert">{errorMessage}</p> : null}

                <div className="flex items-center justify-between gap-3 border-t pt-4">
                  <Button disabled={questionIndex === 0 || saveState === "saving"} onClick={() => setQuestionIndex((current) => current - 1)} variant="outline">
                    <ArrowLeft data-icon="inline-start" /> Back
                  </Button>
                  <Button disabled={!answers[question.id] || saveState === "saving"} onClick={goToNextQuestion}>
                    {saveState === "saving" ? "Saving…" : questionIndex === questions.length - 1 ? "Save checkpoint" : "Next question"}
                    {saveState === "saving" ? null : <ArrowRight data-icon="inline-end" />}
                  </Button>
                </div>
              </section>
            ) : null}

            {step === "result" ? (
              <section aria-labelledby="checkpoint-result-title" className="flex flex-col items-center gap-5 py-2 text-center">
                <Badge className="gap-1.5" variant="secondary"><Check aria-hidden="true" className="size-3.5" /> Attempt saved</Badge>
                <div className="flex flex-col gap-1">
                  <h3 className="font-mono text-5xl font-semibold tracking-tight" id="checkpoint-result-title">{scorePercent}%</h3>
                  <p className="text-sm text-muted-foreground">{score} correct out of {questions.length}</p>
                </div>
                <p className="max-w-sm text-sm leading-6 text-muted-foreground">
                  Review each answer now while the reasoning is fresh. Your score is included in the readiness history.
                </p>
                <div className="flex w-full flex-col-reverse gap-2 border-t pt-4 sm:flex-row sm:justify-end">
                  <Button onClick={() => setOpen(false)} variant="outline">Done</Button>
                  <Button onClick={startAnswerReview}>Review answers <ArrowRight data-icon="inline-end" /></Button>
                </div>
              </section>
            ) : null}

            {step === "review" && reviewQuestion ? (
              <section aria-labelledby="checkpoint-review-title" className="flex flex-col gap-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground" id="checkpoint-review-title" ref={reviewHeadingRef} tabIndex={-1}>
                    Review {reviewIndex + 1} of {questions.length}
                  </h3>
                  <Badge variant="outline">{scorePercent}% score</Badge>
                </div>
                <div className="flex flex-col gap-4 rounded-xl border bg-card p-4 sm:p-5">
                  <p className="text-base font-medium leading-7 sm:text-lg">{reviewQuestion.prompt}</p>
                  <div className="grid gap-2">
                    {reviewQuestion.choices.map((choice) => {
                      const isCorrect = choice.id === reviewQuestion.correctOptionId
                      const wasSelected = choice.id === answers[reviewQuestion.id]
                      return (
                        <div className={`flex min-h-11 flex-wrap items-center justify-between gap-2 rounded-lg border px-3 py-2 text-sm leading-5 sm:px-4 ${isCorrect ? "border-primary/40 bg-primary/5" : wasSelected ? "border-destructive/40 bg-destructive/5" : "bg-muted/30"}`} key={choice.id}>
                          <span className="flex min-w-0 flex-1 items-start gap-2">
                            <span className="shrink-0 font-mono text-xs text-muted-foreground">{choice.id}.</span>
                            <span>{choice.text}</span>
                          </span>
                          {isCorrect ? <span className="inline-flex shrink-0 items-center gap-1 text-xs font-medium"><Check aria-hidden="true" className="size-3.5" />Correct</span> : null}
                          {wasSelected && !isCorrect ? <span className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-destructive"><CircleAlert aria-hidden="true" className="size-3.5" />Your answer</span> : null}
                          {wasSelected && isCorrect ? <span className="sr-only">Your answer</span> : null}
                        </div>
                      )
                    })}
                  </div>
                  <div className="rounded-lg bg-muted/50 px-4 py-3 text-sm leading-6">
                    <p className="mb-1 font-medium">Why</p>
                    <p className="text-muted-foreground">{reviewQuestion.explanation}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3 border-t pt-4">
                  <Button onClick={() => reviewIndex === 0 ? setStep("result") : setReviewIndex((current) => current - 1)} variant="outline">
                    <ArrowLeft data-icon="inline-start" /> {reviewIndex === 0 ? "Score" : "Previous"}
                  </Button>
                  {reviewIndex < questions.length - 1 ? (
                    <Button onClick={() => setReviewIndex((current) => current + 1)}>Next answer <ArrowRight data-icon="inline-end" /></Button>
                  ) : (
                    <Button onClick={() => setOpen(false)}>Finish review <Check data-icon="inline-end" /></Button>
                  )}
                </div>
              </section>
            ) : null}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
