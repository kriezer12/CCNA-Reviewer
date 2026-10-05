begin;
alter table public.review_items add column last_reviewed_on date;

create table private.practice_question_answers (
  question_id text not null,
  content_revision integer not null,
  correct_choice_id text not null check (correct_choice_id in ('A','B','C','D')),
  primary key (question_id, content_revision),
  foreign key (question_id, content_revision) references public.practice_question_catalog(question_id, content_revision)
);
revoke all on private.practice_question_answers from public, anon, authenticated;

create table private.review_checks (
  user_id uuid not null references auth.users(id) on delete cascade,
  question_id text not null,
  content_revision integer not null,
  reviewed_on date not null,
  is_correct boolean not null,
  next_stage integer not null check (next_stage between 0 and 4),
  next_due_on date not null,
  checked_at timestamptz not null default now(),
  primary key (user_id, question_id, content_revision, reviewed_on),
  foreign key (question_id, content_revision) references public.practice_question_catalog(question_id, content_revision)
);
revoke all on private.review_checks from public, anon, authenticated;

create function private.record_review_check(p_question_id text, p_content_revision integer, p_selected_choice text)
returns table(is_correct boolean, due_on date, successful_stage integer, already_checked boolean)
language plpgsql volatile security definer set search_path = ''
as $$
declare
  caller_id uuid := auth.uid();
  local_day date := (now() at time zone 'Asia/Manila')::date;
  current_stage integer;
  current_due date;
  canonical_choice text;
  answer_correct boolean;
  next_stage integer;
  next_due date;
  added integer;
begin
  if caller_id is null or not private.is_learning_owner() then
    raise exception 'Not authorized for owner review data.' using errcode = '42501';
  end if;
  if p_selected_choice is null or p_selected_choice not in ('A','B','C','D') then
    raise exception 'Choose a valid answer.' using errcode = '22023';
  end if;
  select q.correct_choice_id into canonical_choice from private.practice_question_answers q
    where q.question_id = p_question_id and q.content_revision = p_content_revision;
  if not found then raise exception 'Question revision is unavailable.' using errcode = '22023'; end if;
  answer_correct := p_selected_choice = canonical_choice;

  select item.successful_stage, item.due_on into current_stage, current_due
    from public.review_items item where item.user_id = caller_id
      and item.question_id = p_question_id and item.content_revision = p_content_revision for update;
  if not found then raise exception 'Saved review question is unavailable.' using errcode = 'P0002'; end if;

  if answer_correct then
    next_stage := least(current_stage + 1, 4);
    next_due := local_day + case next_stage when 1 then 3 when 2 then 7 when 3 then 14 else 30 end;
  else
    next_stage := 0;
    next_due := local_day + 1;
  end if;

  insert into private.review_checks(user_id, question_id, content_revision, reviewed_on, is_correct, next_stage, next_due_on)
    values (caller_id, p_question_id, p_content_revision, local_day, answer_correct, next_stage, next_due)
    on conflict (user_id, question_id, content_revision, reviewed_on) do nothing;
  get diagnostics added = row_count;
  if added = 0 then
    select check_event.is_correct, check_event.next_stage, check_event.next_due_on
      into answer_correct, next_stage, next_due from private.review_checks check_event
      where check_event.user_id = caller_id and check_event.question_id = p_question_id
        and check_event.content_revision = p_content_revision and check_event.reviewed_on = local_day;
    update public.review_items set successful_stage = next_stage, due_on = next_due,
      last_reviewed_on = local_day, updated_at = now()
      where user_id = caller_id and question_id = p_question_id and content_revision = p_content_revision;
    return query select answer_correct, next_due, next_stage, true;
    return;
  end if;

  update public.review_items set successful_stage = next_stage, due_on = next_due,
    last_reviewed_on = local_day, updated_at = now()
    where user_id = caller_id and question_id = p_question_id and content_revision = p_content_revision;
  return query select answer_correct, next_due, next_stage, false;
end;
$$;
revoke all on function private.record_review_check(text, integer, text) from public, anon, authenticated;
grant execute on function private.record_review_check(text, integer, text) to authenticated;

create function public.record_review_check(p_question_id text, p_content_revision integer, p_selected_choice text)
returns table(is_correct boolean, due_on date, successful_stage integer, already_checked boolean)
language sql volatile security invoker set search_path = ''
as $$ select * from private.record_review_check(p_question_id, p_content_revision, p_selected_choice) $$;
revoke all on function public.record_review_check(text, integer, text) from public, anon;
grant execute on function public.record_review_check(text, integer, text) to authenticated;
insert into private.practice_question_answers(question_id,content_revision,correct_choice_id) values
('ipv4-network-1',1,'A'),
('ipv4-capacity-1',1,'A'),
('ipv4-broadcast-1',1,'D'),
('ipv4-mask-1',1,'C'),
('ipv4-network-2',1,'D'),
('ipv4-capacity-2',1,'D'),
('ipv4-broadcast-2',1,'C'),
('ipv4-mask-2',1,'B'),
('ipv4-network-3',1,'C'),
('ipv4-capacity-3',1,'C'),
('ipv4-broadcast-3',1,'B'),
('ipv4-mask-3',1,'A'),
('ipv4-network-4',1,'B'),
('ipv4-capacity-4',1,'B'),
('ipv4-broadcast-4',1,'A'),
('ipv4-mask-4',1,'D'),
('ipv4-network-5',1,'A'),
('ipv4-capacity-5',1,'A'),
('ipv4-broadcast-5',1,'D'),
('ipv4-mask-5',1,'C'),
('ipv4-design-50',1,'A'),
('ipv4-design-100',1,'A'),
('ipv4-overlap',1,'D'),
('ipv4-31',1,'A'),
('ipv6-prefix-bits',1,'B'),
('ipv6-prefix-count',1,'C'),
('ipv6-containing-prefix',1,'B'),
('ipv6-compress',1,'C'),
('ipv6-eui64-flip',1,'B'),
('ipv6-host-bits',1,'B'),
('automation-29',1,'D'),
('automation-30',1,'D'),
('automation-01',1,'B'),
('automation-02',1,'A'),
('automation-03',1,'D'),
('automation-04',1,'C'),
('automation-05',1,'B'),
('automation-06',1,'A'),
('automation-07',1,'D'),
('automation-08',1,'C'),
('automation-09',1,'B'),
('automation-10',1,'B'),
('automation-11',1,'A'),
('automation-12',1,'D'),
('automation-13',1,'C'),
('automation-14',1,'B'),
('automation-15',1,'A'),
('automation-16',1,'D'),
('automation-17',1,'C'),
('automation-18',1,'B'),
('automation-19',1,'A'),
('automation-20',1,'A'),
('automation-21',1,'D'),
('automation-22',1,'C'),
('automation-23',1,'B'),
('automation-24',1,'A'),
('automation-25',1,'D'),
('automation-26',1,'C'),
('automation-27',1,'B'),
('automation-28',1,'A'),
('fund-01',1,'B'),
('fund-02',1,'A'),
('fund-03',1,'D'),
('fund-04',1,'C'),
('fund-05',1,'B'),
('fund-06',1,'A'),
('fund-07',1,'D'),
('fund-08',1,'C'),
('fund-09',1,'B'),
('fund-10',1,'B'),
('fund-11',1,'A'),
('fund-12',1,'D'),
('fund-13',1,'C'),
('fund-14',1,'B'),
('fund-15',1,'A'),
('fund-16',1,'D'),
('fund-17',1,'C'),
('fund-18',1,'B'),
('fund-19',1,'A'),
('fund-20',1,'A'),
('fund-21',1,'D'),
('fund-22',1,'C'),
('fund-23',1,'B'),
('fund-24',1,'A'),
('fund-25',1,'D'),
('fund-26',1,'C'),
('fund-27',1,'B'),
('fund-28',1,'A'),
('fund-29',1,'D'),
('fund-30',1,'D'),
('fund-31',1,'C'),
('fund-32',1,'B'),
('fund-33',1,'A'),
('fund-34',1,'D'),
('fund-35',1,'C'),
('fund-36',1,'B'),
('fund-37',1,'A'),
('fund-38',1,'D'),
('fund-39',1,'C'),
('fund-40',1,'C'),
('fund-41',1,'B'),
('fund-42',1,'A'),
('fund-43',1,'D'),
('fund-44',1,'C'),
('fund-45',1,'B'),
('fund-46',1,'A'),
('fund-47',1,'D'),
('fund-48',1,'C'),
('fund-49',1,'B'),
('fund-50',1,'B'),
('fund-51',1,'A'),
('access-01',1,'A'),
('access-02',1,'D'),
('access-03',1,'C'),
('access-04',1,'B'),
('access-05',1,'A'),
('access-06',1,'D'),
('access-07',1,'C'),
('access-08',1,'B'),
('access-09',1,'A'),
('access-10',1,'A'),
('access-11',1,'D'),
('access-12',1,'C'),
('access-13',1,'B'),
('access-14',1,'A'),
('access-15',1,'D'),
('access-16',1,'C'),
('access-17',1,'B'),
('access-18',1,'A'),
('access-19',1,'D'),
('access-20',1,'D'),
('access-21',1,'C'),
('access-22',1,'B'),
('access-23',1,'A'),
('access-24',1,'D'),
('access-25',1,'C'),
('access-26',1,'B'),
('access-27',1,'A'),
('access-28',1,'D'),
('access-29',1,'C'),
('access-30',1,'C'),
('access-31',1,'B'),
('access-32',1,'A'),
('access-33',1,'D'),
('access-34',1,'C'),
('access-35',1,'B'),
('access-36',1,'A'),
('access-37',1,'D'),
('access-38',1,'C'),
('access-39',1,'B'),
('access-40',1,'B'),
('access-41',1,'A'),
('access-42',1,'D'),
('access-43',1,'C'),
('access-44',1,'B'),
('access-45',1,'A'),
('access-46',1,'D'),
('access-47',1,'C'),
('access-48',1,'B'),
('access-49',1,'A'),
('access-50',1,'A'),
('access-51',1,'D'),
('access-52',1,'C'),
('access-53',1,'B'),
('access-54',1,'A'),
('access-55',1,'D'),
('access-56',1,'C'),
('access-57',1,'B'),
('access-58',1,'A'),
('access-59',1,'D'),
('access-60',1,'D'),
('access-61',1,'C'),
('access-62',1,'B'),
('access-63',1,'A'),
('route-01',1,'D'),
('route-02',1,'C'),
('route-03',1,'B'),
('route-04',1,'A'),
('route-05',1,'D'),
('route-06',1,'C'),
('route-07',1,'B'),
('route-08',1,'A'),
('route-09',1,'D'),
('route-10',1,'D'),
('route-11',1,'C'),
('route-12',1,'B'),
('route-13',1,'A'),
('route-14',1,'D'),
('route-15',1,'C'),
('route-16',1,'B'),
('route-17',1,'A'),
('route-18',1,'D'),
('route-19',1,'C'),
('route-20',1,'C'),
('route-21',1,'B'),
('route-22',1,'A'),
('route-23',1,'D'),
('route-24',1,'C'),
('route-25',1,'B'),
('route-26',1,'A'),
('route-27',1,'D'),
('route-28',1,'C'),
('route-29',1,'B'),
('route-30',1,'B'),
('route-31',1,'A'),
('route-32',1,'D'),
('route-33',1,'C'),
('route-34',1,'B'),
('route-35',1,'A'),
('route-36',1,'D'),
('route-37',1,'C'),
('route-38',1,'B'),
('route-39',1,'A'),
('route-40',1,'A'),
('route-41',1,'D'),
('route-42',1,'C'),
('route-43',1,'B'),
('route-44',1,'A'),
('route-45',1,'D'),
('route-46',1,'C'),
('route-47',1,'B'),
('route-48',1,'A'),
('route-49',1,'D'),
('route-50',1,'D'),
('route-51',1,'C'),
('route-52',1,'B'),
('route-53',1,'A'),
('route-54',1,'D'),
('route-55',1,'C'),
('route-56',1,'B'),
('route-57',1,'A'),
('route-58',1,'D'),
('route-59',1,'C'),
('route-60',1,'C'),
('service-01',1,'B'),
('service-02',1,'A'),
('service-03',1,'D'),
('service-04',1,'C'),
('service-05',1,'B'),
('service-06',1,'A'),
('service-07',1,'D'),
('service-08',1,'C'),
('service-09',1,'B'),
('service-10',1,'B'),
('service-11',1,'A'),
('service-12',1,'D'),
('service-13',1,'C'),
('service-14',1,'B'),
('service-15',1,'A'),
('service-16',1,'D'),
('service-17',1,'C'),
('service-18',1,'B'),
('service-19',1,'A'),
('service-20',1,'A'),
('service-21',1,'D'),
('service-22',1,'C'),
('service-23',1,'B'),
('service-24',1,'A'),
('service-25',1,'D'),
('service-26',1,'C'),
('service-27',1,'B'),
('service-28',1,'A'),
('service-29',1,'D'),
('service-30',1,'D'),
('service-31',1,'C'),
('service-32',1,'B'),
('service-33',1,'A'),
('service-34',1,'D'),
('service-35',1,'C'),
('service-36',1,'B'),
('security-01',1,'C'),
('security-02',1,'B'),
('security-03',1,'A'),
('security-04',1,'D'),
('security-05',1,'C'),
('security-06',1,'B'),
('security-07',1,'A'),
('security-08',1,'D'),
('security-09',1,'C'),
('security-10',1,'C'),
('security-11',1,'B'),
('security-12',1,'A'),
('security-13',1,'D'),
('security-14',1,'C'),
('security-15',1,'B'),
('security-16',1,'A'),
('security-17',1,'D'),
('security-18',1,'C'),
('security-19',1,'B'),
('security-20',1,'B'),
('security-21',1,'A'),
('security-22',1,'D'),
('security-23',1,'C'),
('security-24',1,'B'),
('security-25',1,'A'),
('security-26',1,'D'),
('security-27',1,'C'),
('security-28',1,'B'),
('security-29',1,'A'),
('security-30',1,'A'),
('security-31',1,'D'),
('security-32',1,'C'),
('security-33',1,'B'),
('security-34',1,'A'),
('security-35',1,'D'),
('security-36',1,'C'),
('security-37',1,'B'),
('security-38',1,'A'),
('security-39',1,'D'),
('security-40',1,'D'),
('security-41',1,'C'),
('security-42',1,'B'),
('security-43',1,'A'),
('security-44',1,'D'),
('security-45',1,'C');
commit;
