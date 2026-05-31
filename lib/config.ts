export const SITE = {
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://pinat-hai-burgata.netlify.app',
  phone: '+972500000000',
  phoneDisplay: '050-0000000',
  email: 'info@pinat-hai-burgata.co.il',
  address: {
    he: 'דרך הארז 128, בורגתה',
    ar: 'طريق الأرز 128، برطعة',
    street: 'דרך הארז 128',
    locality: 'בורגתה',
    country: 'IL',
  },
  // Approx coordinates for בורגתה (Burgata), Israel.
  geo: { lat: 32.3217, lng: 35.0036 },
  social: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
  },
} as const;

// Order of links in navbar + footer. `key` maps to messages `nav.*`.
export const NAV_LINKS = [
  { key: 'home', href: '/' },
  { key: 'about', href: '/about' },
  { key: 'animals', href: '/animals' },
  { key: 'activities', href: '/activities' },
  { key: 'events', href: '/events' },
  { key: 'blog', href: '/blog' },
  { key: 'gallery', href: '/gallery' },
  { key: 'visit', href: '/visit' },
  { key: 'groupVisits', href: '/group-visits' },
  { key: 'contact', href: '/contact' },
] as const;
