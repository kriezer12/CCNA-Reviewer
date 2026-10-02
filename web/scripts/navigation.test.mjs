import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const scriptsDirectory = dirname(fileURLToPath(import.meta.url))
const webDirectory = dirname(scriptsDirectory)
const shellPath = join(webDirectory, "src", "components", "dashboard", "dashboard-shell.tsx")
const shell = await readFile(shellPath, "utf8")
const navigationPath = join(webDirectory, "src", "components", "dashboard", "dashboard-navigation.tsx")
const navigation = await readFile(navigationPath, "utf8")
const studyDirectory = join(webDirectory, "src", "app", "(study)")

const routes = ["/", "/roadmap", "/labs", "/command-drills", "/readiness"]
for (const route of routes) {
  const pagePath = route === "/" ? join(studyDirectory, "page.tsx") : join(studyDirectory, route.slice(1), "page.tsx")
  await readFile(pagePath, "utf8")
  assert.match(navigation, new RegExp(`href: "${route.replace("/", "\\/")}"`), `navigation should link to ${route}`)
}

assert.match(navigation, /aria-current=\{isActive \? "page" : undefined\}/)
assert.match(shell, /<DashboardNavigation orientation="vertical" \/>/)
assert.match(await readFile(join(studyDirectory, "layout.tsx"), "utf8"), /<DashboardShell>\{children\}<\/DashboardShell>/)
assert.ok(await readFile(join(studyDirectory, "loading.tsx"), "utf8"))
const roadmapPage = await readFile(join(studyDirectory, "roadmap", "page.tsx"), "utf8")
const roadmapDetailPage = await readFile(join(studyDirectory, "roadmap", "week", "[week]", "page.tsx"), "utf8")
assert.match(roadmapPage, /href=\{item\.href\}/)
assert.match(roadmapPage, /Open \$\{item\.label\} detail/)
assert.match(roadmapDetailPage, /getRoadmapWeek\(weekParam\)/)
assert.match(roadmapDetailPage, /const user = await requireOwner\(\)/)
console.log("navigation route checks passed")
