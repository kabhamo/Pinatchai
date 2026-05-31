import { SITE } from '@/lib/config';

/** LocalBusiness structured data for the farm — render once on the homepage. */
export function LocalBusinessJsonLd({ locale }: { locale: 'he' | 'ar' }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: locale === 'ar' ? 'ركن الحيوانات - برطعة' : 'פינת חי - בורגתה',
    description:
      locale === 'ar' ? 'تجربة لا تُنسى لكل العائلة' : 'חוויה בלתי נשכחת לכל המשפחה',
    url: SITE.url,
    telephone: SITE.phone,
    email: SITE.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.locality,
      addressCountry: SITE.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE.geo.lat,
      longitude: SITE.geo.lng,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        opens: '09:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Friday',
        opens: '09:00',
        closes: '14:00',
      },
    ],
    image: `${SITE.url}/images/hero-bg.jpg`,
    priceRange: '₪₪',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
