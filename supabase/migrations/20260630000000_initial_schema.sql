-- ProposalForge initial Supabase schema.
-- Apply manually in the Supabase SQL editor or with `supabase db push`.
-- No credentials are required in this file.

create extension if not exists pgcrypto with schema extensions;

do $$
begin
  create type public.proposal_status as enum ('draft', 'sent', 'accepted', 'rejected');
exception
  when duplicate_object then null;
end $$;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  company_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.proposal_templates (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9][a-z0-9-]*$'),
  name text not null check (length(btrim(name)) > 0),
  description text not null default '',
  default_sections jsonb not null default '[]'::jsonb check (jsonb_typeof(default_sections) = 'array'),
  default_deliverables jsonb not null default '[]'::jsonb check (jsonb_typeof(default_deliverables) = 'array'),
  is_active boolean not null default true
);

create table if not exists public.proposals (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  template_id uuid references public.proposal_templates(id) on delete set null,
  title text not null check (length(btrim(title)) > 0),
  client_name text not null check (length(btrim(client_name)) > 0),
  client_email text,
  status public.proposal_status not null default 'draft',
  currency text not null default 'USD' check (currency ~ '^[A-Z]{3}$'),
  subtotal_amount numeric(12, 2) not null default 0 check (subtotal_amount >= 0),
  discount_amount numeric(12, 2) not null default 0 check (discount_amount >= 0),
  tax_amount numeric(12, 2) not null default 0 check (tax_amount >= 0),
  total_amount numeric(12, 2) not null default 0 check (total_amount >= 0),
  valid_until date,
  share_token text,
  sent_at timestamptz,
  accepted_at timestamptz,
  rejected_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.proposal_briefs (
  proposal_id uuid primary key references public.proposals(id) on delete cascade,
  client_type text not null,
  problem text not null,
  objective text not null,
  budget_min numeric(12, 2) check (budget_min >= 0),
  budget_max numeric(12, 2) check (budget_max >= 0),
  deadline date,
  services text[] not null default '{}',
  constraints text,
  raw_notes text,
  constraint proposal_briefs_budget_range check (
    budget_min is null or budget_max is null or budget_min <= budget_max
  )
);

create table if not exists public.proposal_sections (
  id uuid primary key default gen_random_uuid(),
  proposal_id uuid not null references public.proposals(id) on delete cascade,
  position integer not null check (position >= 0),
  kind text not null check (length(btrim(kind)) > 0),
  title text not null check (length(btrim(title)) > 0),
  content_md text not null default '',
  metadata jsonb not null default '{}'::jsonb check (jsonb_typeof(metadata) = 'object')
);

create table if not exists public.proposal_deliverables (
  id uuid primary key default gen_random_uuid(),
  proposal_id uuid not null references public.proposals(id) on delete cascade,
  position integer not null check (position >= 0),
  category text not null check (length(btrim(category)) > 0),
  title text not null check (length(btrim(title)) > 0),
  description text not null default '',
  quantity numeric(10, 2) not null default 1 check (quantity > 0),
  unit_price numeric(12, 2) not null default 0 check (unit_price >= 0),
  amount numeric(12, 2) not null default 0 check (amount >= 0)
);

create table if not exists public.proposal_milestones (
  id uuid primary key default gen_random_uuid(),
  proposal_id uuid not null references public.proposals(id) on delete cascade,
  position integer not null check (position >= 0),
  title text not null check (length(btrim(title)) > 0),
  description text not null default '',
  duration_days integer not null check (duration_days > 0),
  starts_after_days integer not null default 0 check (starts_after_days >= 0)
);

create table if not exists public.proposal_events (
  id uuid primary key default gen_random_uuid(),
  proposal_id uuid not null references public.proposals(id) on delete cascade,
  actor_type text not null check (actor_type in ('owner', 'recipient', 'system')),
  event_type text not null check (
    event_type in (
      'created',
      'generated',
      'edited',
      'sent',
      'viewed',
      'accepted',
      'rejected',
      'pdf_exported'
    )
  ),
  metadata jsonb not null default '{}'::jsonb check (jsonb_typeof(metadata) = 'object'),
  created_at timestamptz not null default now()
);

create table if not exists public.proposal_acceptances (
  id uuid primary key default gen_random_uuid(),
  proposal_id uuid not null references public.proposals(id) on delete cascade,
  signer_name text not null check (length(btrim(signer_name)) > 0),
  signer_email text not null check (length(btrim(signer_email)) > 0),
  signature_text text not null check (length(btrim(signature_text)) > 0),
  ip_hash text,
  user_agent text,
  accepted_terms_at timestamptz not null,
  created_at timestamptz not null default now()
);

create table if not exists public.llm_generations (
  id uuid primary key default gen_random_uuid(),
  proposal_id uuid not null references public.proposals(id) on delete cascade,
  provider text not null check (length(btrim(provider)) > 0),
  model text not null check (length(btrim(model)) > 0),
  prompt_version text not null check (length(btrim(prompt_version)) > 0),
  status text not null check (status in ('succeeded', 'failed', 'repaired')),
  input_hash text not null,
  output_json jsonb,
  token_usage jsonb,
  error_message text,
  created_at timestamptz not null default now()
);

create table if not exists public.pdf_exports (
  id uuid primary key default gen_random_uuid(),
  proposal_id uuid not null references public.proposals(id) on delete cascade,
  storage_path text not null check (length(btrim(storage_path)) > 0),
  proposal_version integer not null default 1 check (proposal_version > 0),
  file_size_bytes integer check (file_size_bytes is null or file_size_bytes >= 0),
  created_at timestamptz not null default now()
);

create table if not exists public.pricing_rules (
  id uuid primary key default gen_random_uuid(),
  template_id uuid not null references public.proposal_templates(id) on delete cascade,
  service_key text not null check (service_key ~ '^[a-z0-9][a-z0-9-]*$'),
  base_price numeric(12, 2) not null check (base_price >= 0),
  complexity_multiplier numeric(6, 3) not null default 1 check (complexity_multiplier > 0),
  rush_multiplier numeric(6, 3) not null default 1 check (rush_multiplier > 0),
  is_active boolean not null default true,
  unique (template_id, service_key)
);

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists set_proposals_updated_at on public.proposals;
create trigger set_proposals_updated_at
before update on public.proposals
for each row execute function public.set_updated_at();

create index if not exists proposals_owner_updated_idx
  on public.proposals (owner_id, updated_at desc);
create index if not exists proposals_owner_status_idx
  on public.proposals (owner_id, status);
create unique index if not exists proposals_share_token_unique_idx
  on public.proposals (share_token)
  where share_token is not null;
create index if not exists proposal_sections_proposal_position_idx
  on public.proposal_sections (proposal_id, position);
create index if not exists proposal_deliverables_proposal_position_idx
  on public.proposal_deliverables (proposal_id, position);
create index if not exists proposal_milestones_proposal_position_idx
  on public.proposal_milestones (proposal_id, position);
create index if not exists proposal_events_proposal_created_idx
  on public.proposal_events (proposal_id, created_at desc);
create index if not exists proposal_acceptances_proposal_created_idx
  on public.proposal_acceptances (proposal_id, created_at desc);
create index if not exists llm_generations_proposal_created_idx
  on public.llm_generations (proposal_id, created_at desc);
create index if not exists pdf_exports_proposal_created_idx
  on public.pdf_exports (proposal_id, created_at desc);
create index if not exists pricing_rules_template_active_idx
  on public.pricing_rules (template_id, is_active);

alter table public.profiles enable row level security;
alter table public.proposal_templates enable row level security;
alter table public.proposals enable row level security;
alter table public.proposal_briefs enable row level security;
alter table public.proposal_sections enable row level security;
alter table public.proposal_deliverables enable row level security;
alter table public.proposal_milestones enable row level security;
alter table public.proposal_events enable row level security;
alter table public.proposal_acceptances enable row level security;
alter table public.llm_generations enable row level security;
alter table public.pdf_exports enable row level security;
alter table public.pricing_rules enable row level security;

drop policy if exists profiles_select_own on public.profiles;
create policy profiles_select_own
  on public.profiles for select
  to authenticated
  using (id = (select auth.uid()));

drop policy if exists profiles_insert_own on public.profiles;
create policy profiles_insert_own
  on public.profiles for insert
  to authenticated
  with check (id = (select auth.uid()));

drop policy if exists profiles_update_own on public.profiles;
create policy profiles_update_own
  on public.profiles for update
  to authenticated
  using (id = (select auth.uid()))
  with check (id = (select auth.uid()));

drop policy if exists proposal_templates_select_active on public.proposal_templates;
create policy proposal_templates_select_active
  on public.proposal_templates for select
  to authenticated
  using (is_active);

drop policy if exists proposals_select_own on public.proposals;
create policy proposals_select_own
  on public.proposals for select
  to authenticated
  using (owner_id = (select auth.uid()));

drop policy if exists proposals_insert_own on public.proposals;
create policy proposals_insert_own
  on public.proposals for insert
  to authenticated
  with check (owner_id = (select auth.uid()));

drop policy if exists proposals_update_own on public.proposals;
create policy proposals_update_own
  on public.proposals for update
  to authenticated
  using (owner_id = (select auth.uid()) and status in ('draft', 'sent'))
  with check (owner_id = (select auth.uid()));

drop policy if exists proposals_delete_own_unaccepted on public.proposals;
create policy proposals_delete_own_unaccepted
  on public.proposals for delete
  to authenticated
  using (owner_id = (select auth.uid()) and status <> 'accepted');

drop policy if exists proposal_briefs_select_own on public.proposal_briefs;
create policy proposal_briefs_select_own
  on public.proposal_briefs for select
  to authenticated
  using (
    exists (
      select 1 from public.proposals p
      where p.id = proposal_id and p.owner_id = (select auth.uid())
    )
  );

drop policy if exists proposal_briefs_insert_own on public.proposal_briefs;
create policy proposal_briefs_insert_own
  on public.proposal_briefs for insert
  to authenticated
  with check (
    exists (
      select 1 from public.proposals p
      where p.id = proposal_id and p.owner_id = (select auth.uid())
    )
  );

drop policy if exists proposal_briefs_update_own on public.proposal_briefs;
create policy proposal_briefs_update_own
  on public.proposal_briefs for update
  to authenticated
  using (
    exists (
      select 1 from public.proposals p
      where p.id = proposal_id and p.owner_id = (select auth.uid())
    )
  )
  with check (
    exists (
      select 1 from public.proposals p
      where p.id = proposal_id and p.owner_id = (select auth.uid())
    )
  );

drop policy if exists proposal_briefs_delete_own on public.proposal_briefs;
create policy proposal_briefs_delete_own
  on public.proposal_briefs for delete
  to authenticated
  using (
    exists (
      select 1 from public.proposals p
      where p.id = proposal_id and p.owner_id = (select auth.uid())
    )
  );

drop policy if exists proposal_sections_select_own on public.proposal_sections;
create policy proposal_sections_select_own
  on public.proposal_sections for select
  to authenticated
  using (
    exists (
      select 1 from public.proposals p
      where p.id = proposal_id and p.owner_id = (select auth.uid())
    )
  );

drop policy if exists proposal_sections_insert_own on public.proposal_sections;
create policy proposal_sections_insert_own
  on public.proposal_sections for insert
  to authenticated
  with check (
    exists (
      select 1 from public.proposals p
      where p.id = proposal_id and p.owner_id = (select auth.uid())
    )
  );

drop policy if exists proposal_sections_update_own on public.proposal_sections;
create policy proposal_sections_update_own
  on public.proposal_sections for update
  to authenticated
  using (
    exists (
      select 1 from public.proposals p
      where p.id = proposal_id and p.owner_id = (select auth.uid())
    )
  )
  with check (
    exists (
      select 1 from public.proposals p
      where p.id = proposal_id and p.owner_id = (select auth.uid())
    )
  );

drop policy if exists proposal_sections_delete_own on public.proposal_sections;
create policy proposal_sections_delete_own
  on public.proposal_sections for delete
  to authenticated
  using (
    exists (
      select 1 from public.proposals p
      where p.id = proposal_id and p.owner_id = (select auth.uid())
    )
  );

drop policy if exists proposal_deliverables_select_own on public.proposal_deliverables;
create policy proposal_deliverables_select_own
  on public.proposal_deliverables for select
  to authenticated
  using (
    exists (
      select 1 from public.proposals p
      where p.id = proposal_id and p.owner_id = (select auth.uid())
    )
  );

drop policy if exists proposal_deliverables_insert_own on public.proposal_deliverables;
create policy proposal_deliverables_insert_own
  on public.proposal_deliverables for insert
  to authenticated
  with check (
    exists (
      select 1 from public.proposals p
      where p.id = proposal_id and p.owner_id = (select auth.uid())
    )
  );

drop policy if exists proposal_deliverables_update_own on public.proposal_deliverables;
create policy proposal_deliverables_update_own
  on public.proposal_deliverables for update
  to authenticated
  using (
    exists (
      select 1 from public.proposals p
      where p.id = proposal_id and p.owner_id = (select auth.uid())
    )
  )
  with check (
    exists (
      select 1 from public.proposals p
      where p.id = proposal_id and p.owner_id = (select auth.uid())
    )
  );

drop policy if exists proposal_deliverables_delete_own on public.proposal_deliverables;
create policy proposal_deliverables_delete_own
  on public.proposal_deliverables for delete
  to authenticated
  using (
    exists (
      select 1 from public.proposals p
      where p.id = proposal_id and p.owner_id = (select auth.uid())
    )
  );

drop policy if exists proposal_milestones_select_own on public.proposal_milestones;
create policy proposal_milestones_select_own
  on public.proposal_milestones for select
  to authenticated
  using (
    exists (
      select 1 from public.proposals p
      where p.id = proposal_id and p.owner_id = (select auth.uid())
    )
  );

drop policy if exists proposal_milestones_insert_own on public.proposal_milestones;
create policy proposal_milestones_insert_own
  on public.proposal_milestones for insert
  to authenticated
  with check (
    exists (
      select 1 from public.proposals p
      where p.id = proposal_id and p.owner_id = (select auth.uid())
    )
  );

drop policy if exists proposal_milestones_update_own on public.proposal_milestones;
create policy proposal_milestones_update_own
  on public.proposal_milestones for update
  to authenticated
  using (
    exists (
      select 1 from public.proposals p
      where p.id = proposal_id and p.owner_id = (select auth.uid())
    )
  )
  with check (
    exists (
      select 1 from public.proposals p
      where p.id = proposal_id and p.owner_id = (select auth.uid())
    )
  );

drop policy if exists proposal_milestones_delete_own on public.proposal_milestones;
create policy proposal_milestones_delete_own
  on public.proposal_milestones for delete
  to authenticated
  using (
    exists (
      select 1 from public.proposals p
      where p.id = proposal_id and p.owner_id = (select auth.uid())
    )
  );

drop policy if exists proposal_events_select_own on public.proposal_events;
create policy proposal_events_select_own
  on public.proposal_events for select
  to authenticated
  using (
    exists (
      select 1 from public.proposals p
      where p.id = proposal_id and p.owner_id = (select auth.uid())
    )
  );

drop policy if exists proposal_events_insert_own on public.proposal_events;
create policy proposal_events_insert_own
  on public.proposal_events for insert
  to authenticated
  with check (
    exists (
      select 1 from public.proposals p
      where p.id = proposal_id and p.owner_id = (select auth.uid())
    )
  );

drop policy if exists proposal_acceptances_select_own on public.proposal_acceptances;
create policy proposal_acceptances_select_own
  on public.proposal_acceptances for select
  to authenticated
  using (
    exists (
      select 1 from public.proposals p
      where p.id = proposal_id and p.owner_id = (select auth.uid())
    )
  );

drop policy if exists llm_generations_select_own on public.llm_generations;
create policy llm_generations_select_own
  on public.llm_generations for select
  to authenticated
  using (
    exists (
      select 1 from public.proposals p
      where p.id = proposal_id and p.owner_id = (select auth.uid())
    )
  );

drop policy if exists llm_generations_insert_own on public.llm_generations;
create policy llm_generations_insert_own
  on public.llm_generations for insert
  to authenticated
  with check (
    exists (
      select 1 from public.proposals p
      where p.id = proposal_id and p.owner_id = (select auth.uid())
    )
  );

drop policy if exists pdf_exports_select_own on public.pdf_exports;
create policy pdf_exports_select_own
  on public.pdf_exports for select
  to authenticated
  using (
    exists (
      select 1 from public.proposals p
      where p.id = proposal_id and p.owner_id = (select auth.uid())
    )
  );

drop policy if exists pdf_exports_insert_own on public.pdf_exports;
create policy pdf_exports_insert_own
  on public.pdf_exports for insert
  to authenticated
  with check (
    exists (
      select 1 from public.proposals p
      where p.id = proposal_id and p.owner_id = (select auth.uid())
    )
  );

drop policy if exists pricing_rules_select_active on public.pricing_rules;
create policy pricing_rules_select_active
  on public.pricing_rules for select
  to authenticated
  using (
    is_active and exists (
      select 1 from public.proposal_templates t
      where t.id = template_id and t.is_active
    )
  );

create or replace function public.get_public_proposal_by_share_token(share_token_input text)
returns table (
  proposal_id uuid,
  title text,
  client_name text,
  status public.proposal_status,
  currency text,
  total_amount numeric,
  valid_until date,
  sent_at timestamptz
)
language sql
stable
security definer
set search_path = public
as $$
  select
    p.id,
    p.title,
    p.client_name,
    p.status,
    p.currency,
    p.total_amount,
    p.valid_until,
    p.sent_at
  from public.proposals p
  where p.share_token = share_token_input
    and p.share_token is not null
    and p.status in ('sent', 'accepted')
    and (p.valid_until is null or p.valid_until >= current_date)
  limit 1;
$$;

revoke all on function public.get_public_proposal_by_share_token(text) from public;
grant execute on function public.get_public_proposal_by_share_token(text) to anon, authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('proposal-pdfs', 'proposal-pdfs', false, 10485760, array['application/pdf'])
on conflict (id) do update
set
  public = false,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;
