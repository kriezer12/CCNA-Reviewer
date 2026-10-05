begin;
create table public.practice_drafts (
  user_id uuid primary key references auth.users(id) on delete cascade,
  revision integer not null default 1 check (revision > 0),
  draft jsonb not null,
  updated_at timestamptz not null default now()
);
alter table public.practice_drafts enable row level security;
revoke all on public.practice_drafts from public, anon, authenticated;
grant select, delete on public.practice_drafts to authenticated;
grant insert (user_id, revision, draft) on public.practice_drafts to authenticated;
grant update (draft, revision, updated_at) on public.practice_drafts to authenticated;
create policy "owner reads practice draft" on public.practice_drafts for select to authenticated
using ((select private.is_learning_owner()) and user_id = (select auth.uid()));
create policy "owner creates practice draft" on public.practice_drafts for insert to authenticated
with check ((select private.is_learning_owner()) and user_id = (select auth.uid()) and revision = 1);
create policy "owner updates practice draft" on public.practice_drafts for update to authenticated
using ((select private.is_learning_owner()) and user_id = (select auth.uid()))
with check ((select private.is_learning_owner()) and user_id = (select auth.uid()));
create policy "owner removes practice draft" on public.practice_drafts for delete to authenticated
using ((select private.is_learning_owner()) and user_id = (select auth.uid()));
commit;
