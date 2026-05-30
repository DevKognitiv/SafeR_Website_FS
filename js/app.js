/**
 * SafeR — SPA shell logic for index.html.
 * Owns:
 *   - Hash routing (#/store, #/portal, #/partner, #/quote, default = home)
 *   - Hero slideshow (3 slides, auto-cycle 6s, pause on hover)
 *   - Cart drawer (window.cart + localStorage)
 *   - Quote wizard (3 steps) → /api/quote
 */
(function () {
  const C = window.SAFER_CONFIG;
  const I = window.SAFER_I18N;
  const SCREENS = window.SAFER_SCREENS;

  const CART_KEY = 'safer_cart';
  const LANG_KEY = 'safer_lang';

  let cart = [];
  try { cart = JSON.parse(localStorage.getItem(CART_KEY) || '[]'); } catch (_) {}

  const persistCart = () => {
    try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (_) {}
    updateCartBadge();
  };

  const updateCartBadge = () => {
    const badge = document.getElementById('cartBadge');
    if (!badge) return;
    const n = cart.reduce((s, i) => s + i.qty, 0);
    badge.textContent = n;
    badge.hidden = n === 0;
  };

  window.SaferCart = {
    items: () => cart.slice(),
    add(productId, qty = 1) {
      const p = window.PRODUCTS.find((x) => x.id === productId);
      if (!p) return;
      const existing = cart.find((i) => i.id === productId);
      if (existing) existing.qty += qty;
      else cart.push({ id: p.id, name: p.name, sku: p.sku, price: p.price, qty });
      persistCart();
    },
    remove(productId) {
      cart = cart.filter((i) => i.id !== productId);
      persistCart();
      renderCartDrawer();
    },
    setQty(productId, qty) {
      const item = cart.find((i) => i.id === productId);
      if (!item) return;
      item.qty = Math.max(1, qty);
      persistCart();
      renderCartDrawer();
    },
    clear() { cart = []; persistCart(); renderCartDrawer(); },
    total() { return cart.reduce((s, i) => s + i.price * i.qty, 0); },
  };

  /* Routing -------------------------------------------------------- */
  const ROUTES = {
    '/': 'home',
    '/store': 'store',
    '/portal': 'portal',
    '/partner': 'partner',
    '/quote': 'quote',
  };

  const route = () => {
    const hash = (location.hash || '#/').replace(/^#/, '');
    const path = ROUTES[hash] || 'home';
    renderScreen(path);
  };

  const renderScreen = (name) => {
    const mount = document.getElementById('spa-mount');
    if (!mount || !SCREENS || !SCREENS[name]) return;
    const lang = currentLang();
    mount.innerHTML = SCREENS[name](lang, { C, I, products: window.PRODUCTS, cats: window.CATEGORIES });
    // Re-apply i18n to freshly mounted content
    if (window.SaferChrome) window.SaferChrome.applyPageI18n(lang);
    // Wire screen-specific behaviour
    wireHomeSlideshow();
    wireProductButtons();
    wireQuoteForm();
    wireScrollSpy();
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const currentLang = () => {
    try { return localStorage.getItem(LANG_KEY) || 'fr'; } catch (_) { return 'fr'; }
  };

  /* Hero slideshow ------------------------------------------------- */
  let slideshowTimer = null;
  const wireHomeSlideshow = () => {
    if (slideshowTimer) { clearInterval(slideshowTimer); slideshowTimer = null; }
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    if (slides.length < 2) return;
    let idx = 0;
    const go = (n) => {
      idx = (n + slides.length) % slides.length;
      slides.forEach((s, i) => s.classList.toggle('active', i === idx));
      dots.forEach((d, i) => d.classList.toggle('active', i === idx));
    };
    dots.forEach((d, i) => d.addEventListener('click', () => { go(i); restart(); }));
    const tick = () => go(idx + 1);
    const restart = () => {
      if (slideshowTimer) clearInterval(slideshowTimer);
      slideshowTimer = setInterval(tick, 6000);
    };
    document.querySelector('.hero')?.addEventListener('mouseenter', () => {
      if (slideshowTimer) clearInterval(slideshowTimer);
    });
    document.querySelector('.hero')?.addEventListener('mouseleave', restart);
    restart();
  };

  /* Product add-to-cart buttons ----------------------------------- */
  const wireProductButtons = () => {
    document.querySelectorAll('[data-add-cart]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const id = parseInt(btn.dataset.addCart, 10);
        window.SaferCart.add(id, 1);
        const orig = btn.textContent;
        btn.textContent = window.SaferChrome.t('common.added', currentLang());
        btn.disabled = true;
        setTimeout(() => { btn.textContent = orig; btn.disabled = false; }, 1200);
      });
    });
    // Category filter pills on store screen
    document.querySelectorAll('[data-cat-filter]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const cat = btn.dataset.catFilter;
        document.querySelectorAll('.product-card').forEach((card) => {
          card.style.display = cat === 'all' || card.dataset.cat === cat ? '' : 'none';
        });
        document.querySelectorAll('[data-cat-filter]').forEach((b) =>
          b.classList.toggle('active', b === btn));
      });
    });
  };

  /* Cart drawer --------------------------------------------------- */
  const renderCartDrawer = () => {
    const body = document.getElementById('cartBody');
    const foot = document.getElementById('cartFoot');
    if (!body) return;
    if (cart.length === 0) {
      body.innerHTML = `<p class="cart-empty">Votre panier est vide.</p>`;
      foot.innerHTML = '';
      return;
    }
    body.innerHTML = cart.map((i) => `
      <div style="display:flex;gap:12px;align-items:center;padding:12px 0;border-bottom:1px solid var(--divider)">
        <div style="flex:1">
          <div style="font-weight:600">${i.name}</div>
          <div style="color:var(--muted);font-size:13px">${i.sku}</div>
          <div style="margin-top:6px;display:flex;gap:8px;align-items:center">
            <button class="btn btn-ghost btn-sm" data-cart-dec="${i.id}">−</button>
            <span>${i.qty}</span>
            <button class="btn btn-ghost btn-sm" data-cart-inc="${i.id}">+</button>
            <button class="btn btn-ghost btn-sm" data-cart-rm="${i.id}" style="margin-left:auto">×</button>
          </div>
        </div>
        <div style="font-weight:700">${(i.price * i.qty).toLocaleString('fr-FR')} ${window.SaferChrome.t('common.fcfa', currentLang())}</div>
      </div>
    `).join('');
    foot.innerHTML = `
      <div style="display:flex;justify-content:space-between;margin-bottom:12px;font-weight:700">
        <span>Total</span><span>${window.SaferCart.total().toLocaleString('fr-FR')} ${window.SaferChrome.t('common.fcfa', currentLang())}</span>
      </div>
      <a class="btn btn-primary" href="#/quote" data-close-cart style="width:100%">Demander un devis avec ces articles</a>
    `;
    body.querySelectorAll('[data-cart-inc]').forEach((b) =>
      b.addEventListener('click', () => window.SaferCart.setQty(+b.dataset.cartInc, (cart.find((x) => x.id === +b.dataset.cartInc).qty + 1))));
    body.querySelectorAll('[data-cart-dec]').forEach((b) =>
      b.addEventListener('click', () => window.SaferCart.setQty(+b.dataset.cartDec, Math.max(1, cart.find((x) => x.id === +b.dataset.cartDec).qty - 1))));
    body.querySelectorAll('[data-cart-rm]').forEach((b) =>
      b.addEventListener('click', () => window.SaferCart.remove(+b.dataset.cartRm)));
    foot.querySelectorAll('[data-close-cart]').forEach((b) =>
      b.addEventListener('click', () => document.getElementById('cartDrawer').classList.remove('open')));
  };

  const wireCartDrawer = () => {
    const drawer = document.getElementById('cartDrawer');
    const openBtn = document.getElementById('cartOpen');
    if (!drawer || !openBtn) return;
    openBtn.addEventListener('click', (e) => {
      e.preventDefault();
      renderCartDrawer();
      drawer.classList.add('open');
    });
    drawer.querySelector('.drawer-backdrop').addEventListener('click', () => drawer.classList.remove('open'));
    drawer.querySelector('[data-close-drawer]').addEventListener('click', () => drawer.classList.remove('open'));
  };

  /* Quote wizard -------------------------------------------------- */
  const wireQuoteForm = () => {
    const form = document.getElementById('quoteForm');
    if (!form) return;
    const msg = document.getElementById('quoteMsg');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      msg.innerHTML = '';
      const submit = form.querySelector('[type="submit"]');
      submit.disabled = true;
      const payload = Object.fromEntries(new FormData(form).entries());
      payload.cart = window.SaferCart.items();
      payload.lang = currentLang();
      payload.source = 'spa-quote-wizard';
      const res = await window.SaferSupabase.submitLead({ kind: 'quote', payload });
      submit.disabled = false;
      if (res.ok) {
        msg.innerHTML = `<div class="form-msg ok">${window.SaferChrome.t('contact.form.ok', currentLang())}</div>`;
        form.reset();
      } else {
        msg.innerHTML = `<div class="form-msg err">${window.SaferChrome.t('contact.form.err', currentLang())} <small>(${res.error || 'unknown'})</small></div>`;
      }
    });
  };

  /* Scroll-spy for nav links on the home page --------------------- */
  const wireScrollSpy = () => {
    // Intentionally minimal — keep hash routing as the source of truth.
  };

  /* Boot ---------------------------------------------------------- */
  const boot = () => {
    wireCartDrawer();
    updateCartBadge();
    window.addEventListener('hashchange', route);
    route();
    // Re-render screen on lang change so any FR-only string rebuilt by SCREENS gets refreshed
    document.addEventListener('safer:langchange', () => {
      const hash = (location.hash || '#/').replace(/^#/, '');
      renderScreen(ROUTES[hash] || 'home');
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
