# ProposalForge

ProposalForge is a public portfolio mockup for a proposal-generation SaaS. It shows how freelancers and small agencies could turn a client brief into a structured commercial proposal with scope, timeline, pricing and next steps.

This repository is intentionally simple: the app is a visible Next.js demo with static mock data. It does not require Supabase, authentication, a live database, an LLM provider or a PDF service.

## Current Status

Implemented:

- Static Next.js App Router UI.
- Mock dashboard with sample proposal pipeline data.
- Prefilled briefing form mockup.

Not implemented:

- Domain logic (briefings, pricing, draft validation, status rules).
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

## Local Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The app runs with the default `.env.example` values. No real credentials are needed.

## Validation Commands

```bash
npm run lint
npm run typecheck
npm run build
npm audit
```

## Documentation

- [`docs/PRODUCT_SPEC.md`](docs/PRODUCT_SPEC.md): Product goals and user stories.
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md): Current mockup architecture.
- [`docs/DATABASE.md`](docs/DATABASE.md): Proposed data model (not implemented).
- [`docs/API.md`](docs/API.md): Future API contract notes.
- [`docs/AI_GENERATION.md`](docs/AI_GENERATION.md): Future generation workflow notes.
- [`docs/PRICING.md`](docs/PRICING.md): Proposed pricing calculation model (not implemented).
- [`docs/IMPLEMENTATION_PLAN.md`](docs/IMPLEMENTATION_PLAN.md): Portfolio-first implementation phases.
- [`docs/QUALITY_CHECKLIST.md`](docs/QUALITY_CHECKLIST.md): Public repository checklist.

## Security

- Do not commit `.env.local`, `.env` or real credentials.
- The current app uses static mock data and does not require secrets.
- Treat any future LLM output as untrusted until validated.
- Keep future server-only credentials out of client components and `NEXT_PUBLIC_*` variables.

## Portfolio Scope

ProposalForge is designed to be readable, visible and easy to review on GitHub. It demonstrates product structure and UI direction without pretending to be a finished SaaS. The `docs/` folder captures the intended domain, data and pricing design as a spec for future build-out.

## License

No open-source license has been selected yet. The repository can be reviewed publicly as a portfolio demo, but reuse rights should be clarified before treating it as an open-source package.
