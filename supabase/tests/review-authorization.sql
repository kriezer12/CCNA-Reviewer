-- Run against the isolated local test project, never --linked. All fixtures roll back.
begin;
insert into auth.users(id, email) values
('11111111-1111-4111-8111-111111111111', 'owner@e2e.test'),
('22222222-2222-4222-8222-222222222222', 'other@e2e.test');
insert into private.learning_owner(user_id, email) values
('11111111-1111-4111-8111-111111111111', 'owner@e2e.test');
insert into public.practice_question_catalog(question_id, content_revision) values ('test-question', 1);
set local role authenticated;
select set_config('request.jwt.claims', jsonb_build_object('sub','11111111-1111-4111-8111-111111111111','email','owner@e2e.test','exp',extract(epoch from now())::bigint + 3600)::text, true);
insert into public.review_items(user_id, question_id, content_revision) values
('11111111-1111-4111-8111-111111111111','test-question',1);
do $$ begin
  if (select count(*) from public.review_items) <> 1 then raise exception 'owner cannot read saved question'; end if;
  begin
    insert into public.review_items(user_id, question_id, content_revision) values
    ('11111111-1111-4111-8111-111111111111','unknown',1);
    raise exception 'unknown reference accepted';
  exception when foreign_key_violation then null; end;
  begin
    update public.review_items set successful_stage = 4;
    raise exception 'client can forge review stage';
  exception when insufficient_privilege then null; end;
  begin
    insert into private.learning_owner(user_id,email) values
    ('22222222-2222-4222-8222-222222222222','other@e2e.test');
    raise exception 'client can authorize another owner';
  exception when insufficient_privilege then null; end;
end $$;
reset role;
update public.review_items set successful_stage = 2, due_on = '2030-01-01';
set local role authenticated;
insert into public.review_items(user_id, question_id, content_revision) values
('11111111-1111-4111-8111-111111111111','test-question',1) on conflict do nothing;
do $$ begin
  if not exists (select 1 from public.review_items where successful_stage = 2 and due_on = '2030-01-01') then
    raise exception 'duplicate save changed schedule'; end if;
end $$;
select set_config('request.jwt.claims', jsonb_build_object('sub','22222222-2222-4222-8222-222222222222','email','other@e2e.test','exp',extract(epoch from now())::bigint + 3600)::text, true);
do $$ begin
  if exists (select 1 from public.review_items) then raise exception 'foreign identity sees review'; end if;
  begin
    insert into public.review_items(user_id,question_id,content_revision) values
    ('22222222-2222-4222-8222-222222222222','test-question',1);
    raise exception 'nonallowlisted identity can save own review';
  exception when insufficient_privilege then null; end;
  delete from public.review_items;
end $$;
select set_config('request.jwt.claims', jsonb_build_object('sub','11111111-1111-4111-8111-111111111111','email','owner@e2e.test','exp',extract(epoch from now())::bigint - 1)::text, true);
do $$ begin
  if exists (select 1 from public.review_items) then raise exception 'expired claims accepted'; end if;
end $$;
set local role anon;
do $$ begin
  begin
    perform * from public.review_items;
    raise exception 'anonymous review read allowed';
  exception when insufficient_privilege then null; end;
end $$;
set local role authenticated;
select set_config('request.jwt.claims', jsonb_build_object('sub','11111111-1111-4111-8111-111111111111','email','wrong@e2e.test','exp',extract(epoch from now())::bigint + 3600)::text, true);
do $$ begin
  if exists (select 1 from public.review_items) then raise exception 'rejected email accepted'; end if;
end $$;
select set_config('request.jwt.claims', jsonb_build_object('sub','11111111-1111-4111-8111-111111111111','email','owner@e2e.test','exp',extract(epoch from now())::bigint + 3600)::text, true);
delete from public.review_items;
do $$ begin
  if exists (select 1 from public.review_items) then raise exception 'owner remove failed'; end if;
end $$;
rollback;
