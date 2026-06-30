# ProposalForge

ProposalForge is a public portfolio mockup for a proposal-generation SaaS. It shows how freelancers and small agencies could turn a client brief into a structured commercial proposal with scope, timeline, pricing and next steps.

This repository is intentionally simple: the app is a visible Next.js demo with static mock data. It does not require Supabase, authentication, a live database, an LLM provider or a PDF service.

## Current Status

Implemented:

- Static Next.js App Router UI.
- Mock dashboard with sample proposal pipeline data.
- Prefilled briefing form mockup.
- Core TypeScript/Zod domain code for briefings, pricing, generated draft validation and proposal status rules.
- Unit tests for critical pure logic.
- Optional SQLite schema and seed files under [`sqlite/`](sqlite/) for local experimentation.

Not implemented:

- Real authentication.
- Runtime database reads/writes.
- LLM calls.
- PDF export.
- Public proposal acceptance flow.
- Production deployment infrastructure.

## Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Zod
- Vitest
- SQLite SQL files for optional local data modeling

## Local Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The app runs with the default `.env.example` values. No real credentials are needed.

## SQLite

SQLite is included only as a lightweight local schema reference for the portfolio project. The current UI does not open a database connection.

Optional local experiment:

```bash
sqlite3 proposalforge.db < sqlite/schema.sql
sqlite3 proposalforge.db < sqlite/seed.sql
```

The SQLite files model templates, proposals, briefs, proposal sections, line items and events. They are intentionally small so reviewers can understand the data shape without provisioning external services.

## Validation Commands

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm audit
```

## Documentation

- [`docs/PRODUCT_SPEC.md`](docs/PRODUCT_SPEC.md): Product goals and user stories.
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md): Current mockup architecture.
- [`docs/DATABASE.md`](docs/DATABASE.md): SQLite data model.
- [`docs/API.md`](docs/API.md): Future API contract notes.
- [`docs/AI_GENERATION.md`](docs/AI_GENERATION.md): Future generation workflow notes.
- [`docs/PRICING.md`](docs/PRICING.md): Pricing calculation model.
- [`docs/IMPLEMENTATION_PLAN.md`](docs/IMPLEMENTATION_PLAN.md): Portfolio-first implementation phases.
- [`docs/QUALITY_CHECKLIST.md`](docs/QUALITY_CHECKLIST.md): Public repository checklist.

## Security

- Do not commit `.env.local`, `.env` or real credentials.
- The current app uses static mock data and does not require secrets.
- Treat any future LLM output as untrusted until validated.
- Keep future server-only credentials out of client components and `NEXT_PUBLIC_*` variables.

## Portfolio Scope

ProposalForge is designed to be readable, visible and easy to review on GitHub. It demonstrates product structure, UI direction, validation, test coverage and a simple data model without pretending to be a finished SaaS.

## License

No open-source license has been selected yet. The repository can be reviewed publicly as a portfolio demo, but reuse rights should be clarified before treating it as an open-source package.
