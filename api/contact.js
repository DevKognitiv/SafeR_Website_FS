import { getAdminClient, clip, isEmail, isPhone, extractClientMeta } from './_supabase.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = req.body || {};
  const name = clip(body.name, 120);
  const email = clip(body.email, 254);
  const phone = clip(body.phone, 30);
  const subject = clip(body.subject, 200);
  const message = clip(body.message, 4000);

  if (!name) return res.status(400).json({ error: 'name required' });
  if (!email || !isEmail(email)) return res.status(400).json({ error: 'valid email required' });
  if (phone && !isPhone(phone)) return res.status(400).json({ error: 'invalid phone' });
  if (!message) return res.status(400).json({ error: 'message required' });

  // Honeypot — bot-trap field. Real users never fill it.
  if (body.website) return res.status(200).json({ ok: true });

  const { ip, ua } = extractClientMeta(req);
  try {
    const db = getAdminClient();
    const { error } = await db.from('leads').insert({
      kind: 'contact',
      name,
      email,
      phone,
      subject,
      message,
      payload: null,
      source: clip(body.source, 80) || 'contact.html',
      lang: clip(body.lang, 8) || 'fr',
      ip,
      user_agent: ua,
    });
    if (error) {
      console.error('contact insert failed', error);
      return res.status(500).json({ error: 'database write failed' });
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('contact handler error', err);
    return res.status(500).json({ error: err.message || 'internal error' });
  }
}
