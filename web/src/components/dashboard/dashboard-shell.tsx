import Link from "next/link"
import {
  BookOpen,
  Command,
  FlaskConical,
  LayoutDashboard,
  ShieldCheck,
  Terminal,
} from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { LogoutButton } from "@/components/logout-button"
import { cn } from "cn"

type DashboardSection = "dashboard" | "roadmap" | "labs" | "command-drills" | "readiness"

const navigation: Array<{
  key: DashboardSection
  label: string
  href: string
  icon: typeof LayoutDashboard
}> = [
  { key: "dashboard", label: "Dashboard", href: "/", icon: LayoutDashboard },
  { key: "roadmap", label: "Roadmap", href: "/roadmap", icon: BookOpen },
  { key: "labs", label: "Labs", href: "/labs", icon: FlaskConical },
  { key: "command-drills", label: "Command drills", href: "/command-drills", icon: Terminal },
  { key: "readiness", label: "Readiness", href: "/readiness", icon: ShieldCheck },
]

interface DashboardShellProps {
  active: DashboardSection
  userEmail?: string | null
  headerLabel?: string
  children: React.ReactNode
}

export function DashboardShell({ active, userEmail, headerLabel = "CCNA v1.1 / study workspace", children }: DashboardShellProps) {
  const firstName = userEmail?.split("@")[0] ?? "learner"

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-[1440px] flex-col lg:flex-row">
        <aside className="hidden w-64 shrink-0 border-r border-border bg-card lg:flex lg:flex-col">
          <Brand />
          <Separator />
          <Navigation active={active} orientation="vertical" />
          <ExamTarget />
        </aside>

        <section className="flex min-w-0 flex-1 flex-col">
          <header className="flex min-h-20 items-center justify-between border-b border-border px-4 py-4 sm:px-8 lg:px-10">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground lg:hidden">
                <Command className="size-4" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{headerLabel}</span>
                <span className="text-sm font-medium">Welcome back, {firstName}.</span>
              </div>
            </div>
            <LogoutButton />
          </header>

          <div className="border-b border-border px-4 py-3 lg:hidden">
            <Navigation active={active} orientation="horizontal" />
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

function Navigation({ active, orientation }: { active: DashboardSection; orientation: "horizontal" | "vertical" }) {
  return (
    <nav
      aria-label="Main navigation"
      className={cn(
        orientation === "vertical" ? "flex flex-1 flex-col gap-1 p-4" : "flex gap-2 overflow-x-auto pb-1",
      )}
    >
      {navigation.map((item) => {
        const Icon = item.icon
        const isActive = active === item.key
        return (
          <Link
            aria-current={isActive ? "page" : undefined}
            className={buttonVariants({
              className: cn(
                orientation === "vertical" ? "justify-start gap-3" : "shrink-0 gap-2",
                !isActive && "text-muted-foreground",
              ),
              variant: isActive ? "secondary" : "ghost",
            })}
            href={item.href}
            key={item.key}
          >
            <Icon data-icon="inline-start" />
            {item.label}
          </Link>
        )
      })}
    </nav>
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
