# Implementation Plan

## Current Implementation Status

The current codebase contains a portfolio mockup foundation:

- Next.js App Router, TypeScript, Tailwind and validation scripts are configured.
- Static mock data is used for the visible UI.
- Optional SQLite schema and seed files document the local data shape.
- Initial Zod schemas and pure services exist for briefings, pricing, proposal statuses and generated proposal draft validation.
- Unit tests cover pricing, status transitions and LLM draft parsing.
- Home, dashboard and new proposal briefing pages are visible and populated with demo data.

Still pending from the broader Phase 1/2 plan:

- Real authentication.
- Runtime database persistence.
- Proposal persistence, generation routes/actions and PDF/public sharing flows.

## Phase 1: Foundation

Deliverables:

- Next.js App Router project with TypeScript and Tailwind.
- Strict linting, formatting and type-checking.
- Static mock proposal data.
- Basic layout, dashboard shell and mock briefing page.

Acceptance criteria:

- App runs locally.
- Type-check and lint pass.
- App does not require credentials for the portfolio demo.
- No secrets are committed.

## Phase 2: Local Data Model

Deliverables:

- SQLite schema for core proposal tables.
- Seed data for portfolio examples.
- Documentation that explains the mock data model.

Acceptance criteria:

- SQLite schema and seed can be loaded locally.
- No production customer data is included.
- Documentation matches the schema.

## Phase 3: Briefing and Proposal Drafts

Deliverables:

- Template selection.
- Briefing form.
- Pricing estimate service.
- Proposal creation without AI dependency.
- Proposal list and detail editor.

Acceptance criteria:

- User can create a draft proposal manually.
- Pricing calculations are covered by unit tests.
- Proposal status starts as `draft`.

## Phase 4: AI Generation

Deliverables:

- LLM provider adapter.
- Prompt versioning.
- Structured output validation.
- Generation event logging.
- Retry or repair behavior for malformed JSON.

Acceptance criteria:

- User can generate a structured proposal from a valid briefing.
- Invalid LLM output does not corrupt proposal data.
- Generation failures produce useful user-facing errors.

## Phase 5: PDF and Public Sharing

Deliverables:

- Public proposal page.
- Share token creation.
- PDF renderer.
- Optional file storage integration.
- Acceptance form.

Acceptance criteria:

- Sent proposals are accessible through public share links.
- Draft proposals are not publicly visible.
- Public acceptance updates status to `accepted`.
- PDF export uses saved proposal data.

## Phase 6: Polish and Portfolio Readiness

Deliverables:

- Empty states and loading states.
- Responsive desktop and mobile layouts.
- Accessible form labels and errors.
- README updates with real setup commands.
- Screenshots or demo GIF after UI is implemented.

Acceptance criteria:

- Critical Playwright flow passes.
- Public page works on desktop and mobile.
- Documentation matches implemented routes and commands.
- Repository can be reviewed without private context.

## Initial Test Matrix

| Area | Test Type | Coverage |
| --- | --- | --- |
| Pricing service | Unit | Base price, multipliers, rush fee and budget range. |
| Proposal statuses | Unit | Allowed and blocked transitions. |
| AI parser | Unit | Valid JSON, malformed JSON and validation failures. |
| SQLite schema | Schema smoke | Tables and seed data load locally. |
| Proposal flow | E2E | Briefing to generated draft to sent proposal. |
| Acceptance flow | E2E | Public page to accepted status. |

## Definition of Done

- Feature is documented.
- Inputs are schema-validated.
- Errors are handled explicitly.
- Tests cover the risky behavior.
- SQLite schema and docs are updated for data-shape changes.
- UI works on desktop and mobile.
- No generated or secret files are committed.
