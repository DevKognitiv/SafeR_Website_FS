# Placeholder assets

Every file in `/assets` and `/uploads` is a **placeholder** generated for the
scaffold. They use the SafeR brand colors but are NOT the real brand artwork.

Swap these for the real assets before launch — the file paths and HTML
references already point to the right slots.

| Replace | Slot it fills |
|---|---|
| `assets/logo-horizontal.svg` | Primary navbar logo (light theme) |
| `assets/logo-horizontal-white.svg` | Footer/dark-theme logo |
| `assets/favicon.svg` | Browser tab icon — also export as `favicon.png` (32×32) and `favicon-180.png` (apple-touch) |
| `assets/icon-shield.svg` | Card icons, RSS / monitoring badge |
| `assets/og-image.svg` | Open Graph share card — export the real one as a 1200×630 PNG |
| `uploads/radtrack-logo-color-horizontal.svg` | RADTrack sub-brand on `solutions-gps.html` |
| `uploads/radtrack-logo-white.svg` | RADTrack on dark backgrounds |

Product photos in `js/data.js` use inline base64 SVG placeholders. Replace the
`img:` field on each product with the real Reolink / Tuya CDN URL per
HANDOFF.md §8 (or your own brand photography).
