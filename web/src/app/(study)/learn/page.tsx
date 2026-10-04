import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { curriculum } from "@/content/curriculum"
import {
  categoriesForObjective,
  findGuides,
  learningCategories,
  studyGuides,
} from "@/content/learning"
import { requireOwner } from "@/lib/supabase/auth"
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header"
import { LibraryFilters } from "@/components/learning/library-filters"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { buttonVariants } from "@/components/ui/button"

export const dynamic = "force-dynamic"
type Params = Promise<Record<string, string | string[] | undefined>>
export default async function LearnPage({
  searchParams,
}: {
  searchParams: Params
}) {
  await requireOwner()
  const params = await searchParams
  const value = (key: string) =>
    typeof params[key] === "string" && params[key] !== "all"
      ? (params[key] as string)
      : ""
  const q = value("q"),
    domain = value("domain"),
    category = value("category")
  const guides = findGuides({ q, domain, category })
  return (
    <>
      <DashboardPageHeader
        eyebrow="Learning library / understand the why"
        title="One objective. A clearer picture."
        description="Short original guides, worked examples, and recall checks grounded in your Official Cert Guides. Read here, then use the books for depth and the labs for evidence."
      >
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{studyGuides.length} guides</Badge>
          <Badge variant="outline">
            {learningCategories.length} categories
          </Badge>
        </div>
      </DashboardPageHeader>
      <Card>
        <CardHeader>
          <CardTitle>What would you like to understand?</CardTitle>
          <CardDescription>
            Search by objective, subject, or key term.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LibraryFilters
            key={`${q}-${domain}-${category}`}
            q={q}
            domain={domain}
            category={category}
            domains={curriculum.domains.map(({ id, title }) => ({ id, title }))}
            categories={learningCategories.map(({ id, title }) => ({
              id,
              title,
            }))}
          />
        </CardContent>
      </Card>
      <section aria-labelledby="guide-results" className="flex flex-col gap-4">
        <h2 id="guide-results" className="text-xl font-semibold">
          {guides.length} {guides.length === 1 ? "guide" : "guides"} found
        </h2>
        {guides.length ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {guides.map((guide) => {
              const objective = curriculum.objectives.find(
                (item) => item.id === guide.objectiveId,
              )!
              return (
                <Card
                  key={guide.objectiveId}
                  style={{
                    contentVisibility: "auto",
                    containIntrinsicSize: "auto 350px",
                  }}
                >
                  <CardHeader>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Objective {objective.id}</Badge>
                      <span className="text-xs text-muted-foreground">
                        {
                          curriculum.domains.find(
                            (domain) => domain.id === objective.domainId,
                          )?.title
                        }
                      </span>
                    </div>
                    <CardTitle>
                      <Link
                        className="underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-ring"
                        href={`/learn/${objective.id}`}
                      >
                        {objective.title}
                      </Link>
                    </CardTitle>
                    <CardDescription className="text-base leading-7">
                      {guide.summary}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4">
                    <p className="text-sm text-muted-foreground">
                      {categoriesForObjective(objective.id)
                        .map((item) => item.title)
                        .join(" · ")}
                    </p>
                    <Link
                      className={buttonVariants({
                        className: "min-h-11 w-fit",
                        variant: "outline",
                      })}
                      href={`/learn/${objective.id}`}
                    >
                      Read guide{" "}
                      <ArrowUpRight aria-hidden="true" data-icon="inline-end" />
                    </Link>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>No matching guides</CardTitle>
              <CardDescription>
                Try a shorter search or reset the filters. Unknown
                domain/category selections have no matches.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link
                className={buttonVariants({
                  variant: "outline",
                  className: "min-h-11",
                })}
                href="/learn"
              >
                Show all guides
              </Link>
            </CardContent>
          </Card>
        )}
      </section>
    </>
  )
}
