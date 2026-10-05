import Link from "next/link"
import { randomUUID } from "node:crypto"
import { curriculum } from "@/content/curriculum"
import { practiceQuestions } from "@/content/practice"
import { guideForObjective } from "@/content/learning"
import { requireOwner } from "@/lib/supabase/auth"
import { createClient } from "@/lib/supabase/server"
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header"
import { BookmarkToggle } from "@/components/learning/bookmark-toggle"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export const dynamic = "force-dynamic"

export default async function BookmarksPage() {
  const owner = await requireOwner()
  const supabase = await createClient()
  const { data, error } = await supabase.from("bookmarks").select("resource_type,resource_id,saved_at")
    .eq("user_id", owner.id).order("saved_at", { ascending: false })
  return <>
    <DashboardPageHeader eyebrow="Your resources / saved for later" title="Bookmarked guides and questions"
      description="Resources you chose to keep close. These bookmarks do not enter spaced review or change study progress." />
    {error ? <Card><CardHeader><CardTitle>Bookmarks could not be loaded</CardTitle>
      <CardDescription>Your saved resources may still be available. Retry loading the list.</CardDescription></CardHeader>
      <CardContent><Link href="/bookmarks" className={buttonVariants({variant:"outline", className:"min-h-11"})}>Retry loading bookmarks</Link></CardContent></Card>
    : !data?.length ? <Card><CardHeader><CardTitle>No bookmarks yet</CardTitle>
      <CardDescription>Bookmark a guide or a useful question after practice, then return here to find it across devices.</CardDescription></CardHeader>
      <CardContent><Link href="/learn" className={buttonVariants({variant:"outline", className:"min-h-11"})}>Browse learning guides</Link></CardContent></Card>
    : <section className="flex flex-col gap-5" aria-label="Saved resources">
      {data.map(row => {
        const type = row.resource_type as string
        const id = row.resource_id as string
        const guide = type === "guide" ? guideForObjective(id) : undefined
        const question = type === "question" ? practiceQuestions.find(item => item.id === id) : undefined
        const title = curriculum.objectives.find(item => item.id === id)?.title ?? question?.prompt
        const unavailable = !title
        const href = guide ? `/learn/${encodeURIComponent(id)}` : question
          ? `/practice?question=${encodeURIComponent(id)}&objective=${encodeURIComponent(question.objectiveIds[0])}&count=5&feedback=guided&seed=${randomUUID()}` : null
        return <Card key={`${type}:${id}`}>
          <CardHeader><CardTitle>{unavailable ? "Saved resource unavailable" : title}</CardTitle>
            <CardDescription>{unavailable ? "This published guide or question is no longer available. Remove the bookmark; no replacement is chosen automatically." : type === "guide" ? `Guide · Objective ${id}` : `Practice question · Objective ${question?.objectiveIds.join(", ")}`}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap items-center gap-3">
            {href ? <Link href={href} className={buttonVariants({variant:"outline",className:"min-h-11"})}>{type === "guide" ? "Open current guide" : "Practice this question"}</Link> : null}
            {type === "guide" || type === "question" ? <BookmarkToggle resourceType={type} resourceId={id} saved /> : null}
            {question ? <span className="text-sm text-muted-foreground">{curriculum.objectives.find(item => item.id === question.objectiveIds[0])?.title}</span> : null}
          </CardContent>
        </Card>
      })}
    </section>}
  </>
}
