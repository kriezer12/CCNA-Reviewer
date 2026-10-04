import { cn } from "cn"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("max-w-full animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }
