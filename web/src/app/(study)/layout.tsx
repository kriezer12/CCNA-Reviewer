import { DashboardShell } from "@/components/dashboard/dashboard-shell"

export default function StudyLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <DashboardShell>{children}</DashboardShell>
}
