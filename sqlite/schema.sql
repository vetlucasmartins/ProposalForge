-- ProposalForge SQLite schema for the public portfolio mockup.
-- This file is optional and is not used by the current Next.js UI at runtime.

pragma foreign_keys = on;

create table if not exists proposal_templates (
  id text primary key,
  slug text not null unique,
  name text not null,
  description text not null default '',
  created_at text not null default current_timestamp
);

create table if not exists proposals (
  id text primary key,
  template_id text references proposal_templates(id) on delete set null,
  title text not null,
  client_name text not null,
  client_email text,
  status text not null default 'draft' check (status in ('draft', 'sent', 'accepted', 'rejected')),
  currency text not null default 'USD',
  total_amount_cents integer not null default 0 check (total_amount_cents >= 0),
  valid_until text,
  created_at text not null default current_timestamp,
  updated_at text not null default current_timestamp
);

create table if not exists proposal_briefs (
  proposal_id text primary key references proposals(id) on delete cascade,
  client_type text not null,
  problem text not null,
  objective text not null,
  budget_min_cents integer check (budget_min_cents is null or budget_min_cents >= 0),
  budget_max_cents integer check (budget_max_cents is null or budget_max_cents >= 0),
  deadline text,
  services_json text not null default '[]',
  constraints text,
  notes text,
  check (
    budget_min_cents is null or budget_max_cents is null or budget_min_cents <= budget_max_cents
  )
);

create table if not exists proposal_sections (
  id text primary key,
  proposal_id text not null references proposals(id) on delete cascade,
  position integer not null check (position >= 0),
  kind text not null,
  title text not null,
  content_md text not null default ''
);

create table if not exists proposal_line_items (
  id text primary key,
  proposal_id text not null references proposals(id) on delete cascade,
  position integer not null check (position >= 0),
  title text not null,
  description text not null default '',
  quantity integer not null default 1 check (quantity > 0),
  unit_price_cents integer not null default 0 check (unit_price_cents >= 0),
  amount_cents integer not null default 0 check (amount_cents >= 0)
);

create table if not exists proposal_events (
  id text primary key,
  proposal_id text not null references proposals(id) on delete cascade,
  event_type text not null,
  note text,
  created_at text not null default current_timestamp
);

create index if not exists proposals_status_updated_idx on proposals(status, updated_at desc);
create index if not exists proposal_sections_position_idx on proposal_sections(proposal_id, position);
create index if not exists proposal_line_items_position_idx on proposal_line_items(proposal_id, position);
create index if not exists proposal_events_created_idx on proposal_events(proposal_id, created_at desc);
