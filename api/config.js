/**
 * Public configuration endpoint. Returns ONLY values safe to expose
 * to the browser (anon key, analytics tags). The service-role key
 * is read separately by /api/contact and /api/quote.
 */
export default function handler(_req, res) {
  res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=600');
  res.status(200).json({
    supabaseUrl: process.env.PUBLIC_SUPABASE_URL || null,
    supabaseAnonKey: process.env.PUBLIC_SUPABASE_ANON_KEY || null,
    plausibleDomain: process.env.PUBLIC_PLAUSIBLE_DOMAIN || null,
    gaId: process.env.PUBLIC_GA_ID || null,
  });
}
