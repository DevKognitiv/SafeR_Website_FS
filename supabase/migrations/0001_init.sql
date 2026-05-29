-- SafeR — initial schema. Stores both contact-form submissions
-- and quote-wizard submissions in a single leads table, distinguished by kind.
-- RLS is enabled and locked down: only the service_role (used by /api/*) can write.

create extension if not exists "pgcrypto";

create type lead_kind as enum ('contact', 'quote');

create table if not exists public.leads (
  id           uuid        primary key default gen_random_uuid(),
  created_at   timestamptz not null    default now(),
  kind         lead_kind   not null,
  name         text        not null,
  email        text        not null,
  phone        text,
  subject      text,
  message      text,
  payload      jsonb,                  -- quote-specific extras (plan, site_type, cart, address)
  source       text,                   -- page or component that originated the lead
  lang         text        default 'fr',
  ip           text,
  user_agent   text,
  status       text        not null default 'new',  -- new | contacted | won | lost
  notes        text,                    -- internal team notes
  contacted_at timestamptz,
  contacted_by text
);

create index if not exists leads_kind_created_idx on public.leads (kind, created_at desc);
create index if not exists leads_status_idx       on public.leads (status);
create index if not exists leads_email_idx        on public.leads (email);

-- Row-level security: deny by default, only service_role can read/write.
alter table public.leads enable row level security;

-- Explicit deny for anon role (belt-and-braces with default-deny).
revoke all on public.leads from anon;
revoke all on public.leads from authenticated;

-- service_role bypasses RLS — used by Vercel functions via SUPABASE_SERVICE_ROLE_KEY.
-- (No policy needed; service_role bypasses RLS by design in Supabase.)

comment on table  public.leads       is 'Contact + quote form submissions. Inserted server-side from /api/contact and /api/quote.';
comment on column public.leads.kind  is 'contact = contact-page form, quote = quote-wizard / pricing CTA';
comment on column public.leads.payload is 'Quote-wizard extras: { plan, site_type, address, cart }';
