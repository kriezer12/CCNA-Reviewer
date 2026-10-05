import Link from "next/link"
import { ArrowLeft, ArrowUpRight, Terminal } from "lucide-react"

import { CommandDrillPractice } from "@/components/command-drills/command-drill-practice"
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { commandDrills } from "@/content/command-drills"
import { curriculum } from "@/content/curriculum"
import { requireOwner } from "@/lib/supabase/auth"
import { FilterSelect } from "@/components/learning/filter-select"
import { learningCategories } from "@/content/learning/categories"
import { FieldGroup } from "@/components/ui/field"
import { Button } from "@/components/ui/button"

export const dynamic = "force-dynamic"

export default async function CommandDrillsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  await requireOwner()
  const params = await searchParams
  const query = params.drill
  const domain =
    typeof params.domain === "string" && params.domain !== "all"
      ? params.domain
      : ""
  const category =
    typeof params.category === "string" && params.category !== "all"
      ? params.category
      : ""
  const filtered = commandDrills.filter(
    (drill) =>
      (!domain ||
        drill.objectiveIds.some((id) =>
          curriculum.objectives.some(
            (o) => o.id === id && o.domainId === domain,
          ),
        )) &&
      (!category ||
        drill.objectiveIds.some((id) =>
          learningCategories
            .find((c) => c.id === category)
            ?.objectiveIds.includes(id),
        )),
  )
  const drillId = Array.isArray(query) ? query[0] : query
  const index = commandDrills.findIndex((item) => item.id === drillId)
  const selected = index >= 0 ? commandDrills[index] : undefined
  const next = selected
    ? commandDrills[(index + 1) % commandDrills.length]
    : undefined
  const lab = selected?.labId
    ? curriculum.labs.find((item) => item.id === selected.labId)
    : undefined
  const sources =
    selected?.sourceLocators.map((locator) => {
      const source = curriculum.sources.find(
        (item) => item.id === locator.sourceId,
      )
      return {
        title: source?.title ?? locator.sourceId,
        locator: locator.locator,
        url: source && "url" in source ? source.url : undefined,
      }
    }) ?? []

  return (
    <>
      <DashboardPageHeader
        description="Read a scenario, recall a command and its evidence, then reveal an illustrative answer."
        eyebrow="IOS retrieval / before the lab"
        title="Short drills. Better verification."
      >
        <Badge className="w-fit" variant="secondary">
          {commandDrills.length} drills
        </Badge>
      </DashboardPageHeader>

      {drillId === undefined ? (
        <Card>
          <CardHeader>
            <CardTitle>Choose your warm-up</CardTitle>
            <CardDescription className="text-base">
              {filtered.length} matching drills. These self-checks help you
              prepare for a lab.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              action="/command-drills"
              method="get"
              className="flex flex-col gap-4"
            >
              <FieldGroup className="grid gap-4 md:grid-cols-2">
                <FilterSelect
                  label="Domains"
                  name="domain"
                  value={domain}
                  items={curriculum.domains}
                />
                <FilterSelect
                  label="Categories"
                  name="category"
                  value={category}
                  items={learningCategories}
                />
              </FieldGroup>
              <div className="flex flex-wrap gap-3">
                <Button className="min-h-11" type="submit">
                  Find drills
                </Button>
                <Link
                  className={buttonVariants({
                    variant: "outline",
                    className: "min-h-11",
                  })}
                  href="/command-drills"
                >
                  Reset filters
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : null}
      {drillId === undefined && filtered.length === 0 ? (
        <Card role="status">
          <CardHeader>
            <CardTitle>No drills match</CardTitle>
            <CardDescription className="text-base">
              Try a different domain or category, or reset your filters.
            </CardDescription>
          </CardHeader>
        </Card>
      ) : null}
      {drillId === undefined ? (
        <section
          aria-label="Command drills"
          className="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
        >
          {filtered.map((drill) => (
            <Card key={drill.id} className="min-w-0">
              <CardHeader>
                <div className="flex items-center justify-between gap-3">
                  <Badge variant="outline">{drill.id}</Badge>
                  <Terminal
                    aria-hidden="true"
                    className="size-4 text-muted-foreground"
                  />
                </div>
                <h2 className="text-xl font-semibold">{drill.title}</h2>
                <CardDescription className="text-base leading-6">
                  {drill.scenario}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <p className="text-sm text-muted-foreground">
                  Objectives {drill.objectiveIds.join(", ")} ·{" "}
                  {drill.durationMinutes}-minute suggested warm-up
                </p>
                <Link
                  className={buttonVariants({
                    className: "min-h-11 w-fit",
                    variant: "outline",
                  })}
                  href={`/command-drills?drill=${encodeURIComponent(drill.id)}`}
                >
                  Open {drill.title}{" "}
                  <ArrowUpRight aria-hidden="true" data-icon="inline-end" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </section>
      ) : selected && next ? (
        <div className="flex min-w-0 flex-col gap-5">
          <Link
            className={buttonVariants({
              className: "min-h-11 w-fit",
              variant: "ghost",
            })}
            href="/command-drills"
          >
            <ArrowLeft aria-hidden="true" data-icon="inline-start" /> All
            command drills
          </Link>
          <CommandDrillPractice
            key={selected.id}
            drill={selected}
            nextId={next.id}
            labTitle={lab?.title}
            sources={sources}
          />
        </div>
      ) : (
        <Card role="status">
          <CardHeader>
            <CardTitle>Drill not found</CardTitle>
            <CardDescription className="text-base">
              That drill ID is not in the current command drill list.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              className={buttonVariants({
                className: "min-h-11",
                variant: "outline",
              })}
              href="/command-drills"
            >
              Browse command drills{" "}
              <ArrowUpRight aria-hidden="true" data-icon="inline-end" />
            </Link>
          </CardContent>
        </Card>
      )}
    </>
  )
}
