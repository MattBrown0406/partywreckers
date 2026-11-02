-- "Ask Matt" listener questions (typed and voice) for the podcast.
-- Written only by the submit-listener-question edge function and read/edited only by
-- the admin + public read functions, all with the service role. RLS is on with no
-- anon/authenticated policies, so the publishable key can't read or write this table.
-- Safe to run more than once.

create table if not exists public.party_wreckers_listener_questions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  question text not null,
  topic text,
  -- null = the listener chose to stay anonymous
  display_name text,
  email text,
  wants_reply boolean not null default false,
  on_air_ok boolean not null,
  audio_path text,
  audio_duration_seconds integer,
  source_path text,
  status text not null default 'new',
  episode_slug text,
  -- the edited wording Matt approves for display on the site
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

-- The public "answered on the show" lookups (per episode, and the latest few).
create index if not exists party_wreckers_listener_questions_public_idx
  on public.party_wreckers_listener_questions (episode_slug, answered_at desc)
  where is_public and status = 'answered';

alter table public.party_wreckers_listener_questions enable row level security;

revoke all on public.party_wreckers_listener_questions from anon, authenticated;
grant all on public.party_wreckers_listener_questions to service_role;

-- Private bucket for voice questions. Objects are only ever read through short-lived
-- signed URLs created by the service role (no storage.objects policies for anon users).
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'listener-question-audio',
  'listener-question-audio',
  false,
  3145728,
  array['audio/webm', 'audio/ogg', 'audio/mp4', 'audio/mpeg', 'audio/wav']
)
on conflict (id) do update set
  public = false,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;
