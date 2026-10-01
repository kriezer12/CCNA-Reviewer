import { spawnSync } from "node:child_process"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const webDirectory = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const nextCli = resolve(webDirectory, "node_modules", "next", "dist", "bin", "next")
const result = spawnSync(process.execPath, [nextCli, "build"], {
  cwd: webDirectory,
  stdio: "inherit",
  env: {
    ...process.env,
    NEXT_PUBLIC_SUPABASE_URL: "http://127.0.0.1:54321",
    NEXT_PUBLIC_SUPABASE_ANON_KEY: "e2e-publishable-key",
    ALLOWED_EMAIL: "owner@e2e.test",
    STUDY_TIME_ZONE: "Asia/Manila",
    NEXT_DIST_DIR: ".next-e2e",
    NEXT_TELEMETRY_DISABLED: "1",
  },
})

process.exit(result.status ?? 1)
