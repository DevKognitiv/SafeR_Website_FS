/**
 * SafeR — standalone-page chrome.
 * Injects navbar + footer + i18n binder + back-to-top + WhatsApp FAB +
 * cookie banner + analytics stub into every non-SPA HTML page.
 *
 * Pages opt in by including: <script src="js/site-chrome.js"></script>
 * and marking the navbar/footer mount points with id="nav-mount" / id="footer-mount".
 *
 * Exposes:
 *   window.SaferChrome.applyPageI18n(lang)
 *   document dispatches "safer:langchange" on toggle.
 */
(function () {
  const C = window.SAFER_CONFIG;
  const I = window.SAFER_I18N;
  const LANGS = window.SAFER_LANGS || [{ code: 'fr', label: 'FR' }, { code: 'en', label: 'EN' }];
  const ICONS = window.SAFER_ICONS;
  const STORE_KEY = 'safer_lang';
  const COOKIE_KEY = 'safer_cookie_consent';

  const t = (key, lang) => {
    const dict = I[lang] || I.fr;
    return dict[key] || I.fr[key] || key;
  };

  const navLinks = (current) => {
    const items = [
      { href: '/', i18n: 'nav.solutions', id: 'solutions', dropdown: [
        { href: '/solutions-residential.html', i18n: 'nav.residential' },
        { href: '/solutions-commercial.html', i18n: 'nav.commercial' },
        { href: '/solutions-industrial.html', i18n: 'nav.industrial' },
        { href: '/solutions-gps.html', i18n: 'nav.gps' },
      ]},
      { href: '/pricing.html', i18n: 'nav.pricing', id: 'pricing' },
      { href: '/index.html#/store', i18n: 'nav.store', id: 'store' },
      { href: '/about.html', i18n: 'nav.about', id: 'about' },
      { href: '/faq.html', i18n: 'nav.faq', id: 'faq' },
      { href: '/contact.html', i18n: 'nav.contact', id: 'contact' },
    ];
    return items.map((item) => {
      const active = item.id === current ? ' aria-current="page"' : '';
      if (item.dropdown) {
        return `
          <div class="has-dropdown">
            <a href="${item.href}"${active} data-i18n="${item.i18n}">${t(item.i18n, 'fr')}</a>
            <div class="dropdown" role="menu">
              ${item.dropdown.map((s) => `<a href="${s.href}" data-i18n="${s.i18n}">${t(s.i18n, 'fr')}</a>`).join('')}
            </div>
          </div>`;
      }
      return `<a href="${item.href}"${active} data-i18n="${item.i18n}">${t(item.i18n, 'fr')}</a>`;
    }).join('');
  };

  const renderNav = (current) => `
    <nav class="nav" role="navigation" aria-label="Main">
      <div class="container nav-inner">
        <a href="/" class="nav-logo" aria-label="SafeR home">
          <img src="/assets/logo-horizontal.svg" alt="SafeR" onerror="this.outerHTML='<span class=\\'logo-mark\\'>SafeR</span>'">
        </a>
        <div class="nav-links">${navLinks(current)}</div>
        <div class="nav-cta">
          <div class="lang-toggle" role="group" aria-label="Language">
            ${LANGS.map((l) => `<button type="button" data-lang="${l.code}">${l.label}</button>`).join('')}
          </div>
          <a class="btn btn-primary btn-sm" href="/contact.html" data-i18n="nav.quote">${t('nav.quote', 'fr')}</a>
          <button class="nav-toggle" type="button" aria-label="${t('nav.menu', 'fr')}" data-i18n-aria-label="nav.menu">
            ${ICONS ? ICONS.menu(22) : '☰'}
          </button>
        </div>
      </div>
    </nav>`;

  const renderFooter = () => `
    <footer class="footer">
      <div class="container">
        <div>
          <div class="footer-logo">
            <img src="/assets/logo-horizontal-white.svg" alt="SafeR"
                 onerror="this.outerHTML='<span class=\\'logo-mark light\\'>SafeR</span>'">
          </div>
          <p data-i18n="footer.tagline">${t('footer.tagline', 'fr')}</p>
          <p style="margin-top:16px;font-size:13px;opacity:.7">${C.contact.address.short}<br>${C.contact.phoneDisplay}<br>${C.contact.emails.general}</p>
        </div>
        <div>
          <h4 data-i18n="footer.col.solutions">${t('footer.col.solutions', 'fr')}</h4>
          <a href="/solutions-residential.html" data-i18n="nav.residential">${t('nav.residential', 'fr')}</a>
          <a href="/solutions-commercial.html" data-i18n="nav.commercial">${t('nav.commercial', 'fr')}</a>
          <a href="/solutions-industrial.html" data-i18n="nav.industrial">${t('nav.industrial', 'fr')}</a>
          <a href="/solutions-gps.html" data-i18n="nav.gps">${t('nav.gps', 'fr')}</a>
        </div>
        <div>
          <h4 data-i18n="footer.col.company">${t('footer.col.company', 'fr')}</h4>
          <a href="/about.html" data-i18n="nav.about">${t('nav.about', 'fr')}</a>
          <a href="/pricing.html" data-i18n="nav.pricing">${t('nav.pricing', 'fr')}</a>
          <a href="/contact.html" data-i18n="nav.contact">${t('nav.contact', 'fr')}</a>
          <a href="/legal.html" data-i18n="legal.title">${t('legal.title', 'fr')}</a>
        </div>
        <div>
          <h4 data-i18n="footer.col.support">${t('footer.col.support', 'fr')}</h4>
          <a href="/faq.html" data-i18n="nav.faq">${t('nav.faq', 'fr')}</a>
          <a href="${C.contact.whatsappLink}" target="_blank" rel="noopener">WhatsApp</a>
          <a href="${C.contact.telLink}">${C.contact.phoneDisplay}</a>
          <a href="${C.contact.mailto.support}">${C.contact.emails.support}</a>
        </div>
      </div>
      <div class="container footer-bottom">
        <span data-i18n="footer.copyright">${t('footer.copyright', 'fr')}</span>
        <span data-i18n="footer.poweredby">${t('footer.poweredby', 'fr')}</span>
      </div>
    </footer>`;

  const renderFab = () => `
    <a class="fab" href="${C.contact.whatsappLink}" target="_blank" rel="noopener"
       aria-label="WhatsApp">${ICONS ? ICONS.whatsapp(28) : 'WA'}</a>
    <button class="back-top" type="button" aria-label="Back to top" id="backTop">
      ${ICONS ? ICONS.chevronUp(20) : '↑'}
    </button>`;

  const renderCookieBanner = () => `
    <div class="cookie-banner" id="cookieBanner" role="dialog" aria-live="polite" aria-label="Cookies">
      <p data-i18n="cookies.body">${t('cookies.body', 'fr')}</p>
      <div class="row">
        <a class="btn btn-ghost btn-sm" href="/legal.html#cookies" data-i18n="cookies.more">${t('cookies.more', 'fr')}</a>
        <button class="btn btn-ghost btn-sm" type="button" data-cookie="reject" data-i18n="cookies.reject">${t('cookies.reject', 'fr')}</button>
        <button class="btn btn-primary btn-sm" type="button" data-cookie="accept" data-i18n="cookies.accept">${t('cookies.accept', 'fr')}</button>
      </div>
    </div>`;

  const applyPageI18n = (lang) => {
    const set = (sel, attr, prop) => {
      document.querySelectorAll(`[${sel}]`).forEach((el) => {
        const key = el.getAttribute(sel);
        const val = t(key, lang);
        if (attr) el.setAttribute(attr, val); else el[prop] = val;
      });
    };
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      el.textContent = t(el.getAttribute('data-i18n'), lang);
    });
    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      el.innerHTML = t(el.getAttribute('data-i18n-html'), lang);
    });
    set('data-i18n-placeholder', 'placeholder');
    set('data-i18n-title', 'title');
    set('data-i18n-aria-label', 'aria-label');
    // Document title
    const titleKey = document.documentElement.getAttribute('data-i18n-title-key');
    if (titleKey) document.title = t(titleKey, lang);
    // Lang attribute
    document.documentElement.setAttribute('lang', lang);
    // Toggle pressed state
    document.querySelectorAll('.lang-toggle button').forEach((b) => {
      b.setAttribute('aria-pressed', b.dataset.lang === lang ? 'true' : 'false');
    });
    // Persist + broadcast
    try { localStorage.setItem(STORE_KEY, lang); } catch (_) {}
    document.dispatchEvent(new CustomEvent('safer:langchange', { detail: { lang } }));
  };

  const wireLangToggle = () => {
    document.querySelectorAll('.lang-toggle button').forEach((b) => {
      b.addEventListener('click', () => applyPageI18n(b.dataset.lang));
    });
  };

  const wireMobileNav = () => {
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.nav');
    if (!toggle || !nav) return;
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
  };

  const wireBackTop = () => {
    const btn = document.getElementById('backTop');
    if (!btn) return;
    const onScroll = () => btn.classList.toggle('show', window.scrollY > 480);
    window.addEventListener('scroll', onScroll, { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    onScroll();
  };

  const wireCookieBanner = () => {
    const banner = document.getElementById('cookieBanner');
    if (!banner) return;
    let consent = null;
    try { consent = localStorage.getItem(COOKIE_KEY); } catch (_) {}
    if (!consent) banner.classList.add('show');
    banner.querySelectorAll('[data-cookie]').forEach((b) => {
      b.addEventListener('click', () => {
        const choice = b.dataset.cookie;
        try { localStorage.setItem(COOKIE_KEY, choice); } catch (_) {}
        banner.classList.remove('show');
        if (choice === 'accept') initAnalytics();
      });
    });
  };

  const initAnalytics = () => {
    // Analytics stub — only fires if PUBLIC_PLAUSIBLE_DOMAIN or PUBLIC_GA_ID is wired
    // through /api/config. Safe no-op when unconfigured.
    if (window.__safer_analytics_loaded) return;
    window.__safer_analytics_loaded = true;
    fetch('/api/config').then((r) => r.ok ? r.json() : null).then((cfg) => {
      if (!cfg) return;
      if (cfg.plausibleDomain) {
        const s = document.createElement('script');
        s.defer = true;
        s.setAttribute('data-domain', cfg.plausibleDomain);
        s.src = 'https://plausible.io/js/script.js';
        document.head.appendChild(s);
      } else if (cfg.gaId) {
        const s = document.createElement('script');
        s.async = true;
        s.src = `https://www.googletagmanager.com/gtag/js?id=${cfg.gaId}`;
        document.head.appendChild(s);
        window.dataLayer = window.dataLayer || [];
        function gtag() { window.dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', cfg.gaId);
      }
    }).catch(() => {});
  };

  const mount = () => {
    const navMount = document.getElementById('nav-mount');
    const footerMount = document.getElementById('footer-mount');
    const current = document.body.getAttribute('data-page');
    if (navMount) navMount.outerHTML = renderNav(current);
    if (footerMount) footerMount.outerHTML = renderFooter();

    // FAB + cookie banner are always injected at end of body
    const tail = document.createElement('div');
    tail.innerHTML = renderFab() + renderCookieBanner();
    document.body.appendChild(tail);

    wireLangToggle();
    wireMobileNav();
    wireBackTop();
    wireCookieBanner();

    // Apply persisted language
    let lang = 'fr';
    try { lang = localStorage.getItem(STORE_KEY) || 'fr'; } catch (_) {}
    applyPageI18n(lang);

    // If user already consented earlier, fire analytics now
    let consent = null;
    try { consent = localStorage.getItem(COOKIE_KEY); } catch (_) {}
    if (consent === 'accept') initAnalytics();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }

  window.SaferChrome = { applyPageI18n, t };
})();
