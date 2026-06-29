# Security

## Reporting

If you find a security issue, do not publish exploit details in a public issue. Contact the repository owner privately once contact information is available.

## Security Baseline

ProposalForge handles proposal data, client details, pricing, generated documents and public acceptance records. Treat all of these as sensitive by default.

Required practices:

- Never commit API keys, Supabase service-role keys or customer data.
- Keep service-role access server-side only.
- Enable Supabase RLS on every public table.
- Validate all request payloads with schemas.
- Sanitize rendered Markdown.
- Rate limit LLM generation, PDF export and public acceptance.
- Hash or redact IP addresses before storing acceptance records.
- Avoid logging full prompts if they contain sensitive client information.

## Public Proposal Links

Public links must use unguessable tokens. Public reads should expose only client-safe fields and should not reveal owner IDs, internal notes, generation logs or storage paths.

## LLM Use

LLM output is not trusted. It must be parsed, validated and sanitized before persistence or rendering.

Do not send secrets, private unrelated customer data or service-role credentials to any model provider.

## Dependency Management

Before publishing or deploying:

```bash
npm audit
npm run typecheck
npm test
```

These commands should be adjusted once the application code and package scripts are added.
