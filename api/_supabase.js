/**
 * Server-side Supabase admin client. Used by the form-submission functions.
 * Loads service-role key from env — NEVER expose to the browser.
 */
import { createClient } from '@supabase/supabase-js';

let _client = null;

export function getAdminClient() {
  if (_client) return _client;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment.');
  }
  _client = createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  return _client;
}

/** Lightweight input sanitization for free-text fields. */
export function clip(v, n = 2000) {
  if (typeof v !== 'string') return null;
  return v.trim().slice(0, n) || null;
}

/** Email shape check (RFC-lite). */
export function isEmail(v) {
  return typeof v === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) && v.length <= 254;
}

/** Phone shape check (international or local digits). */
export function isPhone(v) {
  if (typeof v !== 'string') return false;
  const digits = v.replace(/[\s+().-]/g, '');
  return /^\d{8,15}$/.test(digits);
}

/** Returns the client IP + UA pulled from Vercel request headers. */
export function extractClientMeta(req) {
  const fwd = req.headers['x-forwarded-for'] || '';
  const ip = (Array.isArray(fwd) ? fwd[0] : fwd).split(',')[0].trim() || null;
  const ua = req.headers['user-agent'] || null;
  return { ip, ua };
}
