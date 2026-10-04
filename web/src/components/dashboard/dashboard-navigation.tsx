"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BookOpen,
  FlaskConical,
  LayoutDashboard,
  ShieldCheck,
  Terminal,
} from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "cn"

const navigation = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Roadmap", href: "/roadmap", icon: BookOpen },
  { label: "Learn", href: "/learn", icon: BookOpen },
  { label: "Practice", href: "/practice", icon: ShieldCheck },
  { label: "Labs", href: "/labs", icon: FlaskConical },
  { label: "Command drills", href: "/command-drills", icon: Terminal },
  { label: "Readiness", href: "/readiness", icon: ShieldCheck },
]

export function DashboardNavigation({ orientation }: { orientation: "horizontal" | "vertical" }) {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Main navigation"
      className={cn(
        orientation === "vertical" ? "flex flex-1 flex-col gap-1 p-4" : "flex gap-2 overflow-x-auto pb-1",
      )}
    >
      {navigation.map((item) => {
        const Icon = item.icon
        const isActive = item.href === "/" ? pathname === "/" : pathname === item.href || pathname.startsWith(`${item.href}/`)
        return (
          <Link
            aria-current={isActive ? "page" : undefined}
            className={buttonVariants({
              className: cn(
                "min-h-11",
                orientation === "vertical" ? "justify-start gap-3" : "shrink-0 gap-2",
                !isActive && "text-muted-foreground",
              ),
              variant: isActive ? "secondary" : "ghost",
            })}
            href={item.href}
            key={item.href}
          >
            <Icon data-icon="inline-start" />
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
