import {
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronRight,
  Clock3,
  Command,
  FlaskConical,
  LayoutDashboard,
  PanelLeft,
  RadioTower,
  Route,
  ShieldCheck,
  Terminal,
  Wifi,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LogoutButton } from "@/components/logout-button"
import { LabProgressControl } from "@/components/dashboard/lab-progress-control"
import { ObjectiveProgressControl } from "@/components/dashboard/objective-progress-control"
import { QuizRunner } from "@/components/dashboard/quiz-runner"
import { StudySessionForm } from "@/components/dashboard/study-session-form"
import { curriculum } from "@/content/curriculum"
import { calculateCompletion, calculateStudyStreak } from "@/lib/analytics"
import { requireOwner } from "@/lib/supabase/auth"
import { loadDashboardData, type DashboardData } from "@/lib/supabase/progress"

const roadmap = curriculum.roadmap.weeks.map((week, index) => ({
  label: `Week ${String(week.week).padStart(2, "0")}`,
  meta: week.dates,
  focus: week.focus,
  progress: 0,
  icon: [LayoutDashboard, PanelLeft, Route, ShieldCheck, Wifi][Math.min(Math.floor(index / 4), 4)],
}))

const labs = curriculum.labs.slice(5, 8).map((lab, index) => ({
  id: lab.id,
  name: lab.title,
  type: lab.platform.primary,
  time: `${lab.durationMinutes} min`,
  state: index === 0 ? "Next" : "Queued",
}))

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-mono text-2xl font-semibold tracking-tight text-foreground">{value}</span>
      <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">{label}</span>
    </div>
  )
}

export const dynamic = "force-dynamic"

export default async function Home() {
  const user = await requireOwner()
  let dashboardData: DashboardData = { topics: [], labs: [], sessions: [], attempts: [] }
  let dataError: string | null = null

  try {
    dashboardData = await loadDashboardData(user.id)
  } catch (error) {
    dataError = error instanceof Error ? error.message : "Unable to load study progress."
  }

  const objectiveCompletion = calculateCompletion(dashboardData.topics, curriculum.objectives.length)
  const labCompletion = calculateCompletion(dashboardData.labs, curriculum.labs.length)
  const studyMinutes = dashboardData.sessions.reduce((total, session) => total + session.duration_minutes, 0)
  const streak = calculateStudyStreak(dashboardData.sessions)
  const latestAttempt = dashboardData.attempts[0]

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-[1440px] flex-col lg:flex-row">
        <aside className="hidden w-64 shrink-0 border-r border-border bg-card lg:flex lg:flex-col">
          <div className="flex h-20 items-center gap-3 px-6">
            <div className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Command className="size-4" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="font-mono text-xs font-semibold tracking-[0.14em]">CCNA / REVIEWER</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">v1.1 study system</span>
            </div>
          </div>
          <Separator />
          <nav className="flex flex-1 flex-col gap-1 p-4" aria-label="Main navigation">
            <Button className="justify-start gap-3" variant="secondary"><LayoutDashboard data-icon="inline-start" /> Dashboard</Button>
            <Button className="justify-start gap-3 text-muted-foreground" variant="ghost"><BookOpen data-icon="inline-start" /> Roadmap</Button>
            <Button className="justify-start gap-3 text-muted-foreground" variant="ghost"><FlaskConical data-icon="inline-start" /> Labs</Button>
            <Button className="justify-start gap-3 text-muted-foreground" variant="ghost"><Terminal data-icon="inline-start" /> Command drills</Button>
            <Button className="justify-start gap-3 text-muted-foreground" variant="ghost"><ShieldCheck data-icon="inline-start" /> Readiness</Button>
          </nav>
          <div className="halftone m-4 flex flex-col gap-3 rounded-lg border border-border p-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Exam target</span>
            <span className="font-mono text-lg font-semibold">JAN 25–31, 2027</span>
            <span className="text-xs leading-5 text-muted-foreground">18 weeks of focused practice before the v1.1 window closes.</span>
          </div>
        </aside>

        <section className="flex min-w-0 flex-1 flex-col">
          <header className="flex min-h-20 items-center justify-between border-b border-border px-4 py-4 sm:px-8 lg:px-10">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground lg:hidden"><Command className="size-4" /></div>
              <div className="flex flex-col gap-0.5">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Monday / Week 04</span>
                <span className="text-sm font-medium">Good evening, {user.email?.split("@")[0] ?? "learner"}.</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="hidden font-mono text-[10px] uppercase tracking-[0.12em] sm:inline-flex" variant="outline">6 day streak</Badge>
              <LogoutButton />
            </div>
          </header>

          <div className="flex flex-1 flex-col gap-8 px-4 py-8 sm:px-8 lg:gap-10 lg:px-10 lg:py-12">
            <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-end">
              <div className="flex max-w-3xl flex-col gap-5">
                <Badge className="w-fit font-mono text-[10px] uppercase tracking-[0.16em]" variant="secondary">Your next hour</Badge>
                <h1 className="max-w-2xl text-4xl font-semibold leading-[1.08] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
                  Build the route. <span className="text-muted-foreground">Understand the path.</span>
                </h1>
                <p className="max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
                  A focused CCNA study loop for the hours after work: retrieve, configure, verify, and record what changed.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button className="w-full sm:w-auto" size="lg"><BookOpen data-icon="inline-start" /> Continue session <ArrowUpRight data-icon="inline-end" /></Button>
                  <Button className="w-full sm:w-auto" size="lg" variant="outline">View full roadmap</Button>
                </div>
              </div>
              <Card className="halftone border-border bg-muted/40">
                <CardHeader>
                  <CardDescription className="font-mono text-[10px] uppercase tracking-[0.15em]">Exam coverage</CardDescription>
                  <CardTitle className="font-mono text-3xl tracking-tight">{objectiveCompletion.completed} / {objectiveCompletion.total}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                  <Progress value={objectiveCompletion.percentage} aria-label="Exam objective coverage" />
                  <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground"><span>Lesson understanding</span><span>{objectiveCompletion.percentage}%</span></div>
                </CardContent>
              </Card>
            </section>

            <section className="grid gap-3 border-y border-border py-5 sm:grid-cols-3 sm:gap-0">
              <Stat value={String(objectiveCompletion.completed).padStart(2, "0")} label="Objectives complete" />
              <Stat value={`${Math.floor(studyMinutes / 60)}:${String(studyMinutes % 60).padStart(2, "0")}`} label="Recorded study time" />
              <Stat value={String(streak).padStart(2, "0")} label="30-minute streak" />
            </section>

            {dataError ? <Card className="border-destructive/50 bg-destructive/5"><CardContent className="pt-6"><p className="text-sm text-destructive" role="alert">{dataError} Refresh the page and retry.</p></CardContent></Card> : null}

            <Tabs className="flex flex-col gap-6" defaultValue="roadmap">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Workspace</span>
                  <h2 className="text-2xl font-semibold tracking-tight">Study control</h2>
                </div>
                <TabsList><TabsTrigger value="roadmap">Roadmap</TabsTrigger><TabsTrigger value="labs">Labs</TabsTrigger><TabsTrigger value="blueprint">Blueprint</TabsTrigger></TabsList>
              </div>

              <TabsContent className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)]" value="roadmap">
                <Card>
                  <CardHeader className="border-b border-border">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex flex-col gap-1"><CardDescription className="font-mono text-[10px] uppercase tracking-[0.15em]">Path to exam day</CardDescription><CardTitle>18-week roadmap</CardTitle></div>
                      <Badge variant="outline">0 / {curriculum.roadmap.weeks.length} weeks</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-0 p-0">
                    {roadmap.map((item) => {
                      const Icon = item.icon
                      return (
                        <div className="flex items-center gap-4 border-b border-border px-5 py-4 last:border-b-0 sm:px-6" key={item.label}>
                          <div className="flex size-9 shrink-0 items-center justify-center rounded-md border border-border bg-muted text-muted-foreground">{item.progress === 100 ? <Check className="size-4 text-foreground" /> : <Icon className="size-4" />}</div>
                          <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                            <div className="flex items-center justify-between gap-3"><span className="truncate text-sm font-medium">{item.label} · {item.focus}</span><span className="font-mono text-[10px] text-muted-foreground">{item.progress}%</span></div>
                            <Progress className="h-1" value={item.progress} aria-label={item.label + " progress"} />
                            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">{item.meta}</span>
                          </div>
                          <ChevronRight className="hidden size-4 text-muted-foreground sm:block" />
                        </div>
                      )
                    })}
                  </CardContent>
                </Card>

                <Card className="bg-primary text-primary-foreground">
                  <CardHeader>
                    <div className="flex items-center justify-between"><Badge className="border-primary-foreground/20 bg-primary-foreground/10 font-mono text-[10px] uppercase tracking-[0.15em] text-primary-foreground" variant="outline">In focus</Badge><Clock3 className="size-4 text-primary-foreground/70" /></div>
                    <CardTitle className="mt-4 text-2xl">Rapid PVST+ roles</CardTitle>
                    <CardDescription className="text-primary-foreground/70">Interpret root ports, port states, and guard features before the uplink lab.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-5">
                    <div className="flex items-center gap-3 font-mono text-xs text-primary-foreground/80"><span className="rounded border border-primary-foreground/20 px-2 py-1">2.5</span><span>Network Access</span></div>
                    <div className="flex items-center gap-2 text-sm text-primary-foreground/80"><RadioTower className="size-4" /> 20 minutes · concept check</div>
                  </CardContent>
                  <CardFooter><Button className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90" size="lg">Start focused review <ArrowUpRight data-icon="inline-end" /></Button></CardFooter>
                </Card>
                <ObjectiveProgressControl objectives={curriculum.objectives} initialRows={dashboardData.topics} />
              </TabsContent>

              <TabsContent className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]" value="labs">
                <Card>
                  <CardHeader className="border-b border-border"><CardDescription className="font-mono text-[10px] uppercase tracking-[0.15em]">Practical sequence</CardDescription><div className="flex items-center justify-between gap-3"><CardTitle>Lab queue</CardTitle><Badge variant="outline">{labCompletion.completed} / {labCompletion.total}</Badge></div></CardHeader>
                  <CardContent className="flex flex-col gap-0 p-0">
                    {labs.map((lab) => (
                      <div className="flex flex-col gap-3 border-b border-border px-5 py-5 last:border-b-0 sm:flex-row sm:items-center sm:px-6" key={lab.id}>
                        <span className="font-mono text-xs text-muted-foreground">{lab.id}</span>
                        <div className="flex min-w-0 flex-1 flex-col gap-1"><span className="font-medium">{lab.name}</span><span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">{lab.type} · {lab.time}</span></div>
                        <Badge variant={lab.state === "Next" ? "default" : "secondary"}>{lab.state}</Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
                <Card className="halftone">
                  <CardHeader><CardDescription className="font-mono text-[10px] uppercase tracking-[0.15em]">Lab rule</CardDescription><CardTitle>Evidence over memory</CardTitle></CardHeader>
                  <CardContent className="flex flex-col gap-3 text-sm leading-6 text-muted-foreground"><p>Save the topology, show output, and the desired/forbidden connectivity checks.</p><Separator /><p>Phone time prepares the lab. Desktop time configures it.</p></CardContent>
                </Card>
                <LabProgressControl labs={curriculum.labs} initialRows={dashboardData.labs} />
                <StudySessionForm />
              </TabsContent>

              <TabsContent className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]" value="blueprint">
                <Card>
                  <CardHeader className="border-b border-border"><CardDescription className="font-mono text-[10px] uppercase tracking-[0.15em]">200-301 v1.1</CardDescription><CardTitle>Objective weight</CardTitle></CardHeader>
                  <CardContent className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">
                    {curriculum.domains.map((domain) => <div className="flex items-center justify-between border-b border-border pb-3" key={domain.id}><span className="text-sm">{domain.title}</span><span className="font-mono text-sm font-semibold">{domain.weight}%</span></div>)}
                  </CardContent>
                </Card>
                <Card className="bg-muted/40">
                  <CardHeader><CardDescription className="font-mono text-[10px] uppercase tracking-[0.15em]">Readiness signal</CardDescription><CardTitle>Keep the weak spots visible.</CardTitle></CardHeader>
                  <CardContent className="flex flex-col gap-3 text-sm leading-6 text-muted-foreground"><p>Two fresh mixed assessments, no weak domain below the internal threshold, and independent configuration evidence.</p></CardContent>
                </Card>
                <QuizRunner />
                <Card className="bg-muted/40"><CardHeader><CardDescription className="font-mono text-[10px] uppercase tracking-[0.15em]">Quiz history</CardDescription><CardTitle>{latestAttempt ? `${latestAttempt.score}/${latestAttempt.total_questions}` : "No attempts yet"}</CardTitle></CardHeader><CardContent><p className="text-sm leading-6 text-muted-foreground">{latestAttempt ? "Latest saved checkpoint score." : "Complete a checkpoint to start your quiz trend."}</p></CardContent></Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </div>
    </main>
  )
}
