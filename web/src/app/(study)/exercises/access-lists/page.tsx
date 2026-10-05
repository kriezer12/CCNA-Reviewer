import Link from "next/link"
import { requireOwner } from "@/lib/supabase/auth"
import { curriculum } from "@/content/curriculum"
import { AclTrainer } from "@/components/exercises/acl-trainer"
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header"
import { buttonVariants } from "@/components/ui/button"

export const dynamic = "force-dynamic"
export default async function AccessListExercisePage() {
  await requireOwner()
  const objective=curriculum.objectives.find(item=>item.id==="5.6")!
  return <>
    <DashboardPageHeader eyebrow="Interactive exercises / Objective 5.6" title="Trace the ACL decision" description="Evaluate explicit standard and extended IPv4 packet examples against an ordered interface policy. Choose the deciding entry before viewing feedback." />
    <AclTrainer />
    <section className="flex flex-col gap-3 rounded-xl border p-5" aria-labelledby="acl-sources"><h2 id="acl-sources" className="text-xl font-semibold">Study references</h2><Link className={buttonVariants({variant:"outline",className:"min-h-11 w-fit"})} href="/learn/5.6#sources">Objective 5.6 guide and references</Link><ul className="list-disc pl-5 text-sm leading-6">{objective.sourceLocators.map(locator=>{const source=curriculum.sources.find(item=>item.id===locator.sourceId)!;return <li key={`${locator.sourceId}-${locator.locator}`}>{"url" in source&&source.url?<a className="underline" href={source.url} target="_blank" rel="noreferrer">{source.title}</a>:source.title} · {locator.locator}</li>})}</ul></section>
    <p className="text-sm text-muted-foreground">These structured examples do not execute IOS commands or claim platform-specific behavior. No score, completion, study time, or lab evidence is recorded.</p>
  </>
}
