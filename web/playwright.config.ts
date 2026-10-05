import { defineConfig, devices } from "@playwright/test"
import { resolve } from "node:path"

const authFile = resolve(process.cwd(), ".playwright", "owner.json")
const baseURL = "http://127.0.0.1:3002"

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: "list",
  use: {
    baseURL,
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "setup",
      testMatch: /auth\.setup\.ts/,
      use: { ...devices["Desktop Chrome"], storageState: { cookies: [], origins: [] } },
    },
    {
      name: "desktop-chromium",
      testMatch: /(navigation|command-drills|learning|exercises|review|bookmarks|sequence|practice-drafts|objective-notes|routing-exercises)\.spec\.ts/,
      dependencies: ["setup"],
      use: { ...devices["Desktop Chrome"], storageState: authFile },
    },
    {
      name: "mobile-chromium",
      testMatch: /mobile\.spec\.ts/,
      dependencies: ["setup"],
      use: { ...devices["Pixel 7"], storageState: authFile },
    },
    {
      name: "unauthenticated",
      testMatch: /unauthenticated\.spec\.ts/,
      use: { ...devices["Desktop Chrome"], storageState: { cookies: [], origins: [] } },
    },
  ],
  webServer: {
    command: "node scripts/playwright-server.mjs",
    url: `${baseURL}/login`,
    reuseExistingServer: false,
    timeout: 60_000,
  },
})
