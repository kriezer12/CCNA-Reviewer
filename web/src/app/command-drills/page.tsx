import Link from "next/link"
import { ArrowUpRight, Terminal } from "lucide-react"

import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { commandDrills } from "@/content/command-drills"
import { requireOwner } from "@/lib/supabase/auth"

export const dynamic = "force-dynamic"

export default async function CommandDrillsPage() {
  const user = await requireOwner()

  return (
    <DashboardShell active="command-drills" headerLabel="Command drills / IOS retrieval" userEmail={user.email}>
      <DashboardPageHeader
        description="Retrieve one command, predict its evidence, and then use it in a real topology."
        eyebrow="IOS retrieval / before the lab"
        title="Short drills. Better verification."
      >
        <div className="flex flex-wrap gap-3">
          <Link className={buttonVariants({ variant: "outline" })} href="/labs">Apply a drill in the labs <ArrowUpRight data-icon="inline-end" /></Link>
          <Badge className="w-fit" variant="secondary">{commandDrills.length} drills</Badge>
        </div>
      </DashboardPageHeader>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3" aria-label="Command drills">
        {commandDrills.map((drill) => <Card key={drill.id}><CardHeader><div className="flex items-center justify-between gap-3"><Badge variant="outline">{drill.id}</Badge><Terminal className="size-4 text-muted-foreground" /></div><CardTitle className="text-xl">{drill.title}</CardTitle><CardDescription>{drill.objective}</CardDescription></CardHeader><CardContent className="flex flex-col gap-4"><code className="rounded-md bg-muted px-3 py-2 font-mono text-sm text-foreground">{drill.command}</code><p className="text-sm leading-6 text-muted-foreground"><span className="font-medium text-foreground">Verify:</span> {drill.verify}</p></CardContent></Card>)}
      </section>
    </DashboardShell>
  )
}
