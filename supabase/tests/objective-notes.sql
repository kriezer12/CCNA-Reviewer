-- Run against an isolated local project after migrations; fixtures roll back.
begin;
insert into auth.users(id,email) values
('11111111-1111-4111-8111-111111111111','owner@e2e.test'),
('22222222-2222-4222-8222-222222222222','other@e2e.test');
insert into private.learning_owner(user_id,email) values ('11111111-1111-4111-8111-111111111111','owner@e2e.test');
set local role authenticated;
select set_config('request.jwt.claims',jsonb_build_object('sub','11111111-1111-4111-8111-111111111111','email','owner@e2e.test','exp',extract(epoch from now())::bigint+3600)::text,true);
insert into public.objective_notes(user_id,objective_id,revision,body) values ('11111111-1111-4111-8111-111111111111','1.1',1,'Private note');
do $$ begin
  if (select count(*) from public.objective_notes) <> 1 then raise exception 'owner cannot read note'; end if;
  update public.objective_notes set revision=2,body='Second edit' where objective_id='1.1' and revision=1;
  if not found then raise exception 'current edit failed'; end if;
  update public.objective_notes set revision=3 where objective_id='1.1' and revision=1;
  if found then raise exception 'stale edit overwrote note'; end if;
  begin
    insert into public.objective_notes(user_id,objective_id,body) values ('11111111-1111-4111-8111-111111111111','9.9','bad objective');
    raise exception 'invalid objective accepted';
  exception when check_violation then null; end;
  begin
    insert into public.objective_notes(user_id,objective_id,body) values ('11111111-1111-4111-8111-111111111111','1.2',repeat('x',5001));
    raise exception 'oversized note accepted';
  exception when check_violation then null; end;
end $$;
select set_config('request.jwt.claims',jsonb_build_object('sub','22222222-2222-4222-8222-222222222222','email','other@e2e.test','exp',extract(epoch from now())::bigint+3600)::text,true);
do $$ begin
  if exists(select 1 from public.objective_notes) then raise exception 'foreign owner reads private note'; end if;
  begin
    insert into public.objective_notes(user_id,objective_id,body) values ('22222222-2222-4222-8222-222222222222','1.1','private');
    raise exception 'non-owner writes private note';
  exception when insufficient_privilege then null; end;
end $$;
rollback;
