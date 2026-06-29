# Supabase SQL

These files are optional for the current portfolio demo. The Next.js UI does not require Supabase at runtime in this phase.

Apply the SQL manually when you want to provision a Supabase project:

```bash
supabase/migrations/20260630000000_initial_schema.sql
supabase/seed.sql
```

The migration creates the documented enums, tables, indexes, RLS policies, a narrow public read function and a private `proposal-pdfs` storage bucket. The seed file adds starter templates and pricing rules.

Security notes:

- Keep real Supabase credentials only in `.env.local` or your hosting provider secret store.
- Never expose `SUPABASE_SERVICE_ROLE_KEY` as a `NEXT_PUBLIC_*` variable.
- Public proposal reads should use a narrow server route or the provided `get_public_proposal_by_share_token` function.
- Public acceptance writes should go through a server route using server-only credentials, not direct anonymous table inserts.
