# ProposalForge

**A polished portfolio mockup for a commercial proposal workspace.**

ProposalForge shows how a freelancer or small agency could turn a qualified client brief into a structured proposal preview with scope, timeline, pricing and next steps. The project is intentionally lightweight: it is a visible Next.js demo with static mock data, designed to be easy to review on GitHub and easy to run locally.

This is not pretending to be a finished SaaS. It is a portfolio-quality product mockup that demonstrates product thinking, UI direction, route structure and documentation discipline without wiring in a real backend.

## What You Can Explore

| Route            | What it shows                                                                                              |
| ---------------- | ---------------------------------------------------------------------------------------------------------- |
| `/`              | A first-fold portfolio landing page with the product promise, demo boundaries and proposal preview.        |
| `/dashboard`     | A static workspace dashboard with proposal status cards, pipeline records and a selected proposal preview. |
| `/proposals/new` | A prefilled briefing form that shows how client inputs would be gathered before proposal generation.       |

## Portfolio Highlights

- Clear first-fold explanation of the product and its demo boundaries.
- Modern neumorphic UI direction with soft surfaces, restrained depth and readable contrast.
- Static proposal pipeline covering `Draft`, `Sent` and `Accepted` states.
- Prefilled briefing flow with realistic client, budget, service and constraint fields.
- Documentation that separates the current mockup from future production concerns.
- No required secrets, accounts, hosted database, LLM provider or PDF service.

## Current Scope

Implemented:

- Static Next.js App Router UI.
- Home page, dashboard and briefing routes.
- Local TypeScript mock data.
- Demo-safe environment example.
- Architecture and product documentation for future build-out.

Intentionally not implemented in this portfolio phase:

- Authentication or user accounts.
- Runtime database reads or writes.
- Supabase or any hosted backend.
- LLM runtime integration.
- PDF export.
- Public proposal acceptance flow.
- Real customer data.

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS

## Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The app does not need private credentials. If you want an environment file for local consistency, copy the demo-safe example:

```bash
cp .env.example .env.local
```

## Quality Commands

```bash
npm run lint
npm run typecheck
npm run build
npm run format:check
```

The current lean mockup has no automated test suite because the domain logic was intentionally removed from this public portfolio phase. Tests should be added when pricing rules, status transitions, persistence or generated proposal parsing are implemented.

## Repository Map

```text
src/
  app/                     Route-level UI for the portfolio demo
  components/              Shared layout and UI primitives
  data/mock-proposals.ts   Static proposal and briefing examples
docs/                      Product, architecture and future implementation notes
```

## Documentation

- [`docs/PRODUCT_SPEC.md`](docs/PRODUCT_SPEC.md): Product goals, audience and expected workflows.
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md): Current static architecture and future production boundaries.
- [`docs/DATABASE.md`](docs/DATABASE.md): Proposed future data model.
- [`docs/API.md`](docs/API.md): Future API and server action notes.
- [`docs/AI_GENERATION.md`](docs/AI_GENERATION.md): Future proposal generation workflow.
- [`docs/PRICING.md`](docs/PRICING.md): Proposed pricing model for a later implementation phase.
- [`docs/IMPLEMENTATION_PLAN.md`](docs/IMPLEMENTATION_PLAN.md): Portfolio-first build plan.
- [`docs/QUALITY_CHECKLIST.md`](docs/QUALITY_CHECKLIST.md): Public repository review checklist.

## Design Direction

ProposalForge uses a restrained neumorphic direction: tactile surfaces, subtle inset and raised shadows, warm neutral backgrounds and grounded green accents. The goal is to feel like a premium SaaS workspace without sacrificing contrast, scanning speed or mobile readability.

## Security Notes

- Do not commit `.env.local`, `.env` or real credentials.
- The current demo uses static mock data only.
- Future LLM output should be treated as untrusted until validated.
- Future server-only credentials must stay out of client components and `NEXT_PUBLIC_*` variables.

## License

No open-source license has been selected yet. The repository can be reviewed publicly as a portfolio demo, but reuse rights should be clarified before treating it as an open-source package.
