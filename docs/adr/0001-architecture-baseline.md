# ADR 0001: Portfolio Mockup Baseline

## Status

Accepted

## Context

ProposalForge is a public GitHub portfolio project. It needs to be visible, easy to run and honest about scope. A hosted backend, authentication provider and production database would add operational burden that is not necessary for demonstrating the product idea.

## Decision

Use a static Next.js App Router mockup with local TypeScript data and an optional SQLite schema. The app must run without external services, real credentials or provisioned infrastructure.

The baseline includes:

- Next.js and TypeScript for the UI.
- Static mock proposal data in source control.
- Zod schemas and pure domain services for validation examples.
- SQLite SQL files for local data modeling only.
- Documentation that labels auth, persistence, LLM generation and PDF export as future work.

## Consequences

- Reviewers can run the project immediately.
- The repository is safer for public portfolio use because it does not need secrets.
- SQLite keeps the data model inspectable without requiring a hosted service.
- Future production work will need separate architecture decisions for auth, persistence, file storage and authorization.
