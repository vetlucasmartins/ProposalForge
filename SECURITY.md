# Security

## Reporting

If you find a security issue, do not publish exploit details in a public issue. Contact the repository owner privately once contact information is available.

## Security Baseline

ProposalForge is currently a public mockup with static demo data. Treat future proposal data, client details, pricing and generated documents as sensitive before adding persistence.

Required practices:

- Never commit API keys, generated local databases or real customer data.
- Keep future server-only credentials out of client components and `NEXT_PUBLIC_*` variables.
- Validate future request payloads with schemas.
- Sanitize rendered Markdown before adding user-generated content.
- Rate limit future LLM generation, PDF export and public acceptance endpoints.
- Avoid logging full prompts if they contain sensitive client information.

## Public Proposal Links

Public links are future work. If implemented, they should use unguessable tokens and expose only client-safe fields.

## LLM Use

LLM output is not trusted. It must be parsed, validated and sanitized before persistence or rendering.

Do not send secrets or private unrelated customer data to any model provider.

## Dependency Management

Before publishing or deploying:

```bash
npm audit
npm run typecheck
npm test
```

The current project should pass these commands before public updates are pushed.
