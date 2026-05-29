/**
 * SafeR — Supabase browser client wrapper.
 * Lazy-loads the supabase-js UMD only when first used (most pages don't need it).
 *
 * Server-side writes (contact, quote) go through /api/* functions in /api/ so
 * the service-role key never reaches the browser. The browser client is only
 * for anonymous reads (e.g. published testimonials) if/when those ship.
 */
(function () {
  let _client = null;
  let _loading = null;

  async function loadSupabaseClient() {
    if (window.supabase && window.supabase.createClient) return window.supabase;
    if (_loading) return _loading;
    _loading = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js';
      s.onload = () => resolve(window.supabase);
      s.onerror = reject;
      document.head.appendChild(s);
    });
    return _loading;
  }

  async function getClient() {
    if (_client) return _client;
    const cfg = await fetch('/api/config').then((r) => r.ok ? r.json() : null).catch(() => null);
    if (!cfg || !cfg.supabaseUrl || !cfg.supabaseAnonKey) {
      console.warn('Supabase not configured — set PUBLIC_SUPABASE_URL + PUBLIC_SUPABASE_ANON_KEY in Vercel.');
      return null;
    }
    const lib = await loadSupabaseClient();
    _client = lib.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey);
    return _client;
  }

  /**
   * Submit a lead (contact / quote). Calls the server function so we never
   * expose the service-role key. Returns { ok: boolean, error?: string }.
   */
  async function submitLead({ kind, payload }) {
    try {
      const res = await fetch('/api/' + (kind === 'quote' ? 'quote' : 'contact'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const e = await res.json().catch(() => ({}));
        return { ok: false, error: e.error || `HTTP ${res.status}` };
      }
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || 'Network error' };
    }
  }

  window.SaferSupabase = { getClient, submitLead };
})();
