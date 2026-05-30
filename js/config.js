/**
 * SafeR — centralized config.
 * Single source of truth for the swap-before-launch values (HANDOFF.md §4).
 */
(function () {
  const CONFIG = {
    company: {
      name: 'SafeR',
      legalName: 'RADIANT Assistance Security',
      parent: 'KOGNITIV Technologies',
      domain: 'safer.ci',
      parentDomain: 'radiantsecurity.ci',
      ceo: 'Toupley KONE',
      ceoRole: 'Founder & CEO',
      rccm: 'CI-ABJ-2019-B-XXXXX',
      ncc: 'XXXXXXX',
      capital: 'XX XXX XXX FCFA',
    },
    contact: {
      phoneDisplay: '+225 27 22 00 00 00',
      whatsappE164: '22527220000000',
      emails: {
        general: 'contact@safer.ci',
        privacy: 'privacy@safer.ci',
        support: 'support@safer.ci',
        parent: 'info@Radiant.ci',
      },
      address: {
        short: 'Abidjan Plateau, Côte d\'Ivoire',
        full: '1er Etage, Immeuble le Mali, Rue du Commerce, Plateau · 15 BP 906 ABJ 15',
        mapsLink: 'https://maps.google.com/?q=Abidjan+Plateau',
      },
    },
    hosting: {
      // Update once the real host is chosen
      provider: 'Vercel (Edge Network)',
      region: 'Global',
    },
    social: {
      // Add real handles before launch
      facebook: '',
      instagram: '',
      linkedin: '',
      youtube: '',
    },
  };

  CONFIG.contact.whatsappLink = `https://wa.me/${CONFIG.contact.whatsappE164}`;
  CONFIG.contact.telLink = `tel:${CONFIG.contact.phoneDisplay.replace(/\s+/g, '')}`;
  CONFIG.contact.mailto = {
    general: `mailto:${CONFIG.contact.emails.general}`,
    privacy: `mailto:${CONFIG.contact.emails.privacy}`,
    support: `mailto:${CONFIG.contact.emails.support}`,
  };

  window.SAFER_CONFIG = Object.freeze(CONFIG);
})();
