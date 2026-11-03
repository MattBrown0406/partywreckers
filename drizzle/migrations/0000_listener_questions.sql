create table if not exists public.party_wreckers_listener_questions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  question text not null,
  topic text,
  display_name text,
  email text,
  wants_reply boolean not null default false,
  on_air_ok boolean not null,
  audio_path text,
  audio_duration_seconds integer,
  source_path text,
  status text not null default 'new',
  episode_slug text,
  public_question text,
  is_public boolean not null default false,
  answered_at timestamptz,
  admin_notes text,
  metadata jsonb not null default '{}'::jsonb
);

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'party_wreckers_listener_questions_status_check'
      and conrelid = 'public.party_wreckers_listener_questions'::regclass
  ) then
    alter table public.party_wreckers_listener_questions
      add constraint party_wreckers_listener_questions_status_check
      check (status in ('new', 'shortlisted', 'answered', 'declined'));
  end if;
end $$;

create index if not exists party_wreckers_listener_questions_created_at_idx
  on public.party_wreckers_listener_questions (created_at desc);

create index if not exists party_wreckers_listener_questions_status_idx
  on public.party_wreckers_listener_questions (status, created_at desc);

create index if not exists party_wreckers_listener_questions_public_idx
  on public.party_wreckers_listener_questions (episode_slug, answered_at desc)
  where is_public and status = 'answered';

alter table public.party_wreckers_listener_questions enable row level security;

revoke all on public.party_wreckers_listener_questions from anon, authenticated;
grant all on public.party_wreckers_listener_questions to service_role;