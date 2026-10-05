import { notFound } from "next/navigation"
import { curriculum } from "@/content/curriculum"
import { commandDrills } from "@/content/command-drills"
import { categoriesForObjective, guideForObjective } from "@/content/learning"
import { requireOwner } from "@/lib/supabase/auth"
import { loadDashboardModel } from "@/lib/dashboard-model"
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header"
import { DashboardDataError } from "@/components/dashboard/dashboard-data-error"
import { ObjectiveProgressControl } from "@/components/dashboard/objective-progress-control"
import { RecallChecks } from "@/components/learning/recall-checks"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookmarkToggle } from "@/components/learning/bookmark-toggle"
import { createClient } from "@/lib/supabase/server"
import Link from "next/link"

export const dynamic = "force-dynamic"
const sections = [
  ["explanation", "Understand"],
  ["terms", "Key terms"],
  ["example", "Worked example"],
  ["mistakes", "Common mistakes"],
  ["recall", "Recall checks"],
  ["apply", "Apply it"],
  ["sources", "References"],
] as const
export default async function GuidePage({
  params,
}: {
  params: Promise<{ objectiveId: string }>
}) {
  const user = await requireOwner()
  const { objectiveId } = await params
  const guide = guideForObjective(objectiveId)
  const objective = curriculum.objectives.find(
    (item) => item.id === objectiveId,
  )
  if (!guide || !objective) notFound()
  const supabase = await createClient()
  const { data: bookmark } = await supabase.from("bookmarks").select("resource_id")
    .eq("user_id", user.id).eq("resource_type", "guide").eq("resource_id", objective.id).maybeSingle()
  const model = await loadDashboardModel(user.id, {
    topics: true,
    labs: false,
    sessions: false,
    attempts: false,
  })
  const index = curriculum.objectives.findIndex(
    (item) => item.id === objective.id,
  )
  const previous = curriculum.objectives[index - 1],
    next = curriculum.objectives[index + 1]
  const drills = commandDrills.filter((drill) =>
    drill.objectiveIds.includes(objective.id),
  )
  const labs = curriculum.labs.filter((lab) =>
    lab.objectiveIds.includes(objective.id),
  )
  return (
    <>
      <nav aria-label="Breadcrumb" className="text-sm">
        <Link className="underline underline-offset-4" href="/learn">
          Learning library
        </Link>{" "}
        / Objective {objective.id}
      </nav>
      <DashboardPageHeader
        eyebrow={`Objective ${objective.id} / ${curriculum.domains.find((item) => item.id === objective.domainId)?.title}`}
        title={objective.title}
        description={guide.summary}
      >
        <div className="flex flex-wrap items-center gap-3">
          <BookmarkToggle resourceType="guide" resourceId={objective.id} saved={Boolean(bookmark)} />
          <Link href="/bookmarks" className={buttonVariants({variant:"outline", className:"min-h-11"})}>My bookmarks</Link>
        </div>
        <div className="flex flex-wrap gap-2">
          {categoriesForObjective(objective.id).map((category) => (
            <Badge variant="outline" key={category.id}>
              {category.title}
            </Badge>
          ))}
        </div>
      </DashboardPageHeader>
      <div className="grid min-w-0 gap-8 lg:grid-cols-[200px_minmax(0,1fr)]">
        <aside>
          <nav
            aria-label="On this guide"
            className="flex flex-wrap gap-3 lg:sticky lg:top-6 lg:flex-col"
          >
            {sections.map(([id, label]) => (
              <a
                className="min-h-11 content-center text-sm underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-ring"
                key={id}
                href={`#${id}`}
              >
                {label}
              </a>
            ))}
          </nav>
        </aside>
        <article className="flex min-w-0 flex-col gap-8">
          <section id="explanation" className="scroll-mt-6 flex flex-col gap-5">
            <h2 className="text-2xl font-semibold">Understand the objective</h2>
            {guide.sections.map((section) => (
              <div key={section.title} className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold">{section.title}</h3>
                <p className="text-base leading-8">{section.body}</p>
              </div>
            ))}
          </section>
          <section id="terms" className="scroll-mt-6 flex flex-col gap-3">
            <h2 className="text-2xl font-semibold">Key terms</h2>
            <dl className="grid gap-4 sm:grid-cols-2">
              {guide.terms.map((term) => (
                <div
                  className="rounded-lg border border-border p-4"
                  key={term.title}
                >
                  <dt className="font-semibold">{term.title}</dt>
                  <dd className="mt-2 text-base leading-7 text-muted-foreground">
                    {term.body}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
          <section id="example" className="scroll-mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Worked example: {guide.example.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base leading-8">{guide.example.body}</p>
              </CardContent>
            </Card>
          </section>
          <section id="mistakes" className="scroll-mt-6 flex flex-col gap-3">
            <h2 className="text-2xl font-semibold">Common mistakes</h2>
            <ul className="flex list-disc flex-col gap-3 pl-5 text-base leading-7">
              {guide.mistakes.map((mistake) => (
                <li key={mistake}>{mistake}</li>
              ))}
            </ul>
          </section>
          <section id="recall" className="scroll-mt-6 flex flex-col gap-4">
            <h2 className="text-2xl font-semibold">
              Close the notes. Try recalling.
            </h2>
            <RecallChecks checks={guide.recall} />
          </section>
          <section id="apply" className="scroll-mt-6 flex flex-col gap-4">
            <h2 className="text-2xl font-semibold">Apply it</h2>
            <Link
              className={buttonVariants({ className: "min-h-11 w-fit" })}
              href={`/practice?objective=${objective.id}`}
            >
              Practice objective {objective.id}
            </Link>
            <div className="flex flex-col gap-3">
              {objective.id === "1.6" ? (
                <Link className="min-h-11 content-center underline underline-offset-4" href="/exercises/subnetting">
                  Exercise: IPv4 subnetting
                </Link>
              ) : null}
              {drills.map((drill) => (
                <Link
                  className="min-h-11 content-center underline underline-offset-4"
                  href={`/command-drills?drill=${drill.id}`}
                  key={drill.id}
                >
                  Drill: {drill.title}
                </Link>
              ))}
              {labs.map((lab) => (
                <Link
                  className="min-h-11 content-center underline underline-offset-4"
                  href={`/labs/${lab.id}`}
                  key={lab.id}
                >
                  {lab.id}: {lab.title}
                </Link>
              ))}
            </div>
            <p className="text-sm leading-6 text-muted-foreground">
              Opening these resources creates no completion record. Practical
              evidence still requires the declared lab platform and its
              verification checks.
            </p>
          </section>
          <section id="sources" className="scroll-mt-6 flex flex-col gap-3">
            <h2 className="text-2xl font-semibold">
              Continue in your references
            </h2>
            <p className="text-base leading-7">
              This original guide supplements the source material. Use the named
              chapters for deeper study.
            </p>
            <ul className="flex list-disc flex-col gap-3 pl-5 text-sm leading-6">
              {guide.sourceLocators.map((locator) => {
                const source = curriculum.sources.find(
                  (item) => item.id === locator.sourceId,
                )!
                return (
                  <li key={`${locator.sourceId}-${locator.locator}`}>
                    {"url" in source ? (
                      <a
                        className="underline underline-offset-4"
                        href={source.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {source.title}
                      </a>
                    ) : (
                      source.title
                    )}{" "}
                    — {locator.locator}
                  </li>
                )
              })}
            </ul>
          </section>
          {model.dataError ? (
            <DashboardDataError />
          ) : (
            <ObjectiveProgressControl
              objectives={[objective]}
              initialRows={model.data.topics}
            />
          )}
          <nav
            aria-label="Adjacent objectives"
            className="flex flex-wrap justify-between gap-3"
          >
            {previous ? (
              <Link
                className={buttonVariants({
                  className: "min-h-11",
                  variant: "outline",
                })}
                href={`/learn/${previous.id}`}
              >
                Previous: {previous.id}
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                className={buttonVariants({
                  className: "min-h-11",
                  variant: "outline",
                })}
                href={`/learn/${next.id}`}
              >
                Next: {next.id}
              </Link>
            ) : null}
          </nav>
        </article>
      </div>
    </>
  )
}
