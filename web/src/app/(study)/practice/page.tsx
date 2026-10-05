import { randomUUID } from "node:crypto"
import { curriculum } from "@/content/curriculum"
import { learningCategories } from "@/content/learning/categories"
import { practiceQuestions } from "@/content/practice"
import { commandDrills } from "@/content/command-drills"
import { matchingQuestions, selectPracticeSession } from "@/lib/practice-model"
import { requireOwner } from "@/lib/supabase/auth"
import { createClient } from "@/lib/supabase/server"
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header"
import { PracticeSession } from "@/components/learning/practice-session"
import { FilterSelect } from "@/components/learning/filter-select"
import { FieldGroup } from "@/components/ui/field"
import { Button, buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"

export const dynamic = "force-dynamic"
export default async function PracticePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const owner = await requireOwner()
  const params = await searchParams
  const get = (key: string) =>
    typeof params[key] === "string" && params[key] !== "all"
      ? (params[key] as string)
      : ""
  const filters = {
    domain: get("domain"),
    category: get("category"),
    objective: get("objective"),
    difficulty: get("difficulty"),
  }
  const mode = get("mode") || "topic",
    feedback = get("feedback") || "guided",
    count = Number(get("count") || 10)
  const valid =
    ["topic", "mixed"].includes(mode) &&
    ["guided", "checkpoint"].includes(feedback) &&
    [5, 10, 20].includes(count)
  const seed = get("seed").slice(0, 100) || "first-session"
  const requestedQuestion = get("question")
  const matching = matchingQuestions(practiceQuestions, filters)
  const targetQuestion = matching.find(item => item.id === requestedQuestion)
  const questions = valid
    ? targetQuestion ? [targetQuestion] : requestedQuestion ? [] : selectPracticeSession(
        practiceQuestions,
        filters,
        count,
        seed,
        mode === "mixed",
      )
    : []
  const supabase = await createClient()
  const { data: savedBookmarks } = questions.length
    ? await supabase.from("bookmarks").select("resource_id").eq("user_id", owner.id)
      .eq("resource_type", "question").in("resource_id", questions.map(item => item.id))
    : { data: [] }
  const bookmarkedQuestions = new Set((savedBookmarks ?? []).map(item => item.resource_id))
  const newParams = new URLSearchParams({
    ...filters,
    mode,
    feedback,
    count: String(count),
    seed: randomUUID(),
  })
  return (
    <>
      <DashboardPageHeader
        eyebrow="Practice / turn recall into understanding"
        title="Try it. Explain it. Try again."
        description="Work through original scenarios with useful feedback. Focus on one objective or mix domains, then review the guides and apply what you learned."
      >
        <Badge className="w-fit" variant="outline">
          {practiceQuestions.length} practice questions
        </Badge>
      </DashboardPageHeader>
      <Card>
        <CardHeader>
          <CardTitle>Build a practice session</CardTitle>
          <CardDescription className="text-base leading-7">
            {mode === "mixed"
              ? "Mixed review uses 20 questions across all six domains; topic and difficulty filters apply only to focused practice."
              : `${matching.length} questions match these filters.`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action="/practice" method="get" className="flex flex-col gap-4">
            <FieldGroup className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <FilterSelect
                name="domain"
                label="Domains"
                value={filters.domain}
                items={curriculum.domains}
              />
              <FilterSelect
                name="category"
                label="Categories"
                value={filters.category}
                items={learningCategories}
              />
              <FilterSelect
                name="objective"
                label="Objectives"
                value={filters.objective}
                items={curriculum.objectives.map((item) => ({
                  id: item.id,
                  title: `${item.id} · ${item.title}`,
                }))}
              />
              <FilterSelect
                name="difficulty"
                label="Difficulties"
                value={filters.difficulty}
                items={[
                  { id: "foundation", title: "Foundation" },
                  { id: "applied", title: "Applied" },
                  { id: "challenge", title: "Challenge" },
                ]}
              />
              <FilterSelect
                name="mode"
                allowAll={false}
                label="Mode"
                value={mode}
                items={[
                  { id: "topic", title: "Topic practice" },
                  { id: "mixed", title: "Mixed review" },
                ]}
              />
              <FilterSelect
                name="feedback"
                allowAll={false}
                label="Feedback"
                value={feedback}
                items={[
                  { id: "guided", title: "Guided: feedback after each answer" },
                  {
                    id: "checkpoint",
                    title: "Checkpoint: feedback after submission",
                  },
                ]}
              />
              <FilterSelect
                name="count"
                allowAll={false}
                label="Question count"
                value={String(count)}
                items={[5, 10, 20].map((id) => ({
                  id: String(id),
                  title: `${id} questions`,
                }))}
              />
            </FieldGroup>
            <div className="flex flex-wrap gap-3">
              <Button className="min-h-11" type="submit">
                Apply session settings
              </Button>
              <Link
                className={buttonVariants({
                  variant: "outline",
                  className: "min-h-11",
                })}
                href="/practice"
              >
                Reset filters
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
      {!valid ? (
        <p role="alert" className="text-base text-destructive">
          These session settings are invalid. Reset the filters to recover.
        </p>
      ) : null}
      <PracticeSession
        key={JSON.stringify([filters, mode, feedback, count, seed])}
        initialQuestions={questions}
        requestedCount={requestedQuestion ? 1 : mode === "mixed" ? 20 : count}
        feedback={feedback === "checkpoint" ? "checkpoint" : "guided"}
        newSessionHref={`/practice?${newParams}`}
        resources={Object.fromEntries(
          questions.map((question) => [
            question.id,
            {
              bookmarked: bookmarkedQuestions.has(question.id),
              links: [
                ...commandDrills
                  .filter((drill) =>
                    drill.objectiveIds.some((id) =>
                      question.objectiveIds.includes(id),
                    ),
                  )
                  .map((drill) => ({
                    title: `Drill: ${drill.title}`,
                    href: `/command-drills?drill=${encodeURIComponent(drill.id)}`,
                  })),
                ...curriculum.labs
                  .filter((lab) =>
                    lab.objectiveIds.some((id) =>
                      question.objectiveIds.includes(id),
                    ),
                  )
                  .map((lab) => ({
                    title: `Lab ${lab.id}: ${lab.title}`,
                    href: `/labs/${lab.id}`,
                  })),
              ],
              sources: question.sourceLocators.map((source) => ({
                title:
                  curriculum.sources.find((item) => item.id === source.sourceId)
                    ?.title ?? source.sourceId,
                locator: source.locator,
              })),
            },
          ]),
        )}
      />
    </>
  )
}
