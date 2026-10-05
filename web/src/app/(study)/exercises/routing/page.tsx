import Link from "next/link"
import { requireOwner } from "@/lib/supabase/auth"
import { curriculum } from "@/content/curriculum"
import { RoutingTrainer } from "@/components/exercises/routing-trainer"
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header"
import { buttonVariants } from "@/components/ui/button"

export const dynamic = "force-dynamic"
export default async function RoutingExercisePage() {
  await requireOwner()
  const objective = curriculum.objectives.find(item => item.id === "3.2")!
  return <>
    <DashboardPageHeader eyebrow="Interactive exercises / Objective 3.2" title="Route the packet" description="Choose from explicitly installed routes, then inspect an ordered text explanation of the decision. Packet-flow cases show each hop without claiming live-device execution." />
    <RoutingTrainer />
    <section className="flex flex-col gap-3 rounded-xl border border-border p-5" aria-labelledby="routing-sources">
      <h2 id="routing-sources" className="text-xl font-semibold">Study references</h2>
      <p className="text-sm leading-6 text-muted-foreground">Use the relevant guide and the supplied source locators to verify the model.</p>
      <Link className={buttonVariants({ variant: "outline", className: "min-h-11 w-fit" })} href="/learn/3.2#sources">Objective 3.2 guide and references</Link>
      <ul className="list-disc pl-5 text-sm leading-6">{objective.sourceLocators.map(locator => {
        const source = curriculum.sources.find(item => item.id === locator.sourceId)!
        return <li key={`${locator.sourceId}-${locator.locator}`}>{"url" in source && source.url ? <a className="underline" href={source.url} target="_blank" rel="noreferrer">{source.title}</a> : source.title} · {locator.locator}</li>
      })}</ul>
      <p className="text-sm text-muted-foreground">All addresses and outcomes are illustrative. No router commands run, and these exercises create no score or completion record.</p>
    </section>
    <Link className={buttonVariants({ variant: "outline", className: "min-h-11 w-fit" })} href="/exercises">Back to interactive exercises</Link>
  </>
}
