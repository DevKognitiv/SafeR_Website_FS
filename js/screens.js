/**
 * SafeR — SPA screen renderers.
 * Each function returns the HTML for its hash route. Uses data-i18n keys so
 * the chrome's applyPageI18n() can swap FR ↔ EN without re-rendering.
 *
 * Signature: (lang, ctx) => string
 * ctx = { C: SAFER_CONFIG, I: SAFER_I18N, products: PRODUCTS, cats: CATEGORIES }
 */
(function () {
  const fmt = (n) => n.toLocaleString('fr-FR');
  const icon = (k, n) => (window.SAFER_ICONS[k] || (() => ''))(n);

  const home = (lang, { products }) => `
    <section class="hero">
      <div class="container">
        <div class="hero-grid">
          <div>
            <span class="section-head eyebrow" data-i18n="home.hero.eyebrow">Sécurité connectée · Côte d'Ivoire</span>
            <h1 data-i18n-html="home.hero.title.html">Protégez ce qui compte avec <span class="grad">SafeR</span></h1>
            <p class="lead" data-i18n="home.hero.lead">Caméras, alarmes, domotique et tracking GPS — installés, supervisés et entretenus par les équipes RADIANT à Abidjan.</p>
            <div class="ctas">
              <a class="btn btn-primary btn-lg" href="#/quote" data-i18n="home.hero.cta.primary">Demander un devis</a>
              <a class="btn btn-ghost btn-lg" href="#/store" data-i18n="home.hero.cta.secondary" style="color:#fff;border-color:rgba(255,255,255,.3)">Voir la boutique</a>
            </div>
            <div class="hero-stats">
              <div class="hero-stat"><div class="n" data-i18n="home.hero.stat1.n">24/7</div><div class="l" data-i18n="home.hero.stat1.l">Supervision centrale</div></div>
              <div class="hero-stat"><div class="n" data-i18n="home.hero.stat2.n">500+</div><div class="l" data-i18n="home.hero.stat2.l">Sites protégés</div></div>
              <div class="hero-stat"><div class="n" data-i18n="home.hero.stat3.n">15 min</div><div class="l" data-i18n="home.hero.stat3.l">Délai intervention</div></div>
            </div>
          </div>
          <div class="hero-card">
            <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">
              <div style="width:44px;height:44px;border-radius:12px;background:linear-gradient(135deg,#F7941D,#EF4136);display:grid;place-items:center;color:#fff">${icon('shield', 22)}</div>
              <div>
                <div style="font-weight:700">Centrale SafeR</div>
                <div style="color:#C7CBE0;font-size:13px">Abidjan · En ligne</div>
              </div>
              <span style="margin-left:auto;width:10px;height:10px;border-radius:50%;background:#10B981;box-shadow:0 0 0 4px rgba(16,185,129,.2)"></span>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
              ${[
                ['Caméras actives', '1 248'],
                ['Alertes 24h', '4'],
                ['Interventions cours', '0'],
                ['Disponibilité', '99.98%'],
              ].map(([k, v]) => `
                <div style="background:rgba(255,255,255,.06);border-radius:12px;padding:14px">
                  <div style="font-size:12px;color:#939BB5">${k}</div>
                  <div style="font-weight:800;font-size:20px;color:#fff">${v}</div>
                </div>`).join('')}
            </div>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="container">
        <div class="section-head">
          <span class="eyebrow" data-i18n="home.solutions.eyebrow">Nos solutions</span>
          <h2 data-i18n="home.solutions.title">Une protection adaptée à chaque besoin</h2>
          <p data-i18n="home.solutions.lead">Quatre familles de solutions, un seul interlocuteur de la pose au support.</p>
        </div>
        <div class="grid-4">
          ${[
            ['home', '/solutions-residential.html', 'home.solutions.res.title', 'home.solutions.res.body'],
            ['building', '/solutions-commercial.html', 'home.solutions.com.title', 'home.solutions.com.body'],
            ['factory', '/solutions-industrial.html', 'home.solutions.ind.title', 'home.solutions.ind.body'],
            ['gps', '/solutions-gps.html', 'home.solutions.gps.title', 'home.solutions.gps.body'],
          ].map(([ic, href, tk, bk]) => `
            <a class="card" href="${href}" style="text-decoration:none;color:inherit">
              <div class="icon">${icon(ic, 22)}</div>
              <h3 data-i18n="${tk}"></h3>
              <p data-i18n="${bk}" style="color:var(--ink-soft)"></p>
              <div style="display:flex;align-items:center;gap:6px;color:var(--safer-orange);font-weight:600;margin-top:8px">
                <span data-i18n="home.solutions.cta">Découvrir</span> ${icon('arrow', 16)}
              </div>
            </a>`).join('')}
        </div>
      </div>
    </section>

    <section style="background:var(--bg-soft)">
      <div class="container">
        <div class="section-head">
          <span class="eyebrow" data-i18n="home.products.eyebrow">Boutique</span>
          <h2 data-i18n="home.products.title">Matériel SafeR en vedette</h2>
          <p data-i18n="home.products.lead">Caméras, alarmes, capteurs et serrures connectées.</p>
        </div>
        <div class="grid-4">
          ${products.slice(0, 4).map(productCard).join('')}
        </div>
        <div style="text-align:center;margin-top:32px">
          <a class="btn btn-ghost" href="#/store" data-i18n="home.products.cta">Voir tout le catalogue</a>
        </div>
      </div>
    </section>

    <section>
      <div class="container" style="text-align:center;max-width:720px">
        <h2 data-i18n="home.cta.title">Prêt à sécuriser votre site ?</h2>
        <p style="color:var(--ink-soft);margin-bottom:24px" data-i18n="home.cta.lead">Un expert SafeR vous rappelle sous 24h ouvrées.</p>
        <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
          <a class="btn btn-primary btn-lg" href="#/quote" data-i18n="home.cta.btn">Obtenir un devis</a>
          <a class="btn btn-ghost btn-lg" href="${window.SAFER_CONFIG.contact.telLink}">${window.SAFER_CONFIG.contact.phoneDisplay}</a>
        </div>
      </div>
    </section>`;

  const productCard = (p) => `
    <article class="product-card" data-cat="${p.cat}">
      <a href="/product-detail.html?id=${p.id}" class="img-wrap">
        ${p.badge ? `<span class="badge">${p.badge}</span>` : ''}
        <img src="${p.img}" alt="${p.name}" loading="lazy">
      </a>
      <div class="body">
        <div class="meta">${p.brand} · ${p.sku}</div>
        <div class="name">${p.name}</div>
        <div class="price">${fmt(p.price)} <span style="font-size:13px;color:var(--muted)">FCFA</span></div>
        <div class="actions">
          <button class="btn btn-primary btn-sm" type="button" data-add-cart="${p.id}" data-i18n="common.add">Ajouter</button>
          <a class="btn btn-ghost btn-sm" href="/product-detail.html?id=${p.id}" data-i18n="common.learn">En savoir plus</a>
        </div>
      </div>
    </article>`;

  const store = (lang, { products, cats }) => `
    <section style="padding:48px 0 32px">
      <div class="container">
        <h1 data-i18n="home.products.title">Boutique SafeR</h1>
        <p data-i18n="home.products.lead" style="color:var(--ink-soft)"></p>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin:24px 0">
          ${cats.map((c, i) => `
            <button class="btn btn-ghost btn-sm ${i === 0 ? 'active' : ''}" type="button" data-cat-filter="${c.id}">${c[lang] || c.fr}</button>
          `).join('')}
        </div>
        <div class="grid-4">${products.map(productCard).join('')}</div>
      </div>
    </section>`;

  const portal = (lang, { C }) => `
    <section style="padding:48px 0">
      <div class="container" style="max-width:980px">
        <h1>Portail client</h1>
        <p style="color:var(--ink-soft)">Connectez-vous pour gérer vos sites, voir vos alertes et accéder à vos factures.</p>
        <div class="grid-2" style="margin-top:32px">
          <div class="card">
            <h3>Connexion</h3>
            <p style="color:var(--ink-soft);font-size:14px">Démo statique — l'auth Supabase est prête à être activée côté backend.</p>
            <div class="field"><label>Email</label><input type="email" placeholder="vous@exemple.ci"></div>
            <div class="field"><label>Mot de passe</label><input type="password" placeholder="••••••••"></div>
            <button class="btn btn-primary" type="button" disabled title="Auth Supabase à activer">Se connecter</button>
          </div>
          <div class="card dark">
            <h3>Pas encore client ?</h3>
            <p>Demandez un devis personnalisé. Un expert vous rappelle sous 24h.</p>
            <a class="btn btn-primary" href="#/quote">Demander un devis</a>
          </div>
        </div>
        <div style="margin-top:48px">
          <h2>Aperçu du tableau de bord</h2>
          <div class="grid-4" style="margin-top:16px">
            ${[
              ['Caméras', '12', '#F7941D'],
              ['Alertes 24h', '0', '#10B981'],
              ['Interventions', '1', '#4556F5'],
              ['SLA', '99.9%', '#52C6FF'],
            ].map(([k, v, c]) => `
              <div class="card">
                <div style="color:var(--muted);font-size:13px">${k}</div>
                <div style="font-weight:800;font-size:28px;color:${c}">${v}</div>
              </div>`).join('')}
          </div>
        </div>
      </div>
    </section>`;

  const partner = () => `
    <section style="padding:48px 0">
      <div class="container">
        <h1>Espace partenaire</h1>
        <p style="color:var(--ink-soft)">Tableau de bord des tickets et interventions (démo statique).</p>
        <div class="grid-3" style="margin-top:32px">
          ${[
            ['Tickets ouverts', '12', '#F7941D'],
            ['Interventions du jour', '4', '#4556F5'],
            ['SLA 7j', '97.4%', '#10B981'],
          ].map(([k, v, c]) => `
            <div class="card">
              <div style="color:var(--muted);font-size:13px">${k}</div>
              <div style="font-weight:800;font-size:32px;color:${c}">${v}</div>
            </div>`).join('')}
        </div>
        <div class="card" style="margin-top:32px">
          <h3>Tickets récents</h3>
          <table style="width:100%;border-collapse:collapse">
            <thead><tr style="text-align:left;border-bottom:1px solid var(--divider);color:var(--muted);font-size:13px">
              <th style="padding:8px 0">#</th><th>Site</th><th>Sujet</th><th>Statut</th>
            </tr></thead>
            <tbody>
              ${[
                ['T-3041', 'Villa Cocody · #14', 'Caméra hors-ligne', 'En cours'],
                ['T-3040', 'Boutique Plateau · #2', 'Alarme test', 'Résolu'],
                ['T-3039', 'Entrepôt Yopougon', 'Maintenance planifiée', 'Planifié'],
              ].map(([id, site, sub, st]) => `
                <tr style="border-bottom:1px solid var(--divider)">
                  <td style="padding:12px 0;font-weight:600">${id}</td>
                  <td>${site}</td>
                  <td style="color:var(--ink-soft)">${sub}</td>
                  <td><span style="padding:4px 10px;border-radius:999px;background:var(--bg-soft);font-size:12px;font-weight:600">${st}</span></td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </section>`;

  const quote = (lang) => `
    <section style="padding:48px 0">
      <div class="container" style="max-width:720px">
        <h1>Demande de devis</h1>
        <p style="color:var(--ink-soft)" data-i18n="contact.lead">Un expert SafeR vous rappelle sous 24h ouvrées.</p>
        <div id="quoteMsg" style="margin-top:16px"></div>
        <form id="quoteForm" class="card" style="margin-top:24px" novalidate>
          <input type="text" name="website" tabindex="-1" autocomplete="off" style="position:absolute;left:-9999px" aria-hidden="true">
          <div class="field-grid">
            <div class="field">
              <label data-i18n="contact.form.name">Nom complet</label>
              <input type="text" name="name" required>
            </div>
            <div class="field">
              <label data-i18n="contact.form.email">Email</label>
              <input type="email" name="email" required>
            </div>
          </div>
          <div class="field-grid">
            <div class="field">
              <label data-i18n="contact.form.phone">Téléphone</label>
              <input type="tel" name="phone" required>
            </div>
            <div class="field">
              <label>Type de site</label>
              <select name="site_type">
                <option value="apartment">Appartement</option>
                <option value="villa">Villa</option>
                <option value="shop">Boutique</option>
                <option value="office">Bureaux</option>
                <option value="industrial">Site industriel</option>
                <option value="other">Autre</option>
              </select>
            </div>
          </div>
          <div class="field">
            <label>Forfait souhaité</label>
            <select name="plan">
              <option value="">Sans préférence</option>
              <option value="activ">Smart'Activ</option>
              <option value="zen">Smart'Zen</option>
              <option value="hypnoz">Smart'Hypnoz</option>
              <option value="flex">Smart'Flex</option>
            </select>
          </div>
          <div class="field">
            <label>Adresse du site</label>
            <input type="text" name="address" placeholder="Commune, quartier">
          </div>
          <div class="field">
            <label data-i18n="contact.form.message">Votre message</label>
            <textarea name="notes" placeholder="Surface, nombre d'accès, contraintes particulières…"></textarea>
          </div>
          <button class="btn btn-primary" type="submit" data-i18n="contact.form.send">Envoyer</button>
        </form>
      </div>
    </section>`;

  window.SAFER_SCREENS = { home, store, portal, partner, quote };
})();
