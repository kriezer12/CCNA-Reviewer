import { Skeleton } from "@/components/ui/skeleton"

export default function StudyLoading() {
  return (
    <div aria-busy="true" aria-label="Loading study workspace" data-testid="route-loading" role="status" className="flex flex-col gap-8">
      <span className="sr-only">Loading study workspace</span>
      <section className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-3 w-36" />
          <Skeleton className="h-12 w-full max-w-2xl" />
          <Skeleton className="h-5 w-full max-w-xl" />
          <Skeleton className="h-5 w-3/4 max-w-lg" />
        </div>
        <div className="flex gap-3">
          <Skeleton className="h-9 w-32" />
          <Skeleton className="h-9 w-28" />
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2" aria-hidden="true">
        <div className="flex min-h-36 flex-col gap-5 rounded-xl border border-border bg-card p-5">
          <Skeleton className="h-3 w-32" />
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-2 w-full" />
        </div>
        <div className="flex min-h-36 flex-col gap-5 rounded-xl border border-border bg-card p-5">
          <Skeleton className="h-3 w-28" />
          <Skeleton className="h-7 w-56" />
          <Skeleton className="h-4 w-full" />
        </div>
      </section>
    </div>
  )
}
