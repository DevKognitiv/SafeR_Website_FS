# Supabase setup

This folder holds the SQL migration that creates the `leads` table used by
`/api/contact` and `/api/quote`.

## First-time setup

```bash
# 1. Install the CLI
npm i -g supabase

# 2. Log in
supabase login

# 3. Link this repo to your Supabase project
supabase link --project-ref <your-project-ref>

# 4. Push the migration
supabase db push
```

That creates `public.leads` with RLS on. The anon role has no read/write
permissions; only the `service_role` key (used server-side by the Vercel
functions) can insert / read.

## What's in the schema

- **`leads`** — single table for both contact-form and quote-wizard submissions.
  - `kind` enum distinguishes `contact` vs `quote`
  - `payload` jsonb holds quote extras (plan, site type, address, cart contents)
  - `status`, `notes`, `contacted_at`, `contacted_by` are operational fields the
    sales team can update via the Supabase dashboard
  - Indexes on `(kind, created_at)`, `status`, and `email`

## Notifying the team

Supabase has built-in support for sending emails on insert via Database
Webhooks → Edge Functions, or you can wire a row-inserted webhook to your
team's Slack / Resend account. Not included here — pick a delivery channel
and add it as a webhook against `public.leads`.
