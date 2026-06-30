-- Optional SQLite seed data for the public ProposalForge mockup.
-- Example:
--   sqlite3 proposalforge.db < sqlite/schema.sql
--   sqlite3 proposalforge.db < sqlite/seed.sql

insert or replace into proposal_templates (id, slug, name, description)
values
  ('tpl-web-design', 'web-design', 'Web Design', 'Website redesign or launch proposal.'),
  ('tpl-ai-automation', 'ai-automation', 'AI Automation', 'Workflow automation and AI-assisted operations.'),
  ('tpl-dashboard', 'dashboard', 'Dashboard', 'KPI reporting and operational dashboard proposal.');

insert or replace into proposals (
  id,
  template_id,
  title,
  client_name,
  client_email,
  status,
  currency,
  total_amount_cents,
  valid_until
)
values
  (
    'prop-acme-dashboard',
    'tpl-dashboard',
    'Revenue Operations Dashboard',
    'Acme Studio',
    'buyer@example.com',
    'sent',
    'USD',
    720000,
    '2026-08-30'
  ),
  (
    'prop-northstar-automation',
    'tpl-ai-automation',
    'Lead Qualification Automation',
    'Northstar Clinic',
    'ops@example.com',
    'draft',
    'USD',
    540000,
    '2026-09-15'
  );

insert or replace into proposal_briefs (
  proposal_id,
  client_type,
  problem,
  objective,
  budget_min_cents,
  budget_max_cents,
  deadline,
  services_json,
  constraints,
  notes
)
values
  (
    'prop-acme-dashboard',
    'agency',
    'Reporting is split across spreadsheets and weekly updates are too slow.',
    'Give leadership one reliable dashboard for pipeline, revenue and delivery health.',
    500000,
    800000,
    '2026-08-30',
    '["discovery","dashboard","automation"]',
    'Use existing CRM exports for the first version.',
    'Portfolio mock data only.'
  );

insert or replace into proposal_sections (id, proposal_id, position, kind, title, content_md)
values
  (
    'sec-acme-summary',
    'prop-acme-dashboard',
    1,
    'summary',
    'Executive summary',
    'Build a focused revenue operations dashboard that replaces manual status reporting.'
  ),
  (
    'sec-acme-scope',
    'prop-acme-dashboard',
    2,
    'scope',
    'Scope',
    'Discovery, KPI mapping, dashboard build, review cycle and handoff documentation.'
  );
