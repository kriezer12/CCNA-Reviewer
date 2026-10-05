import Link from "next/link"
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function ExerciseFrame({
  title,
  description,
  children,
  sources,
}: {
  title: string
  description: string
  children: React.ReactNode
  sources: readonly { title: string; locator: string; url?: string }[]
}) {
  return (
    <>
      <nav aria-label="Breadcrumb" className="text-sm">
        <Link href="/exercises" className="underline underline-offset-4">
          Exercises
        </Link>{" "}
        / {title}
      </nav>
      <DashboardPageHeader
        eyebrow="Apply your understanding"
        title={title}
        description={description}
      />
      {children}
      <Card>
        <CardHeader>
          <CardTitle>Continue in your references</CardTitle>
          <CardDescription>
            Original practice based on our study material. Your exercise results
            are temporary and do not record lesson understanding, lab evidence,
            quiz attempts, study time, or streak.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-col gap-3 text-sm">
            {sources.map((source) => (
              <li key={`${source.title}-${source.locator}`}>
                {source.url ? (
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
                — {source.locator}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </>
  )
}
