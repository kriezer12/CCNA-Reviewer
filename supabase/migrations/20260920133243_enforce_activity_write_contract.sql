create or replace function public.ccna_jsonb_object_count(value jsonb)
returns integer
language sql
immutable
strict
parallel safe
as $$
  select count(*)::integer from jsonb_each(value);
$$;

revoke all on function public.ccna_jsonb_object_count(jsonb) from public;

alter table public.quiz_attempts
  add column objective_ids text[] not null default '{}'::text[];

alter table public.quiz_attempts
  add constraint quiz_attempts_objective_ids_check
  check (objective_ids <@ array[
    '1.1', '1.2', '1.3', '1.4', '1.5', '1.6', '1.7', '1.8', '1.9', '1.10', '1.11', '1.12', '1.13',
    '2.1', '2.2', '2.3', '2.4', '2.5', '2.6', '2.7', '2.8', '2.9',
    '3.1', '3.2', '3.3', '3.4', '3.5',
    '4.1', '4.2', '4.3', '4.4', '4.5', '4.6', '4.7', '4.8', '4.9',
    '5.1', '5.2', '5.3', '5.4', '5.5', '5.6', '5.7', '5.8', '5.9', '5.10',
    '6.1', '6.2', '6.3', '6.4', '6.5', '6.6', '6.7'
  ]::text[]);

alter table public.quiz_attempts
  add constraint quiz_attempts_answer_count_check
  check (total_questions = public.ccna_jsonb_object_count(selected_answers));

alter table public.lab_progress
  add constraint lab_progress_complete_evidence_check
  check (status <> 'complete' or nullif(btrim(evidence_note), '') is not null);

drop policy if exists "owners can update study sessions" on public.study_sessions;
drop policy if exists "owners can delete study sessions" on public.study_sessions;
drop policy if exists "owners can update quiz attempts" on public.quiz_attempts;
drop policy if exists "owners can delete quiz attempts" on public.quiz_attempts;

revoke update, delete on table public.study_sessions from authenticated;
revoke update, delete on table public.quiz_attempts from authenticated;
