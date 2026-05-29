# SafeR Website (Scaffold)

Static, mostly client-side marketing site for **SafeR** — Smart Home Security, Côte d'Ivoire.
Sub-brand of **RADIANT Assistance Security**. Powered by **KOGNITIV Technologies**.

> **This is a scaffold.** It was generated from `HANDOFF.md` because the original codebase
> was not available. All brand assets (logos, fonts, hero photos, product photography)
> are **placeholders** — replace before launch. See [Placeholders](#placeholders) below.

---

## What's in here

- **13 HTML pages** — `index.html` (SPA shell + homepage), four Solutions pages, Pricing,
  Contact, FAQ, Legal, About, Dashboard, Product detail.
- **`styles.css`** — single stylesheet with brand tokens from the SafeR Brand Style Guide v1.0.
- **`js/`** modules — SPA bootstrap, screen renderers, product data, i18n dictionary
  (FR + EN seeded; ES/AR/ZH stubbed), inline icon library, standalone-page chrome
  (navbar/footer/i18n/back-to-top/WhatsApp FAB), centralized config, Supabase client.
- **`api/`** Vercel serverless functions — `contact`, `quote` (forward to Supabase).
- **`supabase/migrations/`** — Postgres schema for `leads` (contact + quote submissions).
- **`assets/`** + **`uploads/`** — placeholder PNGs/SVGs (see notes).
- **`vercel.json`**, **`.env.example`**, **`robots.txt`**, **`sitemap.xml`** — deploy prep.

---

## Quick start (local)

No build step.

```bash
# any static server works
npx serve .
# or
python3 -m http.server 8000
```

Open `http://localhost:8000/`.

---

## Deploy

### 1. Supabase (database for form submissions)

```bash
# install once
npm i -g supabase

# log in
supabase login

# link to your project
supabase link --project-ref <your-ref>

# push the schema
supabase db push
```

The migration in `supabase/migrations/0001_init.sql` creates a `leads` table with RLS
locked to the `service_role` (so only the Vercel functions can write).

### 2. Vercel

```bash
npm i -g vercel
vercel link
```

Set the env vars from `.env.example` in Vercel project settings:

- `SUPABASE_URL` — `https://<ref>.supabase.co`
- `SUPABASE_SERVICE_ROLE_KEY` — server-only, **never** prefix with `NEXT_PUBLIC_`
- `PUBLIC_SUPABASE_URL` — same as above, exposed to browser
- `PUBLIC_SUPABASE_ANON_KEY` — public anon key

Then:

```bash
vercel --prod
```

The `vercel.json` routes `/api/*` to the Node functions in `api/` and serves the rest as
static.

---

## Architecture (mirrors HANDOFF.md §1)

Three layers:

1. **`index.html`** — SPA owning homepage **and** hash routes `#/store`, `#/portal`,
   `#/partner`, `#/quote`. Renderers in `js/screens.js` + `js/app.js`.
2. **Standalone HTML pages** — share navbar/footer/i18n/back-to-top/WhatsApp FAB via
   `js/site-chrome.js`. French is the static no-JS fallback; English swaps in via the toggle.
3. **`js/data.js`** — single source for product catalogue. Read by both the SPA store
   screen and `product-detail.html`.

---

## Placeholders

The following are NOT the real SafeR brand assets. Swap them before launch.

| Slot | Placeholder | Real asset to drop in |
|---|---|---|
| Primary logo | `assets/logo-horizontal.svg` (text mark) | The actual `logo-horizontal.png` / `.svg` |
| White-on-dark logo | `assets/logo-horizontal-white.svg` | `logo-horizontal-white.png` |
| Favicon | `assets/favicon.svg` | `favicon.png` from brand kit |
| Shield icon | `assets/icon-shield.svg` | `icon-shield.png` |
| Hero photos | none — CSS gradients used | `assets/hero-*.png` from the brand library |
| Product photos | `data.js` uses base64 SVG placeholders | Real CDN URLs (Reolink/Tuya) per HANDOFF §8 |
| Brand fonts | system fallback (Arial/Inter) | Self-host Saira + Nasalization into `fonts/` |
| OG image | `assets/og-image.svg` | 1200×630 PNG, replace in `<meta>` |
| RADTrack assets | `uploads/radtrack-*.svg` (placeholder marks) | Real RADTrack PNGs |
| Brand PDFs | not included | `uploads/SafeR Brand Guide.pdf`, `CATALOGUE SAFER_RS.pdf` |

---

## Config values to swap before launch (HANDOFF §4)

Centralized in **`js/config.js`** — change once, propagates everywhere:

- Company phone, WhatsApp number
- Emails (`contact@`, `privacy@`, `support@`)
- Postal address (short + full registered)
- CEO name, domain, parent domain
- RCCM / NCC / capital placeholders (in `legal.html`)

---

## Known gaps vs. HANDOFF.md

This scaffold deliberately does **less** than the full spec in HANDOFF.md, in places where
faithful reproduction without the original assets/data would be guesswork:

- **Products in `data.js`:** 8 representative SKUs across the 5 categories instead of
  all 38. Schema is identical — drop the catalogue in.
- **i18n:** FR + EN keys for everything visible in the scaffold; ES/AR/ZH are stubs.
- **Hero slideshow:** 3 slides with CSS-gradient backgrounds, not the 8-slide photo carousel.
- **Customer dashboard:** Static KPI cards; no Reolink/Tuya feed wiring.
- **Real-time monitoring KPIs (partner dashboard):** Static.

See HANDOFF.md §6 for the full backlog. Stage-by-stage commits in this repo make it
clear what was scaffolded vs. wired.

---

## License

Proprietary — © SafeR / RADIANT Assistance Security / KOGNITIV Technologies.
