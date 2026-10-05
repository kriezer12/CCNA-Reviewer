"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Bookmark, BookmarkCheck } from "lucide-react"
import { Button } from "@/components/ui/button"

export function BookmarkToggle({ resourceType, resourceId, saved = false }: {
  resourceType: "guide" | "question"; resourceId: string; saved?: boolean
}) {
  const [isSaved, setIsSaved] = useState(saved)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  async function toggle() {
    setPending(true)
    setError("")
    try {
      const response = await fetch("/api/bookmarks", { method: isSaved ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" }, body: JSON.stringify({ resourceType, resourceId }) })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error ?? "Bookmark could not be changed. Retry this action.")
      setIsSaved(!isSaved)
      if (isSaved) router.refresh()
    } catch (failure) {
      setError(failure instanceof Error ? failure.message : "Bookmark could not be changed. Retry this action.")
    } finally { setPending(false) }
  }
  const Icon = isSaved ? BookmarkCheck : Bookmark
  return <div className="flex flex-col gap-2">
    <Button type="button" variant="outline" className="min-h-11 w-fit" disabled={pending} aria-pressed={isSaved} onClick={toggle}>
      <Icon data-icon="inline-start" />{pending ? "Saving…" : isSaved ? "Remove bookmark" : "Bookmark this resource"}
    </Button>
    <p aria-live="polite" className="text-sm text-destructive">{error}</p>
  </div>
}
