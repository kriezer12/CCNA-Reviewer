"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { RecallCheck } from "@/content/learning/types"

export function RecallChecks({ checks }: { checks: readonly RecallCheck[] }) {
  const [revealed, setRevealed] = useState<readonly number[]>([])
  return (
    <div className="flex flex-col gap-4">
      {checks.map((check, index) => (
        <Card key={check.prompt}>
          <CardHeader>
            <CardTitle>
              {index + 1}. {check.prompt}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Button
              className="min-h-11 w-fit"
              variant="outline"
              aria-expanded={revealed.includes(index)}
              onClick={() =>
                setRevealed((current) =>
                  current.includes(index)
                    ? current.filter((item) => item !== index)
                    : [...current, index],
                )
              }
            >
              {revealed.includes(index) ? "Hide answer" : "Reveal answer"}{" "}
              {index + 1}
            </Button>
            {revealed.includes(index) ? (
              <p className="text-base leading-7" role="status">
                {check.answer}
              </p>
            ) : null}
          </CardContent>
        </Card>
      ))}
      <p className="text-sm text-muted-foreground">
        Recall checks are temporary self-practice. They do not record a score or
        change your lesson understanding.
      </p>
    </div>
  )
}
