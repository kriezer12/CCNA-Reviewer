import Link from "next/link"
import { curriculum } from "@/content/curriculum"
import { resolveReviewQuestion } from "@/lib/review-model"
import { requireOwner } from "@/lib/supabase/auth"
import { createClient } from "@/lib/supabase/server"
import { todayInTimeZone, toLocalDateKey } from "@/lib/analytics"
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header"
import { RemoveReviewItem } from "@/components/learning/remove-review-item"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { ReviewCheck } from "@/components/learning/review-check"

export const dynamic = "force-dynamic"

export default async function ReviewPage() {
  const owner = await requireOwner()
  const supabase = await createClient()
  const today = toLocalDateKey(todayInTimeZone(process.env.STUDY_TIME_ZONE ?? "Asia/Manila"))
  const { data, error } = await supabase.from("review_items")
    .select("question_id,content_revision,due_on,saved_at")
    .eq("user_id", owner.id).order("due_on").order("saved_at").order("question_id")
  const dueItems = (data ?? []).filter(item => item.due_on <= today).slice(0,5)
  const nextDue = (data ?? []).find(item => item.due_on > today)?.due_on
  const unavailableUpcoming = (data ?? []).filter(item => item.due_on > today &&
    !resolveReviewQuestion({questionId:item.question_id as string,contentRevision:item.content_revision as number}))
  return <>
    <DashboardPageHeader eyebrow="Review / retain your learning" title="Your private review list"
      description="Missed questions you chose to save. These remain separate from quiz history, lesson understanding, lab evidence, and study time." />
    {error ? <Card><CardHeader><CardTitle>Review list could not be loaded</CardTitle>
      <CardDescription>Your saved questions may still be available. Retry loading the list.</CardDescription></CardHeader>
      <CardContent><Link href="/review" className={buttonVariants({ variant: "outline", className: "min-h-11" })}>Retry loading review</Link></CardContent></Card>
    : !data?.length ? <Card><CardHeader><CardTitle>No saved missed questions yet</CardTitle>
      <CardDescription>Finish a practice session, then choose Save missed to build this list.</CardDescription></CardHeader>
      <CardContent><Link href="/practice" className={buttonVariants({ variant: "outline", className: "min-h-11" })}>Start practice</Link></CardContent></Card>
    : dueItems.length === 0 ? <Card><CardHeader><CardTitle>No questions due today</CardTitle>
      <CardDescription>{nextDue ? `Your next saved question is due ${nextDue}.` : "Your saved question list is clear."} Bookmark useful resources or continue the Study today sequence while they come due.</CardDescription></CardHeader>
      <CardContent className="flex flex-wrap gap-3"><Link href="/practice" className={buttonVariants({variant:"outline",className:"min-h-11"})}>Practice more</Link><Link href="/bookmarks" className={buttonVariants({variant:"outline",className:"min-h-11"})}>Open bookmarks</Link></CardContent></Card>
    : <section className="flex flex-col gap-5" aria-label="Questions due for review today">
      <p className="text-sm text-muted-foreground">Showing up to five due questions. A checked question moves to its next study date.</p>
      {dueItems.map(row => {
        const reference = { questionId: row.question_id as string, contentRevision: row.content_revision as number }
        const question = resolveReviewQuestion(reference)
        return <Card key={`${reference.questionId}:${reference.contentRevision}`}>
          <CardHeader><h2 className="whitespace-pre-wrap break-words font-heading text-base leading-snug font-medium">{question?.prompt ?? "Saved question unavailable"}</h2>
            <CardDescription>{question ? `Objective ${question.objectiveIds.join(", ")} · Due ${row.due_on}` : "This published revision is no longer available. Remove it and choose current practice; it will not be substituted automatically."}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {question ? <>
              <ReviewCheck question={question} contentRevision={reference.contentRevision} />
              <div className="flex flex-wrap gap-3">{question.objectiveIds.map(id => <Link key={id} href={`/learn/${id}`} className={buttonVariants({ variant: "outline", className: "min-h-11" })}>Read guide {id}</Link>)}</div>
              <ul className="flex flex-col gap-2 text-sm text-muted-foreground">{question.sourceLocators.map(source => <li key={`${source.sourceId}:${source.locator}`}>{curriculum.sources.find(item => item.id === source.sourceId)?.title ?? source.sourceId} · {source.locator}</li>)}</ul>
            </> : null}
            <RemoveReviewItem reference={reference} />
          </CardContent>
        </Card>
      })}
    </section>}
    {!error && unavailableUpcoming.length ? <section className="flex flex-col gap-4" aria-label="Unavailable saved questions">
      <h2 className="text-lg font-semibold">Unavailable saved questions</h2>
      <p className="text-sm text-muted-foreground">These saved revisions have been retired. Remove them without waiting for their due date.</p>
      {unavailableUpcoming.map(row=>{
        const reference={questionId:row.question_id as string,contentRevision:row.content_revision as number}
        return <Card key={`${reference.questionId}:${reference.contentRevision}`}><CardHeader><CardTitle>Saved question unavailable</CardTitle>
          <CardDescription>Its content revision is no longer available; it has not been substituted.</CardDescription></CardHeader>
          <CardContent><RemoveReviewItem reference={reference}/></CardContent></Card>
      })}
    </section>:null}
  </>
}
