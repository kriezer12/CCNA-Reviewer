import {
  Command,
} from "lucide-react"

import { Separator } from "@/components/ui/separator"
import { LogoutButton } from "@/components/logout-button"
import { DashboardNavigation } from "@/components/dashboard/dashboard-navigation"

interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-[1440px] flex-col lg:flex-row">
        <aside className="hidden w-64 shrink-0 border-r border-border bg-card lg:flex lg:flex-col">
          <Brand />
          <Separator />
          <DashboardNavigation orientation="vertical" />
          <ExamTarget />
        </aside>

        <section className="flex min-w-0 flex-1 flex-col">
          <header className="flex min-h-20 items-center justify-between border-b border-border px-4 py-4 sm:px-8 lg:px-10">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground lg:hidden">
                <Command className="size-4" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">CCNA v1.1 / study workspace</span>
                <span className="text-sm font-medium">Your learning progress, in one place.</span>
              </div>
            </div>
            <LogoutButton />
          </header>

          <div className="border-b border-border px-4 py-3 lg:hidden">
            <DashboardNavigation orientation="horizontal" />
          </div>

          <div className="flex flex-1 flex-col gap-8 px-4 py-8 sm:px-8 lg:gap-10 lg:px-10 lg:py-12">
            {children}
          </div>
        </section>
      </div>
    </main>
  )
}

function Brand() {
  return (
    <div className="flex h-20 items-center gap-3 px-6">
      <div className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
        <Command className="size-4" />
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="font-mono text-xs font-semibold tracking-[0.14em]">CCNA / REVIEWER</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">v1.1 study system</span>
      </div>
    </div>
  )
}

function ExamTarget() {
  return (
    <div className="halftone m-4 flex flex-col gap-3 rounded-lg border border-border p-4">
      <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Exam target</span>
      <span className="font-mono text-lg font-semibold">JAN 25–31, 2027</span>
      <span className="text-xs leading-5 text-muted-foreground">18 weeks of focused practice before the v1.1 window closes.</span>
    </div>
  )
}
