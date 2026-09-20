import { Card, CardContent } from "@/components/ui/card"
import { RetryButton } from "@/components/dashboard/retry-button"

export function DashboardDataError() {
  return (
    <Card className="border-destructive/50 bg-destructive/5">
      <CardContent className="flex items-center justify-between gap-4 pt-6">
        <p className="text-sm text-destructive" role="alert">Saved study data is unavailable. Retry to load the latest state.</p>
        <RetryButton />
      </CardContent>
    </Card>
  )
}
