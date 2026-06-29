# ADR 0001: Architecture Baseline

## Status

Accepted as initial planning baseline.

## Context

ProposalForge needs to be a public, portfolio-ready B2B SaaS project. It combines authenticated user workflows, proposal editing, LLM-assisted document generation, pricing calculation, PDF export, public sharing and simple acceptance.

The project needs a structure that is easy to review, avoids unnecessary enterprise complexity and keeps sensitive operations server-side.

## Decision

Use a modular Next.js App Router architecture with Supabase as the backend platform.

Core decisions:

- Next.js App Router for authenticated dashboard routes, public proposal pages and server-side actions.
- TypeScript across the application.
- Supabase Auth for user identity.
- Supabase Postgres with RLS for proposal data.
- Supabase Storage for generated PDFs.
- Domain modules under `features/`.
- Server-only integrations under `server/`.
- LLM provider isolated behind an adapter.
- Proposal data stored as structured records, not only generated Markdown.
- Public sharing implemented through unguessable share tokens and limited read models.

## Consequences

Positive:

- Clear separation between UI, domain logic and external providers.
- Public pages can be optimized without exposing private dashboard data.
- Supabase RLS provides a strong baseline for multi-user data isolation.
- The LLM provider can be swapped later with limited changes.
- The app remains understandable for portfolio review.

Tradeoffs:

- Supabase policies must be carefully tested.
- PDF rendering needs deterministic saved data and storage metadata.
- Structured proposal storage requires more schema design than saving a single document blob.
- Prompt versioning adds process overhead, but improves debugging.

## Revisit When

- Team permissions are added.
- Payments or subscriptions are added.
- Legally stronger e-signature requirements appear.
- Multiple LLM providers become a user-facing feature.
- Proposal versioning becomes mandatory.
