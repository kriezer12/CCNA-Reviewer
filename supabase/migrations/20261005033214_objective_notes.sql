begin;
create table public.objective_notes (
  user_id uuid not null references auth.users(id) on delete cascade,
  objective_id text not null check (objective_id in (
    '1.1','1.2','1.3','1.4','1.5','1.6','1.7','1.8','1.9','1.10','1.11','1.12','1.13',
    '2.1','2.2','2.3','2.4','2.5','2.6','2.7','2.8','2.9',
    '3.1','3.2','3.3','3.4','3.5',
    '4.1','4.2','4.3','4.4','4.5','4.6','4.7','4.8','4.9',
    '5.1','5.2','5.3','5.4','5.5','5.6','5.7','5.8','5.9','5.10',
    '6.1','6.2','6.3','6.4','6.5','6.6','6.7'
  )),
  revision integer not null default 1 check (revision > 0),
  body text not null check (char_length(body) between 1 and 5000),
  updated_at timestamptz not null default now(),
  primary key (user_id, objective_id)
);
alter table public.objective_notes enable row level security;
revoke all on public.objective_notes from public, anon, authenticated;
grant select, delete on public.objective_notes to authenticated;
grant insert (user_id, objective_id, revision, body) on public.objective_notes to authenticated;
grant update (revision, body, updated_at) on public.objective_notes to authenticated;
create policy "owner reads objective notes" on public.objective_notes for select to authenticated
using ((select private.is_learning_owner()) and user_id = (select auth.uid()));
create policy "owner creates objective notes" on public.objective_notes for insert to authenticated
with check ((select private.is_learning_owner()) and user_id = (select auth.uid()) and revision = 1);
create policy "owner updates objective notes" on public.objective_notes for update to authenticated
using ((select private.is_learning_owner()) and user_id = (select auth.uid()))
with check ((select private.is_learning_owner()) and user_id = (select auth.uid()));
create policy "owner deletes objective notes" on public.objective_notes for delete to authenticated
using ((select private.is_learning_owner()) and user_id = (select auth.uid()));
commit;
