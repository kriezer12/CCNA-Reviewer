"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import type { QuestionReference } from "@/lib/review-model"

export function RemoveReviewItem({ reference }: { reference: QuestionReference }) {
  const router = useRouter()
  const [pending, setPending] = useState(false)
  const [error, setError] = useState("")
  async function remove() {
    setPending(true)
    setError("")
    try {
      const response = await fetch("/api/review-items", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify(reference) })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error ?? "The question could not be removed. Retry this action.")
      router.refresh()
    } catch (failure) {
      setError(failure instanceof Error ? failure.message : "The question could not be removed. Retry this action.")
    } finally { setPending(false) }
  }
  return <div className="flex flex-col gap-2">
    <Button variant="outline" className="min-h-11 w-fit" disabled={pending} onClick={remove}>
      {pending ? "Removing…" : error ? "Retry removing question" : "Remove from review"}
    </Button>
    <p role="status" className="text-sm text-destructive">{error}</p>
  </div>
}
