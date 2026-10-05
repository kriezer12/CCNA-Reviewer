"use client"

import { useState } from "react"
import Link from "next/link"
import { Button, buttonVariants } from "@/components/ui/button"
import type { PracticeQuestion } from "@/content/practice/types"

export function SaveMissed({ questions, answers }: {
  questions: readonly PracticeQuestion[]; answers: Readonly<Record<string, string>>
}) {
  const [state, setState] = useState<"idle" | "saving" | "saved" | "error">("idle")
  const [message, setMessage] = useState("")
  const missed = questions.filter(item => answers[item.id] !== item.correctOptionId).length
  async function save() {
    setState("saving")
    setMessage("Saving missed questions…")
    try {
      const response = await fetch("/api/review-items", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: questions.map(item => ({ questionId: item.id, contentRevision: item.contentRevision, selectedChoice: answers[item.id] })) }) })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error ?? "Missed questions could not be saved. Retry this action.")
      setState("saved")
      setMessage(`${result.saved} missed questions are in your private review list. Existing review dates are preserved.`)
    } catch (error) {
      setState("error")
      setMessage(error instanceof Error ? error.message : "Missed questions could not be saved. Retry this action.")
    }
  }
  return <div className="flex w-full flex-col gap-3">
    <div className="flex flex-wrap gap-3">
      {missed > 0 ? <Button className="min-h-11" variant="outline" onClick={save} disabled={state === "saving" || state === "saved"}>
        {state === "saving" ? "Saving…" : state === "saved" ? "Missed questions saved" : state === "error" ? "Retry saving missed" : `Save missed (${missed})`}
      </Button> : <p className="text-sm">All correct — no missed questions to save.</p>}
      <Link href="/review" className={buttonVariants({variant: "outline", className: "min-h-11"})}>Open private review list</Link>
    </div>
    <p role="status" className="text-sm text-muted-foreground">{message || "Save explicitly to revisit these questions across devices. This does not record a quiz attempt or study time."}</p>
  </div>
}
