import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

const migrationPath = new URL("../../supabase/migrations/20260920130322_initial_progress.sql", import.meta.url)
const migration = await readFile(migrationPath, "utf8")

test("progress migration declares all user-owned tables and constraints", () => {
  for (const table of ["topic_progress", "lab_progress", "study_sessions", "quiz_attempts"]) {
    assert.match(migration, new RegExp(`create table public\\.${table}`))
    assert.match(migration, new RegExp(`alter table public\\.${table} enable row level security`))
    assert.match(migration, new RegExp(`on public\\.${table} for select to authenticated`))
    assert.match(migration, new RegExp(`using \\(\\(select auth\\.uid\\(\\)\\) = user_id\\)`))
  }
  assert.match(migration, /primary key \(user_id, objective_id\)/)
  assert.match(migration, /primary key \(user_id, lab_id\)/)
  assert.match(migration, /evidence_mode text not null default 'self_reported'/)
  assert.match(migration, /duration_minutes integer not null check \(duration_minutes between 1 and 720\)/)
  assert.match(migration, /jsonb_typeof\(selected_answers\) = 'object'/)
})

