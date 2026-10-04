import Link from "next/link"
import { requireOwner } from "@/lib/supabase/auth"
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { buttonVariants } from "@/components/ui/button"

export const dynamic = "force-dynamic"

export default async function ExercisesPage() {
  await requireOwner()
  return (
    <>
      <DashboardPageHeader
        eyebrow="Apply what you learn"
        title="Interactive exercises"
        description="Make a networking decision, then inspect the reasoning. These original exercises support your guides and practical labs."
      />
      <Card>
        <CardHeader>
          <CardTitle>IPv4 subnetting</CardTitle>
          <CardDescription>
            Calculate network, broadcast, mask, and host capacity across twelve
            original /24–/30 cases. Get feedback on each field and see the
            worked solution.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link
            href="/exercises/subnetting"
            className={buttonVariants({ className: "min-h-11" })}
          >
            Start subnetting practice
          </Link>
        </CardContent>
      </Card>
    </>
  )
}
