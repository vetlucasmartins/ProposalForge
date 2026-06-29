-- Optional demo seed data for ProposalForge.
-- Apply after supabase/migrations/20260630000000_initial_schema.sql.

insert into public.proposal_templates (
  id,
  slug,
  name,
  description,
  default_sections,
  default_deliverables,
  is_active
)
values
  (
    '10000000-0000-4000-8000-000000000001',
    'web-design',
    'Web Design',
    'Website redesign or launch proposal with discovery, design, build and handoff.',
    '[
      {"kind": "summary", "title": "Executive summary"},
      {"kind": "scope", "title": "Scope of work"},
      {"kind": "timeline", "title": "Timeline"},
      {"kind": "pricing", "title": "Investment"},
      {"kind": "terms", "title": "Terms"}
    ]'::jsonb,
    '[
      {"category": "design", "title": "Responsive page design"},
      {"category": "build", "title": "Production website build"},
      {"category": "handoff", "title": "Launch checklist and handoff"}
    ]'::jsonb,
    true
  ),
  (
    '10000000-0000-4000-8000-000000000002',
    'ai-automation',
    'AI Automation',
    'Automation proposal for lead handling, internal workflows and AI-assisted operations.',
    '[
      {"kind": "summary", "title": "Executive summary"},
      {"kind": "problem", "title": "Current bottleneck"},
      {"kind": "solution", "title": "Automation plan"},
      {"kind": "timeline", "title": "Implementation timeline"},
      {"kind": "pricing", "title": "Investment"}
    ]'::jsonb,
    '[
      {"category": "automation", "title": "Workflow mapping"},
      {"category": "automation", "title": "AI-assisted process implementation"},
      {"category": "training", "title": "Team handoff session"}
    ]'::jsonb,
    true
  ),
  (
    '10000000-0000-4000-8000-000000000003',
    'crm',
    'CRM',
    'CRM setup proposal covering pipeline design, automation and reporting.',
    '[
      {"kind": "summary", "title": "Executive summary"},
      {"kind": "scope", "title": "CRM scope"},
      {"kind": "deliverables", "title": "Deliverables"},
      {"kind": "timeline", "title": "Timeline"},
      {"kind": "terms", "title": "Terms"}
    ]'::jsonb,
    '[
      {"category": "crm", "title": "Pipeline configuration"},
      {"category": "automation", "title": "Lead routing rules"},
      {"category": "dashboard", "title": "Sales activity report"}
    ]'::jsonb,
    true
  ),
  (
    '10000000-0000-4000-8000-000000000004',
    'saas-mvp',
    'SaaS MVP',
    'MVP proposal for a focused SaaS workflow with authenticated dashboard basics.',
    '[
      {"kind": "summary", "title": "Executive summary"},
      {"kind": "scope", "title": "MVP scope"},
      {"kind": "milestones", "title": "Milestones"},
      {"kind": "pricing", "title": "Investment"},
      {"kind": "terms", "title": "Terms"}
    ]'::jsonb,
    '[
      {"category": "product", "title": "MVP feature map"},
      {"category": "build", "title": "Authenticated app foundation"},
      {"category": "handoff", "title": "Deployment and handoff notes"}
    ]'::jsonb,
    true
  ),
  (
    '10000000-0000-4000-8000-000000000005',
    'dashboard',
    'Dashboard',
    'Dashboard proposal for analytics, operations reporting and KPI visibility.',
    '[
      {"kind": "summary", "title": "Executive summary"},
      {"kind": "problem", "title": "Reporting problem"},
      {"kind": "solution", "title": "Dashboard approach"},
      {"kind": "timeline", "title": "Timeline"},
      {"kind": "pricing", "title": "Investment"}
    ]'::jsonb,
    '[
      {"category": "data", "title": "Source data review"},
      {"category": "dashboard", "title": "KPI dashboard build"},
      {"category": "handoff", "title": "Usage documentation"}
    ]'::jsonb,
    true
  )
on conflict (slug) do update
set
  name = excluded.name,
  description = excluded.description,
  default_sections = excluded.default_sections,
  default_deliverables = excluded.default_deliverables,
  is_active = excluded.is_active;

with pricing_seed(template_slug, service_key, base_price, complexity_multiplier, rush_multiplier) as (
  values
    ('web-design', 'discovery', 750.00, 1.000, 1.150),
    ('web-design', 'web-design', 3000.00, 1.250, 1.200),
    ('web-design', 'analytics', 900.00, 1.100, 1.150),
    ('ai-automation', 'discovery', 900.00, 1.000, 1.150),
    ('ai-automation', 'automation', 3500.00, 1.350, 1.250),
    ('ai-automation', 'crm', 1800.00, 1.200, 1.150),
    ('crm', 'discovery', 750.00, 1.000, 1.150),
    ('crm', 'crm', 2800.00, 1.250, 1.200),
    ('crm', 'dashboard', 1600.00, 1.150, 1.150),
    ('saas-mvp', 'discovery', 1500.00, 1.000, 1.150),
    ('saas-mvp', 'saas-mvp', 12000.00, 1.400, 1.250),
    ('saas-mvp', 'dashboard', 2500.00, 1.150, 1.150),
    ('dashboard', 'discovery', 900.00, 1.000, 1.150),
    ('dashboard', 'dashboard', 4200.00, 1.300, 1.200),
    ('dashboard', 'automation', 1800.00, 1.150, 1.150)
)
insert into public.pricing_rules (
  template_id,
  service_key,
  base_price,
  complexity_multiplier,
  rush_multiplier,
  is_active
)
select
  t.id,
  s.service_key,
  s.base_price,
  s.complexity_multiplier,
  s.rush_multiplier,
  true
from pricing_seed s
join public.proposal_templates t on t.slug = s.template_slug
on conflict (template_id, service_key) do update
set
  base_price = excluded.base_price,
  complexity_multiplier = excluded.complexity_multiplier,
  rush_multiplier = excluded.rush_multiplier,
  is_active = excluded.is_active;
