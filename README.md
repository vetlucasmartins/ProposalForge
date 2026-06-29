# ProposalForge

ProposalForge is a portfolio demo for a proposal-generation SaaS. It shows how freelancers and small agencies could turn a client brief into a structured commercial proposal with scope, deliverables, timeline, pricing and an acceptance path.

## Current Status

This repository contains:

- A clean Next.js app that runs locally without external services.
- Core TypeScript/Zod domain code for briefings, pricing, generated draft validation and proposal status rules.
- Unit tests for critical pure logic.
- Public documentation for product, architecture, API contracts, database design and implementation phases.
- Manual Supabase SQL files under [`supabase/`](supabase/) for future database setup.

The full SaaS is not implemented yet. Supabase runtime auth, proposal persistence, LLM API calls, PDF export and public acceptance routes are future or optional phases. The UI demo does not instantiate Supabase and does not require Supabase credentials to render.

## Portfolio/Demo Scope

This is intended as a public GitHub portfolio project, not a production SaaS deployment. The repository is structured to demonstrate product thinking, security-aware architecture, validation, testing and a clean Next.js foundation.

Implemented in this demo:

- Static marketing/workspace pages.
- Briefing form UI scaffold.
- Pricing estimate domain service.
- Generated proposal draft schema validation.
- Proposal status transition rules.
- Manual Supabase SQL schema and seed files.

Not implemented yet:

- Supabase Auth runtime integration.
- Database-backed proposal persistence.
- LLM provider calls.
- PDF generation.
- Public proposal pages and acceptance writes.
- Production billing, observability or rate limiting.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Zod for validation
- Vitest
- Playwright configuration for future E2E coverage
- Supabase SQL migrations for manual application

## Documentation

- [`docs/PRODUCT_SPEC.md`](docs/PRODUCT_SPEC.md): Product goals, scope, user stories and metrics.
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md): System architecture, modules, routes and data flows.
- [`docs/DATABASE.md`](docs/DATABASE.md): Supabase schema, relationships, indexes and RLS model.
- [`docs/API.md`](docs/API.md): API and server action contracts.
- [`docs/AI_GENERATION.md`](docs/AI_GENERATION.md): LLM workflow, prompt contract and validation rules.
- [`docs/PRICING.md`](docs/PRICING.md): Scope-based pricing model and calculation rules.
- [`docs/IMPLEMENTATION_PLAN.md`](docs/IMPLEMENTATION_PLAN.md): Build phases and acceptance criteria.
- [`docs/QUALITY_CHECKLIST.md`](docs/QUALITY_CHECKLIST.md): Public repository, testing, security and UX checklist.
- [`docs/adr/0001-architecture-baseline.md`](docs/adr/0001-architecture-baseline.md): Baseline architecture decision.

## Local Setup

Install dependencies, create a local environment file and run the app:

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The current UI demo can run with an empty `.env.local`. Fill optional values only when you start wiring future Supabase, LLM or PDF runtime features.

## Environment Variables

Use [`.env.example`](.env.example) as the template:

```bash
cp .env.example .env.local
```

Real credentials must stay in `.env.local` or in your hosting provider's secret store. Do not commit `.env.local`.

Current demo:

- `NEXT_PUBLIC_APP_URL` can stay as `http://localhost:3000`.
- Supabase, LLM, sharing and PDF variables are optional placeholders.

Future Supabase runtime integration:

- `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` are browser-safe public values.
- `SUPABASE_SERVICE_ROLE_KEY` is server-only. Never expose it as a `NEXT_PUBLIC_*` variable and never use it in client components.

## Supabase SQL

Supabase is represented as manual SQL in this phase, not as a required runtime integration.

Apply the files manually in this order when you want to provision a Supabase project:

```bash
supabase/migrations/20260630000000_initial_schema.sql
supabase/seed.sql
```

The migration includes enums, tables, indexes, RLS policies, a narrow public read function and a private `proposal-pdfs` storage bucket. The seed file adds starter proposal templates and pricing rules. See [`supabase/README.md`](supabase/README.md) and [`docs/DATABASE.md`](docs/DATABASE.md).

## Validation Commands

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm audit
```

## Proposed Product Flow

1. A user creates an account or signs in.
2. The user completes a structured client briefing.
3. ProposalForge estimates price from services, complexity, urgency and template.
4. The LLM generates a structured proposal draft.
5. The user edits sections, deliverables, timeline, price and terms.
6. The proposal is exported to PDF or shared with a public link.
7. The client reviews the public page and can accept with a simple signature.
8. Proposal status and event history are updated.

## Security

Repository standards:

- No hardcoded secrets.
- Do not commit `.env.local`, `.env` or real credentials.
- Keep `SUPABASE_SERVICE_ROLE_KEY` server-only.
- Do not expose service-role credentials through `NEXT_PUBLIC_*`.
- Strict TypeScript and schema validation at boundaries.
- Supabase RLS enabled for all user-owned data.
- Deterministic proposal data stored separately from generated prose.
- LLM output treated as untrusted until validated.
- Public proposal access should use unguessable share tokens and limited read models.
- Public acceptance writes should go through a server route with server-only credentials.
- Tests cover pricing, proposal generation parsing and status transitions in this demo.
- Documentation updated with every architectural change.

## License

No open-source license has been selected yet. The repository can be reviewed publicly as a portfolio demo, but reuse rights should be clarified before treating it as an open-source package.
