-- Run against an isolated local project after migrations; all fixtures roll back.
begin;
insert into auth.users(id,email) values
('11111111-1111-4111-8111-111111111111','owner@e2e.test'),
('22222222-2222-4222-8222-222222222222','other@e2e.test');
insert into private.learning_owner(user_id,email) values
('11111111-1111-4111-8111-111111111111','owner@e2e.test');
set local role authenticated;
select set_config('request.jwt.claims',jsonb_build_object('sub','11111111-1111-4111-8111-111111111111','email','owner@e2e.test','exp',extract(epoch from now())::bigint+3600)::text,true);
insert into public.practice_drafts(user_id,revision,draft) values
('11111111-1111-4111-8111-111111111111',1,'{"answers":{"q":"A"}}');
do $$ begin
  if (select count(*) from public.practice_drafts) <> 1 then raise exception 'owner cannot read draft'; end if;
  update public.practice_drafts set revision=2,draft='{"answers":{"q":"B"}}' where revision=1;
  if not found then raise exception 'current revision update failed'; end if;
  update public.practice_drafts set revision=3 where revision=1;
  if found then raise exception 'stale revision overwrote current draft'; end if;
end $$;
select set_config('request.jwt.claims',jsonb_build_object('sub','22222222-2222-4222-8222-222222222222','email','other@e2e.test','exp',extract(epoch from now())::bigint+3600)::text,true);
do $$ begin
  if exists(select 1 from public.practice_drafts) then raise exception 'foreign identity can read draft'; end if;
  begin
    insert into public.practice_drafts(user_id,revision,draft) values
    ('22222222-2222-4222-8222-222222222222',1,'{}');
    raise exception 'non-owner can create draft';
  exception when insufficient_privilege then null; end;
end $$;
reset role;
rollback;
