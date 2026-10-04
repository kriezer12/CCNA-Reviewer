"use client"

import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  evaluateSubnet,
  selectSubnetCase,
  type SubnetAnswers,
  type SubnetCase,
  type SubnetFeedback,
  type SubnetField,
} from "@/lib/exercises/subnet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

const blank: SubnetAnswers = { network: "", broadcast: "", mask: "", hosts: "" }
const labels: Record<SubnetField, string> = {
  network: "Network address",
  broadcast: "Broadcast address",
  mask: "Subnet mask",
  hosts: "Usable host count",
}

export function SubnetTrainer({ item }: { item: SubnetCase }) {
  const [answers, setAnswers] = useState<SubnetAnswers>(blank)
  const [feedback, setFeedback] = useState<SubnetFeedback | null>(null)
  const resultHeading = useRef<HTMLHeadingElement>(null)
  const firstInput = useRef<HTMLInputElement>(null)
  const router = useRouter()

  function check(event: React.FormEvent) {
    event.preventDefault()
    setFeedback(evaluateSubnet(item, answers))
    requestAnimationFrame(() => resultHeading.current?.focus())
  }

  function reset() {
    setAnswers(blank)
    setFeedback(null)
    requestAnimationFrame(() => firstInput.current?.focus())
  }

  function newCase() {
    // Deterministic selection remains reproducible from the URL. Pick a different case.
    let seed = crypto.randomUUID()
    while (selectSubnetCase(seed).id === item.id) seed = crypto.randomUUID()
    router.push(`/exercises/subnetting?seed=${encodeURIComponent(seed)}`)
  }

  return (
    <div className="grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <Card className="min-w-0">
        <CardHeader>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">Objective 1.6</Badge>
            <span className="text-sm text-muted-foreground">
              {item.id} · /24–/30 multiaccess
            </span>
          </div>
          <CardTitle>Find this host&apos;s subnet</CardTitle>
          <CardDescription>
            A host uses{" "}
            <strong className="font-mono text-foreground">
              {item.address}/{item.prefix}
            </strong>
            . Enter the four subnet details before checking your reasoning.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={check} className="flex flex-col gap-5">
            <FieldSet>
              <FieldLegend>Your calculation</FieldLegend>
              <FieldGroup>
                {(Object.keys(labels) as SubnetField[]).map((field) => {
                  const result = feedback?.fields[field]
                  return (
                    <Field key={field} data-invalid={result && !result.correct}>
                      <FieldLabel htmlFor={`subnet-${field}`}>
                        {labels[field]}
                      </FieldLabel>
                      <Input
                        ref={field === "network" ? firstInput : undefined}
                        id={`subnet-${field}`}
                        aria-describedby={`subnet-${field}-help`}
                        aria-invalid={
                          result && !result.correct ? true : undefined
                        }
                        className="min-h-11"
                        inputMode={field === "hosts" ? "numeric" : "decimal"}
                        autoComplete="off"
                        spellCheck={false}
                        value={answers[field]}
                        disabled={feedback !== null}
                        onChange={(event) =>
                          setAnswers((current) => ({
                            ...current,
                            [field]: event.target.value,
                          }))
                        }
                      />
                      <FieldDescription id={`subnet-${field}-help`}>
                        {result ? (
                          result.correct ? (
                            "Correct."
                          ) : (
                            <>
                              {result.valid
                                ? "Review this field. "
                                : "Enter a valid " +
                                  (field === "hosts"
                                    ? "whole-number count. "
                                    : "dotted-decimal address. ")}
                              <span>Expected: {result.expected}</span>
                            </>
                          )
                        ) : field === "hosts" ? (
                          "Count conventional usable hosts, excluding network and broadcast."
                        ) : (
                          "Use four decimal octets separated by dots."
                        )}
                      </FieldDescription>
                    </Field>
                  )
                })}
              </FieldGroup>
            </FieldSet>
            <div className="flex flex-wrap gap-3">
              <Button
                className="min-h-11"
                type="submit"
                disabled={feedback !== null}
              >
                Check answers
              </Button>
              <Button
                className="min-h-11"
                type="button"
                variant="outline"
                onClick={reset}
              >
                Try this case again
              </Button>
              <Button
                className="min-h-11"
                type="button"
                variant="outline"
                onClick={newCase}
              >
                New case
              </Button>
            </div>
            <p role="status" aria-live="polite" className="text-sm">
              {feedback
                ? `${feedback.correctCount} of 4 fields correct. Review the worked solution.`
                : "Answers stay hidden until you check. Refreshing resets this temporary exercise."}
            </p>
          </form>
        </CardContent>
      </Card>
      <Card className="min-w-0">
        <CardHeader>
          <h2
            ref={resultHeading}
            tabIndex={-1}
            className="text-lg font-semibold outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {feedback ? "Worked solution" : "Calculate first, then compare"}
          </h2>
          <CardDescription>
            {feedback
              ? "Follow the prefix, block boundary, and host capacity."
              : "Work out the subnet boundary and mask. Then check all four fields together."}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          {feedback ? (
            <>
              <figure
                className="flex flex-col gap-3"
                aria-label="IPv4 prefix and host bit allocation"
              >
                <div className="grid grid-cols-8 gap-1" aria-hidden="true">
                  {Array.from({ length: 32 }, (_, bit) => (
                    <span
                      key={bit}
                      className={cn(
                        "rounded border border-border p-2 text-center font-mono text-sm",
                        bit < item.prefix ? "bg-secondary" : "bg-background",
                      )}
                    >
                      {bit < item.prefix ? "1" : "0"}
                    </span>
                  ))}
                </div>
                <figcaption className="text-sm">
                  The subnet mask has {item.prefix} leading one bits for the
                  prefix and {feedback.hostBits} zero bits for hosts. It is a
                  32-bit mask, displayed in four rows of eight bits.
                </figcaption>
              </figure>
              <p className="text-base leading-7">{feedback.explanation}</p>
            </>
          ) : (
            <p className="text-base leading-7">
              Start with the prefix length. Find how many host bits remain, the
              block size, and the block containing the given address. The first
              and last addresses have special roles in these ordinary
              multiaccess subnets.
            </p>
          )}
          <p className="text-sm leading-6 text-muted-foreground">
            Scope boundary: /31 point-to-point addressing and /32 host routes
            have different uses. This trainer excludes them; do not apply the
            conventional “subtract two” host rule to those prefixes.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
