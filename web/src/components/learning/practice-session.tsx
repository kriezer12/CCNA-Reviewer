"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field"
import { Progress } from "@/components/ui/progress"
import type { PracticeQuestion } from "@/content/practice/types"
import { SaveMissed } from "@/components/learning/save-missed"
import { BookmarkToggle } from "@/components/learning/bookmark-toggle"
import { PracticeDraft, validatePracticeDraft } from "@/lib/practice-draft-model"
import { practiceQuestions } from "@/content/practice"

export interface PracticeResources {
  readonly bookmarked?: boolean
  readonly links: readonly { title: string; href: string }[]
  readonly sources: readonly { title: string; locator: string }[]
}

export function PracticeSession({
  initialQuestions,
  feedback,
  newSessionHref,
  requestedCount,
  resources,
  initialDraft,
  sessionSettings,
}: {
  initialQuestions: readonly PracticeQuestion[]
  feedback: "guided" | "checkpoint"
  newSessionHref: string
  requestedCount: number
  resources: Readonly<Record<string, PracticeResources>>
  initialDraft?: { revision: number; draft: unknown } | null
  sessionSettings: { seed: string; filters: PracticeDraft["filters"]; mode: PracticeDraft["mode"] }
}) {
  const restored = initialDraft ? validatePracticeDraft(initialDraft.draft) : null
  const restoredQuestions = restored?.questionRefs.map(ref => initialQuestions.find(q => q.id === ref.questionId && q.contentRevision === ref.contentRevision))
  const usableDraft = restored && restoredQuestions?.every(Boolean) ? restored : null
  const [questions, setQuestions] = useState(usableDraft ? restoredQuestions as PracticeQuestion[] : initialQuestions)
  const [answers, setAnswers] = useState<Record<string, string>>(usableDraft?.answers ?? {})
  const [checked, setChecked] = useState<readonly string[]>(usableDraft?.checked ?? [])
  const [index, setIndex] = useState(usableDraft?.position ?? 0)
  const [started, setStarted] = useState(Boolean(usableDraft))
  const [finished, setFinished] = useState(false)
  const [retryingMissed, setRetryingMissed] = useState(false)
  const [draftRevision, setDraftRevision] = useState(usableDraft ? initialDraft!.revision : null)
  const [draftState, setDraftState] = useState("")
  const [savedDraft, setSavedDraft] = useState<{ revision: number; draft: unknown } | null>(null)
  const [sessionFeedback, setSessionFeedback] = useState(feedback)
  const currentFeedback = retryingMissed ? "guided" : sessionFeedback
  const heading = useRef<HTMLHeadingElement>(null)
  const allowLeave = useRef(false)
  const question = questions[index]
  const answered = questions.filter((item) => answers[item.id]).length
  const dirty = started && !finished && answered > 0
  const score = questions.filter(
    (item) => answers[item.id] === item.correctOptionId,
  ).length
  const locked = question && (finished || checked.includes(question.id))

  useEffect(() => {
    if (started) heading.current?.focus()
  }, [index, started, finished])
  useEffect(() => {
    if (initialDraft) return
    fetch("/api/practice-drafts").then(async response => {
      if (response.ok) {
        const result = await response.json()
        setSavedDraft(result.draft)
      }
    }).catch(() => {})
  }, [initialDraft])
  useEffect(() => {
    if (!dirty) return
    allowLeave.current = false
    const message = draftRevision === null
      ? "Unsaved answers will be lost if you leave. Save practice before leaving?"
      : "Unsaved changes will be lost if you leave. Your last explicitly saved draft will remain available."
    const guard = { ...window.history.state, practiceGuard: true }
    if (!window.history.state?.practiceGuard)
      window.history.pushState(guard, "", location.href)
    function beforeUnload(event: BeforeUnloadEvent) {
      if (!allowLeave.current) {
        event.preventDefault()
        event.returnValue = ""
      }
    }
    function onLink(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return
      const anchor = (event.target as Element).closest<HTMLAnchorElement>(
        "a[href]",
      )
      if (
        !anchor ||
        anchor.hasAttribute("download") ||
        (anchor.target && anchor.target !== "_self")
      )
        return
      if (
        anchor.hash &&
        anchor.pathname === location.pathname &&
        anchor.search === location.search
      )
        return
      if (window.confirm(message)) allowLeave.current = true
      else event.preventDefault()
    }
    function onPop() {
      if (allowLeave.current) return
      if (window.confirm(message)) {
        allowLeave.current = true
        window.history.back()
      } else window.history.pushState(guard, "", location.href)
    }
    function onNavigationIntent(event: Event) {
      if (window.confirm(message)) allowLeave.current = true
      else event.preventDefault()
    }
    window.addEventListener("beforeunload", beforeUnload)
    document.addEventListener("click", onLink, true)
    window.addEventListener("popstate", onPop)
    window.addEventListener("study:before-navigation", onNavigationIntent)
    return () => {
      window.removeEventListener("beforeunload", beforeUnload)
      document.removeEventListener("click", onLink, true)
      window.removeEventListener("popstate", onPop)
      window.removeEventListener("study:before-navigation", onNavigationIntent)
    }
  }, [dirty, draftRevision])

  function restart(missedOnly = false) {
    if (
      dirty &&
      !window.confirm(
        "Discard these answers and restart this practice session?",
      )
    )
      return
    const next = missedOnly
      ? questions.filter((item) => answers[item.id] !== item.correctOptionId)
      : initialQuestions
    if (!next.length) return
    setRetryingMissed(missedOnly)
    setQuestions(next)
    setAnswers({})
    setChecked([])
    setIndex(0)
    setFinished(false)
    setStarted(true)
  }

  async function saveDraft() {
    const draft: Omit<PracticeDraft, "revision"> = {
      questionRefs: questions.map(item => ({ questionId: item.id, contentRevision: item.contentRevision })),
      ...sessionSettings, feedback: currentFeedback, answers, checked: [...checked], position: index,
    }
    setDraftState("Saving practice…")
    const expectedRevision = draftRevision ?? savedDraft?.revision ?? null
    const response = await fetch("/api/practice-drafts", { method: expectedRevision === null ? "POST" : "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify(expectedRevision === null ? draft : { revision: expectedRevision, draft }) })
    const result = await response.json().catch(() => ({}))
    if (!response.ok) { setDraftState(result.error ?? "Practice could not be saved. Your answers are still here."); return }
    setDraftRevision(result.revision)
    setSavedDraft({ revision: result.revision, draft })
    setDraftState("Practice saved privately. You can resume it from this page on another device.")
  }

  function resumeDraft() {
    const draft = savedDraft && validatePracticeDraft(savedDraft.draft)
    if (!draft) { setDraftState("This saved practice refers to retired or changed questions. Discard it to restart with current content."); return }
    const restored = draft.questionRefs.map(ref => practiceQuestions.find(q => q.id === ref.questionId && q.contentRevision === ref.contentRevision))
    if (restored.some(item => !item)) { setDraftState("Some saved questions have changed. Discard this draft to restart with current content."); return }
    setQuestions(restored as PracticeQuestion[])
    setAnswers(draft.answers)
    setChecked(draft.feedback === "guided" ? draft.checked : [])
    setIndex(draft.position)
    setSessionFeedback(draft.feedback)
    setDraftRevision(savedDraft!.revision)
    setStarted(true)
  }

  async function removeDraftBeforeFinish() {
    if (draftRevision === null) { setFinished(true); return }
    const response = await fetch("/api/practice-drafts", { method: "DELETE", headers: { "content-type": "application/json" }, body: JSON.stringify({ revision: draftRevision }) })
    const result = await response.json().catch(() => ({}))
    if (!response.ok) { setDraftState(result.error ?? "Saved practice remains available. Retry discard."); return }
    setDraftRevision(null)
    setFinished(true)
  }

  if (!question)
    return (
      <Card>
        <CardHeader>
          <CardTitle>No questions available for this selection</CardTitle>
          <CardDescription>
            Reset the filters or choose another objective.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link
            className={buttonVariants({
              variant: "outline",
              className: "min-h-11",
            })}
            href="/practice"
          >
            Reset practice
          </Link>
        </CardContent>
      </Card>
    )
  if (!started)
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your next practice session</CardTitle>
          <CardDescription className="text-base leading-7">
            {questions.length} questions ·{" "}
            {currentFeedback === "guided"
              ? "Check each answer as you go"
              : "Review answers after submitting"}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {savedDraft ? <div className="flex flex-wrap gap-3 rounded-lg border p-4">
            <p className="w-full text-sm">A private saved practice is available. Resume it, or start new and replace it explicitly when you save.</p>
            <Button className="min-h-11" variant="outline" onClick={resumeDraft}>Resume saved practice</Button>
            <Button className="min-h-11" variant="outline" onClick={() => { setDraftRevision(savedDraft.revision); setStarted(true) }}>Replace with this session</Button>
            <Button className="min-h-11" variant="ghost" onClick={() => void (async () => {
              const response = await fetch("/api/practice-drafts", { method:"DELETE", headers:{"content-type":"application/json"}, body:JSON.stringify({revision:savedDraft.revision}) })
              const result = await response.json().catch(() => ({}))
              if (response.ok) setSavedDraft(null)
              else setDraftState(result.error ?? "Saved practice remains available. Retry discard.")
            })()}>Discard saved practice</Button>
          </div> : null}
          {draftState ? <p role="status" className="text-sm text-muted-foreground">{draftState}</p> : null}
          {questions.length < requestedCount ? (
            <p className="text-base leading-7">
              This selection has {questions.length} questions, so your requested{" "}
              {requestedCount}-question session is capped to the available bank.
            </p>
          ) : null}
          <p className="text-sm leading-6 text-muted-foreground">
            Answers and results are temporary and reset on refresh. This
            practice does not save quiz history, record study time, or change
            readiness.
          </p>
          <Button className="min-h-11 w-fit" onClick={() => setStarted(true)}>
            Start practice
          </Button>
        </CardContent>
      </Card>
    )
  if (finished)
    return (
      <section
        className="flex flex-col gap-5"
        aria-labelledby="practice-result"
      >
        <Card>
          <CardHeader>
            <h2
              id="practice-result"
              className="text-2xl font-semibold outline-none focus-visible:ring-2 focus-visible:ring-ring"
              ref={heading}
              tabIndex={-1}
            >
              Practice result: {score} / {questions.length}
            </h2>
            <CardDescription className="text-base">
              {Math.round((score / questions.length) * 100)}% in this temporary
              session. This is not a saved readiness assessment.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <SaveMissed questions={questions} answers={answers} />
            <Button className="min-h-11" onClick={() => restart()}>
              Retry session
            </Button>
            {score < questions.length ? (
              <Button
                className="min-h-11"
                variant="outline"
                onClick={() => restart(true)}
              >
                Retry missed ({questions.length - score})
              </Button>
            ) : (
              <p className="text-sm content-center">
                All correct — no missed questions to retry.
              </p>
            )}
            <Link
              className={buttonVariants({
                variant: "outline",
                className: "min-h-11",
              })}
              href={newSessionHref}
            >
              New session
            </Link>
          </CardContent>
        </Card>
        {questions.map((item, position) => (
          <Card key={item.id}>
            <CardHeader>
              <Badge className="w-fit" variant="outline">
                {answers[item.id] === item.correctOptionId
                  ? "Correct"
                  : "Review this"}
              </Badge>
              <CardTitle>
                {position + 1}. {item.prompt}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <BookmarkToggle resourceType="question" resourceId={item.id} saved={resources[item.id]?.bookmarked} />
              <AnswerFeedback
                question={item}
                selected={answers[item.id]}
                resources={resources[item.id]}
              />
            </CardContent>
          </Card>
        ))}
      </section>
    )
  return (
    <Card>
      <CardHeader className="gap-3">
        <div className="flex flex-wrap justify-between gap-2">
          <Badge variant="outline">
            {index + 1} / {questions.length}
          </Badge>
          <span className="text-sm text-muted-foreground">
            {answered} answered ·{" "}
            {currentFeedback === "guided"
              ? "Guided practice"
              : "Checkpoint practice"}
          </span>
        </div>
        <Progress
          value={(answered / questions.length) * 100}
          aria-label="Questions answered"
        />
        <h2
          ref={heading}
          tabIndex={-1}
          className="whitespace-pre-wrap text-xl font-semibold leading-8 outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {question.prompt}
        </h2>
        <CardDescription>
          Objective {question.objectiveIds.join(", ")} · {question.difficulty} ·{" "}
          {question.format}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <FieldSet disabled={Boolean(locked)}>
          <FieldLegend>Choose one answer</FieldLegend>
          {question.choices.map((choice) => (
            <Field
              key={choice.id}
              orientation="horizontal"
              className="min-h-11 rounded-lg border border-border"
            >
              <FieldLabel
                className="min-h-11 w-full flex-1 items-center whitespace-pre-wrap break-words p-3"
                htmlFor={`${question.id}-${choice.id}`}
              >
                <input
                  className="size-4 shrink-0 accent-primary focus-visible:outline-2 focus-visible:outline-ring"
                  id={`${question.id}-${choice.id}`}
                  type="radio"
                  name={question.id}
                  checked={answers[question.id] === choice.id}
                  onChange={() =>
                    setAnswers((current) => ({
                      ...current,
                      [question.id]: choice.id,
                    }))
                  }
                />
                <span className="min-w-0">
                  {choice.id}. {choice.text}
                </span>
              </FieldLabel>
            </Field>
          ))}
        </FieldSet>
        {currentFeedback === "guided" && locked ? (
          <div role="status">
            <AnswerFeedback
              question={question}
              selected={answers[question.id]}
              resources={resources[question.id]}
            />
          </div>
        ) : null}
        <div className="flex flex-wrap gap-3">
          <Button
            className="min-h-11"
            variant="outline"
            onClick={() => void saveDraft()}
          >
            Save practice
          </Button>
          <Button
            className="min-h-11"
            variant="outline"
            disabled={index === 0}
            onClick={() => setIndex(index - 1)}
          >
            Previous
          </Button>
          {currentFeedback === "guided" && !locked ? (
            <Button
              className="min-h-11"
              disabled={!answers[question.id]}
              onClick={() => setChecked((current) => [...current, question.id])}
            >
              Check answer
            </Button>
          ) : null}
          <Button
            className="min-h-11"
            variant="outline"
            disabled={
              index === questions.length - 1 ||
              (currentFeedback === "guided" && !locked)
            }
            onClick={() => setIndex(index + 1)}
          >
            Next
          </Button>
          <Button
            className="min-h-11"
            disabled={
              answered !== questions.length ||
              (currentFeedback === "guided" &&
                checked.length !== questions.length)
            }
            onClick={() => void removeDraftBeforeFinish()}
          >
            Finish and review
          </Button>
        </div>
        {draftState ? <p role="status" className="text-sm text-muted-foreground">{draftState}</p> : null}
        <p className="text-sm text-muted-foreground">
          {locked
            ? "Checked answers are locked for this session."
            : "Your answers are temporary. Refreshing clears this session."}
        </p>
      </CardContent>
    </Card>
  )
}

function AnswerFeedback({
  question,
  selected,
  resources,
}: {
  question: PracticeQuestion
  selected?: string
  resources?: PracticeResources
}) {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-base leading-7">
        <strong>
          {selected === question.correctOptionId
            ? "Correct."
            : "Keep practicing."}
        </strong>{" "}
        {question.explanation}
      </p>
      <ul className="flex flex-col gap-3 text-sm leading-6">
        {question.choices.map((choice) => (
          <li key={choice.id}>
            <strong>
              {choice.id}
              {choice.id === selected ? " · Your answer" : ""}
              {choice.id === question.correctOptionId
                ? " · Correct answer"
                : ""}
              : {choice.text}
            </strong>
            <p>{choice.rationale}</p>
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-3">
        {question.objectiveIds.map((id) => (
          <Link
            className={buttonVariants({
              variant: "outline",
              className: "min-h-11",
            })}
            key={id}
            href={`/learn/${id}`}
          >
            Review guide {id}
          </Link>
        ))}
        {resources?.links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={buttonVariants({
              variant: "outline",
              className: "min-h-11 whitespace-normal",
            })}
          >
            {link.title}
          </Link>
        ))}
      </div>
      {resources?.sources.length ? (
        <div className="text-sm leading-6 text-muted-foreground">
          <strong>Study references</strong>
          <ul className="list-disc pl-5">
            {resources.sources.map((source) => (
              <li key={`${source.title}-${source.locator}`}>
                {source.title} · {source.locator}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  )
}
