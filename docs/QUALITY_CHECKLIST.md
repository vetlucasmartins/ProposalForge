# Quality Checklist

Use this checklist before publishing the repository or opening a pull request.

## Public Repository

- README explains the product in one minute.
- Repository status is accurate.
- Setup commands match the actual project.
- `.env.example` lists required variables without real values.
- No API keys, tokens, private URLs or customer data are committed.
- License is chosen before open-source publication.
- Screenshots or demo assets are added only after real UI exists.

## Architecture

- Feature modules have clear ownership.
- Generated prose is stored separately from structured pricing and status data.
- LLM provider code is isolated behind an adapter.
- PDF export uses saved proposal data.
- Public proposal pages use share tokens and limited read models.
- Domain services do not trust client-provided owner IDs or totals.

## Data and Security

- Supabase RLS is enabled on every public table.
- Policies are tested for owner access and non-owner denial.
- Service-role keys are server-only.
- Public acceptance is rate-limited.
- IP addresses are hashed or redacted before storage.
- LLM logs avoid sensitive data.
- User input is sanitized before rendering.

## UX

- Briefing form is clear on desktop and mobile.
- Proposal editor keeps sections, deliverables, pricing and timeline easy to scan.
- CTA visibility is strong on first fold.
- Public page clearly shows scope, timeline, price and acceptance.
- Empty states explain what to do next without generic filler.
- Error messages are specific and actionable.

## Testing

- Unit tests cover pricing and status transitions.
- Integration tests cover database policies and route handlers.
- Playwright covers create, generate, edit, share and accept flow.
- PDF export has at least one smoke test.
- LLM parsing has malformed-output tests.
- Type-check, lint and test commands pass before merge.

## Documentation

- Product spec reflects implemented scope.
- Architecture doc reflects actual source structure.
- Database doc matches migrations.
- API doc matches route handlers and server actions.
- AI generation doc matches prompt versions.
- Implementation plan is updated as phases complete.
