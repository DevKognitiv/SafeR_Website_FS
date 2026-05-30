import { getAdminClient, clip, isEmail, isPhone, extractClientMeta } from './_supabase.js';

const ALLOWED_PLANS = new Set(['activ', 'zen', 'hypnoz', 'flex']);
const ALLOWED_SITES = new Set(['apartment', 'villa', 'shop', 'office', 'industrial', 'other']);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = req.body || {};
  const name = clip(body.name, 120);
  const email = clip(body.email, 254);
  const phone = clip(body.phone, 30);
  const plan = clip(body.plan, 16);
  const siteType = clip(body.site_type, 24);
  const address = clip(body.address, 300);
  const notes = clip(body.notes, 4000);

  if (!name) return res.status(400).json({ error: 'name required' });
  if (!email || !isEmail(email)) return res.status(400).json({ error: 'valid email required' });
  if (!phone || !isPhone(phone)) return res.status(400).json({ error: 'valid phone required' });
  if (plan && !ALLOWED_PLANS.has(plan)) return res.status(400).json({ error: 'invalid plan' });
  if (siteType && !ALLOWED_SITES.has(siteType)) return res.status(400).json({ error: 'invalid site type' });

  // Honeypot
  if (body.website) return res.status(200).json({ ok: true });

  const { ip, ua } = extractClientMeta(req);
  try {
    const db = getAdminClient();
    const { error } = await db.from('leads').insert({
      kind: 'quote',
      name,
      email,
      phone,
      subject: plan ? `Plan: ${plan}` : 'Devis',
      message: notes,
      payload: {
        plan: plan || null,
        site_type: siteType || null,
        address: address || null,
        cart: Array.isArray(body.cart) ? body.cart.slice(0, 50) : null,
      },
      source: clip(body.source, 80) || 'quote-wizard',
      lang: clip(body.lang, 8) || 'fr',
      ip,
      user_agent: ua,
    });
    if (error) {
      console.error('quote insert failed', error);
      return res.status(500).json({ error: 'database write failed' });
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('quote handler error', err);
    return res.status(500).json({ error: err.message || 'internal error' });
  }
}
