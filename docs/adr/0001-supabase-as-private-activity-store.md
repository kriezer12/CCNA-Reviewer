# Use Supabase as the private activity store

**Status:** accepted

The first release uses Supabase Auth and Postgres as the source of truth for the owner's progress, sessions, quiz attempts, and lab evidence. Curriculum definitions remain versioned in the repository, while RLS and an allowlisted email protect the personal activity data; this keeps the personal dashboard queryable without introducing a custom backend or local-only state.

## Considered options

- Browser localStorage: rejected because activity must follow the learner across devices and support reliable analytics.
- A single JSON progress blob: rejected because quiz history, streaks, and lab evidence need queryable records.
- A custom authentication/API service: rejected because it adds operational work without benefit for a one-person reviewer.
