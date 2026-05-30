/**
 * SafeR — inline SVG icon library.
 * Usage: window.SAFER_ICONS.shield(24) or .menu(20)
 */
(function () {
  const svg = (s, size = 24) =>
    `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${s}</svg>`;

  window.SAFER_ICONS = {
    shield: (n) => svg('<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>', n),
    camera: (n) => svg('<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>', n),
    alarm: (n) => svg('<circle cx="12" cy="13" r="8"/><path d="M5 3 2 6M22 6l-3-3M12 9v4l2 2"/>', n),
    lock: (n) => svg('<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>', n),
    gps: (n) => svg('<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/>', n),
    home: (n) => svg('<path d="M3 9 12 2l9 7v11a2 2 0 0 1-2 2h-4v-7H9v7H5a2 2 0 0 1-2-2z"/>', n),
    building: (n) => svg('<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 7v.01M15 7v.01M9 12v.01M15 12v.01M9 17v.01M15 17v.01"/>', n),
    factory: (n) => svg('<path d="M2 20V8l6 4V8l6 4V4h8v16z"/><path d="M10 20v-6M16 20v-6"/>', n),
    check: (n) => svg('<polyline points="20 6 9 17 4 12"/>', n),
    arrow: (n) => svg('<path d="M5 12h14M12 5l7 7-7 7"/>', n),
    menu: (n) => svg('<path d="M3 12h18M3 6h18M3 18h18"/>', n),
    close: (n) => svg('<path d="M18 6 6 18M6 6l12 12"/>', n),
    cart: (n) => svg('<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/>', n),
    user: (n) => svg('<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>', n),
    phone: (n) => svg('<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z"/>', n),
    mail: (n) => svg('<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>', n),
    chevronUp: (n) => svg('<polyline points="18 15 12 9 6 15"/>', n),
    chevronDown: (n) => svg('<polyline points="6 9 12 15 18 9"/>', n),
    whatsapp: (n = 28) => `<svg width="${n}" height="${n}" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true"><path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.633.633 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.717 2.722.717.358 0 2.13-.444 2.13-1.39 0-.156.026-.227.026-.342-.314-.945-2.135-1.504-2.135-2.106zM16.79 5.057c-7.143 0-11.51 7.585-7.973 13.793l-2.106 6.218 6.475-1.99c5.65 3.566 13.106-.493 13.106-7.117 0-5.99-4.873-10.904-10.974-10.904h-.529z"/></svg>`,
  };
})();
