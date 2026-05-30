/**
 * SafeR — product catalogue.
 * 8 representative SKUs across the 5 categories. Schema is identical to the
 * 38-SKU production catalogue described in HANDOFF.md §8 — drop in the rest.
 *
 * cat: "cams" | "alarm" | "domo" | "gps" | "access"
 * Prices in FCFA, integer.
 * img: placeholder base64 SVG (orange-SafeR card). Swap for real product photos.
 */
(function () {
  // Inline placeholder image — orange-SafeR card per HANDOFF §3 fallback design.
  const PH = (label) =>
    'data:image/svg+xml;utf8,' +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
         <defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
           <stop offset="0" stop-color="#F7941D"/><stop offset="1" stop-color="#EF4136"/>
         </linearGradient></defs>
         <rect width="400" height="300" fill="url(#g)"/>
         <text x="200" y="160" font-family="Arial,sans-serif" font-weight="800" font-size="28"
               fill="#fff" text-anchor="middle">SafeR</text>
         <text x="200" y="190" font-family="Arial,sans-serif" font-size="14"
               fill="#fff" text-anchor="middle" opacity=".85">${label}</text>
       </svg>`
    );

  window.PRODUCTS = [
    {
      id: 101, sku: 'SR-CC-5106-WL3', cat: 'cams', brand: 'SafeR',
      name: 'Caméra cube IP 5MP Wi-Fi',
      price: 89000,
      description: 'Caméra cube intérieure 5MP avec vision nocturne couleur.',
      features: ['5MP UHD', 'Vision nocturne couleur', 'Audio bidirectionnel', 'Détection IA'],
      img: PH('Caméra cube 5MP'),
      badge: 'Top Ventes', rating: 4.7, reviews: 234, inStock: true,
    },
    {
      id: 102, sku: 'SR-PTZ-216-WBU4', cat: 'cams', brand: 'SafeR',
      name: 'Caméra PTZ extérieure 4MP',
      price: 245000,
      description: 'Caméra motorisée extérieure pan/tilt/zoom, IP66.',
      features: ['4MP', 'Pan 355° / Tilt 90°', 'Zoom optique 4×', 'IP66 anti-intempéries'],
      img: PH('PTZ 4MP'),
      badge: null, rating: 4.8, reviews: 156, inStock: true,
    },
    {
      id: 103, sku: 'SR-DOM-4K-PRO', cat: 'cams', brand: 'SafeR',
      name: 'Caméra dôme 4K PoE',
      price: 175000,
      description: 'Dôme antivandale 4K, alimentation PoE, idéale commerce.',
      features: ['4K UHD', 'PoE', 'Antivandale IK10', 'IR 30m'],
      img: PH('Dôme 4K PoE'),
      badge: 'Nouveau', rating: 4.6, reviews: 87, inStock: true,
    },
    {
      id: 201, sku: 'SR-AL-HUB-G3', cat: 'alarm', brand: 'SafeR',
      name: 'Centrale d\'alarme connectée',
      price: 145000,
      description: 'Hub d\'alarme Wi-Fi/4G avec sirène intégrée 110dB.',
      features: ['Wi-Fi + 4G secours', 'Sirène 110dB', 'Batterie 12h', 'Compatible Tuya/Google'],
      img: PH('Hub alarme'),
      badge: null, rating: 4.5, reviews: 198, inStock: true,
    },
    {
      id: 202, sku: 'SR-SEN-PIR-W2', cat: 'alarm', brand: 'SafeR',
      name: 'Détecteur de mouvement PIR',
      price: 22000,
      description: 'Capteur infrarouge sans fil, portée 8m, immunité animaux.',
      features: ['Portée 8m', 'Immunité jusqu\'à 25kg', 'Pile 2 ans', 'Sans fil 868MHz'],
      img: PH('Détecteur PIR'),
      badge: null, rating: 4.4, reviews: 312, inStock: true,
    },
    {
      id: 301, sku: 'SR-DOM-SW-3G', cat: 'domo', brand: 'SafeR',
      name: 'Interrupteur connecté 3 zones',
      price: 38000,
      description: 'Interrupteur tactile 3 zones compatible Wi-Fi et matter.',
      features: ['3 zones indépendantes', 'Wi-Fi + Matter', 'Pilotage vocal', 'Sans fil neutre requis'],
      img: PH('Interrupteur 3G'),
      badge: null, rating: 4.3, reviews: 64, inStock: true,
    },
    {
      id: 401, sku: 'SR-GPS-TRK-VEH', cat: 'gps', brand: 'RADTrack',
      name: 'Traceur GPS véhicule RADTrack',
      price: 95000,
      description: 'Traceur GPS 4G avec coupure moteur à distance.',
      features: ['Tracking temps réel', 'Coupure moteur', 'Géofencing', 'Historique 90 jours'],
      img: PH('Traceur GPS véhicule'),
      badge: 'RADTrack', rating: 4.7, reviews: 142, inStock: true,
    },
    {
      id: 501, sku: 'SR-LOK-PRO-FP', cat: 'access', brand: 'SafeR',
      name: 'Serrure connectée biométrique',
      price: 215000,
      description: 'Serrure intelligente avec empreinte, code, carte et application.',
      features: ['Empreinte digitale', 'Code PIN', 'Carte RFID', 'Pilotage app distante'],
      img: PH('Serrure biométrique'),
      badge: null, rating: 4.6, reviews: 89, inStock: true,
    },
  ];

  window.CATEGORIES = [
    { id: 'all', fr: 'Tous', en: 'All' },
    { id: 'cams', fr: 'Caméras', en: 'Cameras' },
    { id: 'alarm', fr: 'Alarmes', en: 'Alarms' },
    { id: 'domo', fr: 'Domotique', en: 'Smart home' },
    { id: 'gps', fr: 'GPS RADTrack', en: 'RADTrack GPS' },
    { id: 'access', fr: 'Contrôle d\'accès', en: 'Access control' },
  ];
})();
