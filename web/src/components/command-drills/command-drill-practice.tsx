"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { CommandDrill } from "@/content/command-drills"

interface SourceReference {
  readonly title: string
  readonly locator: string
  readonly url?: string
}

export function CommandDrillPractice({
  drill,
  nextId,
  labTitle,
  sources,
}: {
  drill: CommandDrill
  nextId: string
  labTitle?: string
  sources: readonly SourceReference[]
}) {
  const [enteredCommand, setEnteredCommand] = useState("")
  const [revealed, setRevealed] = useState(false)

  return (
    <article
      className="grid min-w-0 gap-5 lg:grid-cols-[minmax(0,1fr)_280px]"
      aria-labelledby="drill-heading"
    >
      <Card className="min-w-0">
        <CardHeader className="gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">{drill.id}</Badge>
            <span className="text-sm text-muted-foreground">
              Objectives {drill.objectiveIds.join(", ")} ·{" "}
              {drill.durationMinutes}-minute suggested warm-up
            </span>
          </div>
          <h2 className="text-2xl font-semibold" id="drill-heading">
            {drill.title}
          </h2>
          <CardDescription className="text-base leading-7">
            {drill.scenario}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex min-w-0 flex-col gap-5">
          <p className="text-base leading-7">
            Which command would you use? What evidence would you expect in its
            output?
          </p>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium" htmlFor="drill-command">
              Your command (optional)
            </label>
            <input
              autoCapitalize="off"
              autoComplete="off"
              className="min-h-11 w-full min-w-0 rounded-lg border border-input bg-background px-3 font-mono text-base outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              id="drill-command"
              name="drill-command"
              onChange={(event) => setEnteredCommand(event.target.value)}
              spellCheck={false}
              type="text"
              value={enteredCommand}
            />
            <p className="text-sm text-muted-foreground">
              Mental recall is fine. Your input and reveal reset on refresh or
              when you change drills; nothing is saved or graded.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {!revealed ? (
              <Button className="min-h-11" onClick={() => setRevealed(true)}>
                Reveal answer
              </Button>
            ) : (
              <Button
                className="min-h-11"
                onClick={() => {
                  setEnteredCommand("")
                  setRevealed(false)
                }}
                variant="outline"
              >
                Try again
              </Button>
            )}
            <Link
              className={buttonVariants({
                className: "min-h-11",
                variant: "outline",
              })}
              href={`/command-drills?drill=${encodeURIComponent(nextId)}`}
            >
              Next drill{" "}
              <ArrowUpRight aria-hidden="true" data-icon="inline-end" />
            </Link>
          </div>
          {revealed ? (
            <section
              aria-labelledby="answer-heading"
              className="flex min-w-0 flex-col gap-4 border-t border-border pt-5"
            >
              <h3 className="text-xl font-semibold" id="answer-heading">
                Answer and evidence
              </h3>
              <p role="status" className="sr-only">
                Answer and evidence revealed.
              </p>
              <div className="flex min-w-0 flex-col gap-2">
                <span className="text-sm font-medium">Canonical command</span>
                <div className="max-w-full overflow-x-auto rounded-lg bg-muted p-4">
                  <code className="block w-max min-w-full whitespace-pre font-mono text-sm select-text">
                    {drill.command}
                  </code>
                </div>
              </div>
              <p className="text-base leading-7">
                <strong>Verify:</strong> {drill.verify}
              </p>
              <div className="flex min-w-0 flex-col gap-2">
                <span className="text-sm font-medium">
                  Illustrative output — not run against a real device
                </span>
                <pre className="max-w-full overflow-x-auto rounded-lg bg-muted p-4 font-mono text-sm leading-6 select-text">
                  <code>{drill.output}</code>
                </pre>
              </div>
              <p className="text-base leading-7">{drill.outputExplanation}</p>
              <p className="text-sm text-muted-foreground">
                Compare your recall with this example. IOS abbreviations and
                other valid commands can also be appropriate; this drill does
                not grade them.
              </p>
            </section>
          ) : null}
        </CardContent>
      </Card>
      <aside className="min-w-0">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Study references</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 text-sm leading-6">
            <p>
              <strong>Focus:</strong> {drill.objective}
            </p>
            <ul className="list-disc space-y-1 pl-5">
              {sources.map((source) => (
                <li key={`${source.title}-${source.locator}`}>
                  {source.url ? (
                    <a
                      className="underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-ring"
                      href={source.url}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {source.title}
                    </a>
                  ) : (
                    source.title
                  )}{" "}
                  · {source.locator}
                </li>
              ))}
            </ul>
            {drill.objectiveIds.map((id) => (
              <Link
                key={id}
                className={buttonVariants({
                  className: "min-h-11 whitespace-normal",
                  variant: "outline",
                })}
                href={`/learn/${id}`}
              >
                Read guide {id}
              </Link>
            ))}
            {drill.labId && labTitle ? (
              <Link
                className={buttonVariants({
                  className: "min-h-11 whitespace-normal",
                  variant: "outline",
                })}
                href={`/labs/${drill.labId}`}
              >
                <span className="min-w-0 flex-1 break-words">
                  Open {drill.labId}: {labTitle}
                </span>{" "}
                <ArrowUpRight aria-hidden="true" data-icon="inline-end" />
              </Link>
            ) : null}
          </CardContent>
        </Card>
      </aside>
    </article>
  )
}
