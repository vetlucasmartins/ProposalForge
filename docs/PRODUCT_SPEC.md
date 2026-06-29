# Product Spec

## Summary

ProposalForge is a B2B proposal generator for freelancers and small agencies. It converts a client briefing into a structured proposal with business context, scope, deliverables, timeline, pricing and a simple acceptance flow.

The product is useful as both a portfolio project and a practical sales tool. It demonstrates document generation, AI applied to sales operations, SaaS UX, pricing logic and public document sharing.

## Audience

Primary users:

- Freelancers selling web design, automation, dashboards, CRM setup or MVP builds.
- Small agencies that need consistent proposals without a dedicated sales operations team.
- Consultants who want repeatable proposal templates with manual control.

Secondary users:

- Prospects who receive a public proposal page and need to review scope, price and acceptance terms.

## Problem

After lead capture, many service providers lose speed and quality during proposal preparation. The proposal often becomes a generic document that does not reflect the client's actual problem, expected outcome, delivery scope, timeline, constraints or price logic.

## Goals

- Reduce the time from client briefing to proposal draft.
- Improve proposal clarity by connecting problem, solution, scope, timeline and price.
- Give users enough manual control to keep proposals credible.
- Provide public sharing and PDF export without heavy CRM complexity.
- Make the project clean enough to be reviewed as a public portfolio repository.

## Non-Goals

- Full contract management.
- Legally binding digital signature infrastructure.
- Advanced CRM pipeline management.
- Invoicing, payment collection or accounting.
- Multi-tenant agency team permissions in the first version.

## Core User Stories

- As a freelancer, I want to enter a client briefing so that I can generate a proposal quickly.
- As an agency owner, I want reusable templates so that proposals stay consistent across services.
- As a consultant, I want editable proposal sections so that I can tailor the final document.
- As a seller, I want automatic pricing support so that scope and price stay aligned.
- As a client, I want a clean public proposal page so that I can review and accept the proposal without creating an account.
- As a user, I want proposal history and statuses so that I can track draft, sent, accepted and rejected work.

## Proposal Statuses

| Status | Meaning | Editable |
| --- | --- | --- |
| `draft` | Internal proposal still being prepared. | Yes |
| `sent` | Shared with the client through link or PDF. | Limited |
| `accepted` | Client accepted through the public page. | No, create a revision |
| `rejected` | Client declined or user marked it as lost. | No, create a revision |

## Templates

Initial templates:

- Web Design
- AI Automation
- CRM
- SaaS MVP
- Dashboard

Each template should define suggested sections, default deliverables, timeline ranges, pricing rules, assumptions and common exclusions.

## Success Metrics

| Metric | Target | Measurement |
| --- | --- | --- |
| Time to first draft | Under 5 minutes | Briefing started to generated proposal saved |
| Proposal completion rate | 60%+ | Drafts that reach sent status |
| Manual edit rate | Tracked, not minimized | Indicates user trust and customization needs |
| Public proposal open rate | 70%+ | Sent proposals with at least one public view |
| Acceptance conversion | Tracked by template | Accepted proposals divided by sent proposals |

## MVP Scope

The MVP should include:

- Authenticated dashboard.
- Proposal briefing form.
- Template selector.
- Pricing estimate.
- AI-generated structured proposal draft.
- Manual editor.
- Proposal list and detail pages.
- PDF export.
- Public share page.
- Simple acceptance signature.

## Open Questions

- Which LLM provider should be the first supported provider?
- Should pricing rules be global, template-specific or user-configurable in the MVP?
- Should the public proposal page expose downloadable PDF by default?
- Should proposal revisions be stored as immutable versions from day one?
- Which license should be used before making the repository public?
