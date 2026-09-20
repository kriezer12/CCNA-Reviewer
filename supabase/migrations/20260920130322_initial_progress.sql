create table public.topic_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  objective_id text not null,
  status text not null default 'not_started' check (status in ('not_started', 'in_progress', 'complete')),
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (user_id, objective_id)
);

create table public.lab_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  lab_id text not null,
  status text not null default 'not_started' check (status in ('not_started', 'in_progress', 'complete')),
  evidence_mode text not null default 'self_reported' check (evidence_mode in ('self_reported', 'verified')),
  evidence_note text,
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (user_id, lab_id)
);

create table public.study_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  study_date date not null default current_date,
  duration_minutes integer not null check (duration_minutes between 1 and 720),
  objective_id text,
  lab_id text,
  notes text,
  created_at timestamptz not null default now()
);

create table public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  quiz_id text not null,
  topic_id text not null,
  score integer not null check (score >= 0),
  total_questions integer not null check (total_questions > 0),
  selected_answers jsonb not null default '{}'::jsonb check (jsonb_typeof(selected_answers) = 'object'),
  attempted_at timestamptz not null default now(),
  check (score <= total_questions)
);

create index topic_progress_user_idx on public.topic_progress (user_id);
create index lab_progress_user_idx on public.lab_progress (user_id);
create index study_sessions_user_date_idx on public.study_sessions (user_id, study_date desc);
create index quiz_attempts_user_date_idx on public.quiz_attempts (user_id, attempted_at desc);

alter table public.topic_progress enable row level security;
alter table public.lab_progress enable row level security;
alter table public.study_sessions enable row level security;
alter table public.quiz_attempts enable row level security;

grant select, insert, update, delete on public.topic_progress to authenticated;
grant select, insert, update, delete on public.lab_progress to authenticated;
grant select, insert, update, delete on public.study_sessions to authenticated;
grant select, insert, update, delete on public.quiz_attempts to authenticated;

create policy "owners can read topic progress"
  on public.topic_progress for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "owners can insert topic progress"
  on public.topic_progress for insert to authenticated
  with check ((select auth.uid()) = user_id);

create policy "owners can update topic progress"
  on public.topic_progress for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "owners can delete topic progress"
  on public.topic_progress for delete to authenticated
  using ((select auth.uid()) = user_id);

create policy "owners can read lab progress"
  on public.lab_progress for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "owners can insert lab progress"
  on public.lab_progress for insert to authenticated
  with check ((select auth.uid()) = user_id);

create policy "owners can update lab progress"
  on public.lab_progress for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "owners can delete lab progress"
  on public.lab_progress for delete to authenticated
  using ((select auth.uid()) = user_id);

create policy "owners can read study sessions"
  on public.study_sessions for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "owners can insert study sessions"
  on public.study_sessions for insert to authenticated
  with check ((select auth.uid()) = user_id);

create policy "owners can update study sessions"
  on public.study_sessions for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "owners can delete study sessions"
  on public.study_sessions for delete to authenticated
  using ((select auth.uid()) = user_id);

create policy "owners can read quiz attempts"
  on public.quiz_attempts for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "owners can insert quiz attempts"
  on public.quiz_attempts for insert to authenticated
  with check ((select auth.uid()) = user_id);

create policy "owners can update quiz attempts"
  on public.quiz_attempts for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "owners can delete quiz attempts"
  on public.quiz_attempts for delete to authenticated
  using ((select auth.uid()) = user_id);
