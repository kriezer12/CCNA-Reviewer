alter table public.topic_progress
  add constraint topic_progress_objective_id_check
  check (objective_id in (
    '1.1', '1.2', '1.3', '1.4', '1.5', '1.6', '1.7', '1.8', '1.9', '1.10', '1.11', '1.12', '1.13',
    '2.1', '2.2', '2.3', '2.4', '2.5', '2.6', '2.7', '2.8', '2.9',
    '3.1', '3.2', '3.3', '3.4', '3.5',
    '4.1', '4.2', '4.3', '4.4', '4.5', '4.6', '4.7', '4.8', '4.9',
    '5.1', '5.2', '5.3', '5.4', '5.5', '5.6', '5.7', '5.8', '5.9', '5.10',
    '6.1', '6.2', '6.3', '6.4', '6.5', '6.6', '6.7'
  ));

alter table public.lab_progress
  add constraint lab_progress_lab_id_check
  check (lab_id in (
    'L01', 'L02', 'L03', 'L04', 'L05', 'L06', 'L07', 'L08', 'L09', 'L10', 'L11', 'L12',
    'L13', 'L14', 'L15', 'L16', 'L17', 'L18', 'L19', 'L20', 'L21', 'L22', 'L23', 'L24'
  ));

alter table public.study_sessions
  add constraint study_sessions_objective_id_check
  check (objective_id is null or objective_id in (
    '1.1', '1.2', '1.3', '1.4', '1.5', '1.6', '1.7', '1.8', '1.9', '1.10', '1.11', '1.12', '1.13',
    '2.1', '2.2', '2.3', '2.4', '2.5', '2.6', '2.7', '2.8', '2.9',
    '3.1', '3.2', '3.3', '3.4', '3.5',
    '4.1', '4.2', '4.3', '4.4', '4.5', '4.6', '4.7', '4.8', '4.9',
    '5.1', '5.2', '5.3', '5.4', '5.5', '5.6', '5.7', '5.8', '5.9', '5.10',
    '6.1', '6.2', '6.3', '6.4', '6.5', '6.6', '6.7'
  ));

alter table public.study_sessions
  add constraint study_sessions_lab_id_check
  check (lab_id is null or lab_id in (
    'L01', 'L02', 'L03', 'L04', 'L05', 'L06', 'L07', 'L08', 'L09', 'L10', 'L11', 'L12',
    'L13', 'L14', 'L15', 'L16', 'L17', 'L18', 'L19', 'L20', 'L21', 'L22', 'L23', 'L24'
  ));

alter table public.quiz_attempts
  add constraint quiz_attempts_quiz_id_check
  check (quiz_id in ('domain-1.0', 'domain-2.0', 'domain-3.0', 'domain-4.0', 'domain-5.0', 'domain-6.0'));

alter table public.quiz_attempts
  add constraint quiz_attempts_topic_id_check
  check (topic_id in (
    '1.1', '1.2', '1.3', '1.4', '1.5', '1.6', '1.7', '1.8', '1.9', '1.10', '1.11', '1.12', '1.13',
    '2.1', '2.2', '2.3', '2.4', '2.5', '2.6', '2.7', '2.8', '2.9',
    '3.1', '3.2', '3.3', '3.4', '3.5',
    '4.1', '4.2', '4.3', '4.4', '4.5', '4.6', '4.7', '4.8', '4.9',
    '5.1', '5.2', '5.3', '5.4', '5.5', '5.6', '5.7', '5.8', '5.9', '5.10',
    '6.1', '6.2', '6.3', '6.4', '6.5', '6.6', '6.7'
  ));
