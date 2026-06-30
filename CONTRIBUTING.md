# Contributing

ProposalForge is intended to be a clean public project. Contributions should keep the product understandable, secure and easy to run locally.

## Working Principles

- Make the smallest safe change.
- Keep feature ownership clear.
- Validate inputs at system boundaries.
- Do not commit secrets or generated local files.
- Update documentation when behavior or architecture changes.
- Prefer readable code over clever abstractions.

## Expected Workflow

1. Read the relevant docs in `docs/`.
2. Create or update tests for behavior you change.
3. Implement the smallest coherent change.
4. Run type-check, lint and tests.
5. Review the diff for secrets, unrelated changes and documentation drift.

## Commit Style

Use conventional commits:

```text
feat: add proposal briefing form
fix: prevent accepted proposals from being edited
docs: document public acceptance flow
test: cover pricing rush multiplier
```

## Pull Request Checklist

- The change has a clear product reason.
- The implementation follows the documented architecture.
- Tests cover the risky behavior.
- Public routes do not expose private data.
- Documentation is updated when needed.
- No secrets, `.env` files or private customer data are included.

## Documentation Updates

Update:

- `docs/ARCHITECTURE.md` when source structure or service boundaries change.
- `docs/DATABASE.md` when the SQLite schema changes.
- `docs/API.md` when routes, server actions or response contracts change.
- `docs/AI_GENERATION.md` when prompts, schemas or provider behavior change.
- `README.md` when setup, status or user-facing capabilities change.
