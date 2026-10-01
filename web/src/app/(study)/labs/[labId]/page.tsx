import Link from "next/link"
import { notFound } from "next/navigation"

import { LabEvidenceForm } from "@/components/dashboard/lab-evidence-form"
import { RetryButton } from "@/components/dashboard/retry-button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { curriculum } from "@/content/curriculum"
import { labExtraRequirements, labTopology } from "@/content/lab-workspaces"
import { getRoadmapHref } from "@/lib/roadmap-model"
import { requireOwner } from "@/lib/supabase/auth"
import { createClient } from "@/lib/supabase/server"
import type { LabProgressRow } from "@/lib/supabase/progress"

export const dynamic = "force-dynamic"

const navigation = [
  ["brief", "Brief"], ["tasks", "Tasks"], ["verification", "Verification"],
  ["fault", "Fault exercise"], ["record-evidence", "Record evidence"],
] as const

export default async function LabWorkspacePage({ params }: { params: Promise<{ labId: string }> }) {
  const owner = await requireOwner()
  const { labId } = await params
  const lab = curriculum.labs.find((item) => item.id === labId)
  if (!lab) notFound()

  let saved: LabProgressRow | null = null
  let loadError = false
  try {
    const supabase = await createClient()
    const result = await supabase.from("lab_progress")
      .select("lab_id,status,evidence_mode,evidence_note,completed_at,updated_at")
      .eq("user_id", owner.id).eq("lab_id", lab.id).maybeSingle()
    if (result.error) throw result.error
    saved = result.data as LabProgressRow | null
  } catch (error) {
    console.error("[lab-workspace] failed to load saved evidence", error)
    loadError = true
  }

  const weekHref = getRoadmapHref(lab.week)
  return <div className="flex min-w-0 flex-col gap-7 text-base">
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm">
      <Link className="underline underline-offset-4" href="/labs">Labs</Link><span aria-hidden="true">/</span>
      <Link className="underline underline-offset-4" href={weekHref}>Week {String(lab.week).padStart(2, "0")}</Link><span aria-hidden="true">/</span>
      <span aria-current="page">{lab.id}</span>
    </nav>
    <header className="space-y-4">
      <div><p className="text-sm font-medium text-muted-foreground">Practical lab / {lab.id}</p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{lab.id}: {lab.title}</h1></div>
      <p className="max-w-3xl leading-7 text-muted-foreground">{lab.summary}</p>
      <div className="flex flex-wrap gap-2"><Badge variant="outline">{lab.durationMinutes} minute estimate</Badge><Badge variant="outline">{lab.platform.primary.replaceAll("-", " ")}</Badge><Badge variant="outline">{loadError ? "Saved status unavailable" : saved?.status?.replaceAll("_", " ") ?? "Not started"}</Badge><Badge variant="outline">Evidence: {loadError ? "unavailable" : saved?.evidence_mode?.replaceAll("_", " ") ?? "not recorded"}</Badge></div>
      <p className="text-sm leading-6"><strong>Platform boundary:</strong> {lab.platform.limitation}</p>
      <p className="text-sm leading-6"><strong>Objectives:</strong> {lab.objectiveIds.map((id, index) => <span key={id}>{index ? ", " : ""}<Link className="underline underline-offset-4" href={`${weekHref}#objective-${id.replace(".", "-")}`}>{id}</Link></span>)}</p>
    </header>
    <nav aria-label="Lab sections" className="flex flex-wrap gap-x-5 gap-y-2 border-y border-border py-3 text-sm">{navigation.map(([id, label]) => <a className="underline-offset-4 hover:underline focus-visible:underline" href={`#${id}`} key={id}>{label}</a>)}</nav>
    <Card id="brief" className="scroll-mt-6"><CardHeader><CardTitle>Brief</CardTitle></CardHeader><CardContent className="space-y-3 leading-7"><p>{lab.summary}</p><p><strong>Topology:</strong> {labTopology[lab.id]}</p><p className="text-sm text-muted-foreground">This is a curriculum brief. Exact device models, interface assignments, addressing, and build steps have not been published or tested for this workspace. Consult the source references before building.</p></CardContent></Card>
    <Card id="tasks" className="scroll-mt-6"><CardHeader><CardTitle>Tasks</CardTitle></CardHeader><CardContent className="space-y-4"><p className="text-sm text-muted-foreground">Use these outcomes to plan the lab. They are not a complete executable walkthrough.</p><ul className="list-disc space-y-2 pl-5 leading-7"><li>{lab.summary}</li>{labExtraRequirements[lab.id]?.map((item) => <li key={item}>{item}</li>)}</ul></CardContent></Card>
    <Card id="verification" className="scroll-mt-6"><CardHeader><CardTitle>Verification</CardTitle></CardHeader><CardContent className="space-y-4"><p>Record output and test results for each required item. Check permitted and denied behavior where the scenario calls for it.</p><ul className="list-disc space-y-2 pl-5 leading-7">{lab.evidence.required.map((item) => <li key={item}>{item}</li>)}</ul><p className="text-sm text-muted-foreground">These are evidence requirements, not claims that a command or simulator feature has passed a platform test.</p></CardContent></Card>
    <Card id="fault" className="scroll-mt-6"><CardHeader><CardTitle>Fault exercise</CardTitle></CardHeader><CardContent className="space-y-3 leading-7"><p>{lab.evidence.fault}</p><p>Record the symptom, your diagnosis, the evidence used to identify it, the repair, and a repeat check of expected behavior.</p></CardContent></Card>
    <Card id="record-evidence" className="scroll-mt-6"><CardHeader><CardTitle>Record evidence</CardTitle></CardHeader><CardContent>{loadError ? <div role="alert" className="flex flex-wrap items-center gap-4"><p>Saved evidence is unavailable. Retry before editing so an existing record is not overwritten.</p><RetryButton /></div> : <LabEvidenceForm key={lab.id} lab={lab} initialRow={saved} />}</CardContent></Card>
    <section aria-labelledby="lab-sources" className="space-y-3"><h2 className="text-xl font-semibold" id="lab-sources">Source references</h2><ul className="list-disc space-y-2 pl-5 text-sm leading-6">{lab.sourceLocators.map((locator) => {
      const source = curriculum.sources.find((item) => item.id === locator.sourceId)
      const url = source && "url" in source ? source.url : source && "path" in source && source.path.startsWith("docs/") ? `https://github.com/kriezer12/CCNA-Reviewer/blob/main/${source.path}` : null
      return <li key={`${locator.sourceId}-${locator.locator}`}>{url ? <a className="underline underline-offset-4" href={url} rel="noreferrer" target="_blank">{source?.title ?? locator.sourceId}</a> : source?.title ?? locator.sourceId} · {locator.locator}</li>
    })}</ul></section>
  </div>
}
