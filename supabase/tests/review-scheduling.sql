-- Run after migrations on a disposable local project; all identities and rows roll back.
begin;
insert into auth.users(id,email) values ('33333333-3333-4333-8333-333333333333','owner@e2e.test');
insert into private.learning_owner(user_id,email) values ('33333333-3333-4333-8333-333333333333','owner@e2e.test');
insert into public.practice_question_catalog(question_id,content_revision) values ('schedule-correct',1),('schedule-wrong',1);
insert into private.practice_question_answers(question_id,content_revision,correct_choice_id) values ('schedule-correct',1,'B'),('schedule-wrong',1,'C');
set local role authenticated;
select set_config('request.jwt.claims',jsonb_build_object('sub','33333333-3333-4333-8333-333333333333','email','owner@e2e.test','exp',extract(epoch from now())::bigint+3600)::text,true);
insert into public.review_items(user_id,question_id,content_revision) values
('33333333-3333-4333-8333-333333333333','schedule-correct',1),
('33333333-3333-4333-8333-333333333333','schedule-wrong',1);
do $$
declare event record; today date := (now() at time zone 'Asia/Manila')::date;
begin
  select * into event from public.record_review_check('schedule-correct',1,'B');
  if not event.is_correct or event.due_on <> today+3 or event.successful_stage <> 1 or event.already_checked then
    raise exception 'first correct review must advance three days once'; end if;
  select * into event from public.record_review_check('schedule-correct',1,'A');
  if not event.is_correct or event.due_on <> today+3 or event.successful_stage <> 1 or not event.already_checked then
    raise exception 'retry must preserve the first result and due date'; end if;
  select * into event from public.record_review_check('schedule-wrong',1,'A');
  if event.is_correct or event.due_on <> today+1 or event.successful_stage <> 0 or event.already_checked then
    raise exception 'incorrect review must be due tomorrow and reset its stage'; end if;
  select * into event from public.record_review_check('schedule-wrong',1,'C');
  if event.is_correct or event.due_on <> today+1 or event.successful_stage <> 0 or not event.already_checked then
    raise exception 'same-day retry must not score or advance twice'; end if;
  begin
    perform * from public.record_review_check('schedule-correct',1,'Z');
    raise exception 'invalid choice accepted';
  exception when invalid_parameter_value then null; end;
  begin
    perform * from public.record_review_check('missing',1,'A');
    raise exception 'stale question accepted';
  exception when invalid_parameter_value then null; end;
end $$;
reset role;
do $$ begin
  if (select count(*) from private.review_checks where user_id='33333333-3333-4333-8333-333333333333') <> 2 then
    raise exception 'expected one review event per question and study date'; end if;
end $$;
set local role authenticated;
select set_config('request.jwt.claims',jsonb_build_object('sub','33333333-3333-4333-8333-333333333333','email','owner@e2e.test','exp',extract(epoch from now())::bigint-1)::text,true);
do $$ begin
  begin
    perform * from public.record_review_check('schedule-correct',1,'B');
    raise exception 'expired owner can call review function';
  exception when insufficient_privilege then null; end;
end $$;
rollback;
