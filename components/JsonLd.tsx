import { SITE } from '@/lib/config';
import { localized, resolveImage } from '@/lib/utils';
import type { FarmEvent, Locale } from '@/lib/types';

const BUSINESS_NAME = (locale: Locale) =>
  locale === 'ar' ? 'ركن الحيوانات - بورغاتا' : 'פינת חי - בורגתה';
const TAGLINE = (locale: Locale) =>
  locale === 'ar' ? 'تجربة لا تُنسى لكل العائلة' : 'חוויה בלתי נשכחת לכל המשפחה';

function postalAddress() {
  return {
    '@type': 'PostalAddress',
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.locality,
    addressCountry: SITE.address.country,
  };
}

/**
 * LocalBusiness + TouristAttraction structured data for the farm.
 * Render once on the homepage.
 */
export function LocalBusinessJsonLd({ locale }: { locale: Locale }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'TouristAttraction'],
    '@id': `${SITE.url}/#business`,
    name: BUSINESS_NAME(locale),
    description: TAGLINE(locale),
    url: SITE.url,
    telephone: SITE.phone,
    email: SITE.email,
    image: `${SITE.url}/images/og.png`,
    priceRange: '₪₪',
    currenciesAccepted: 'ILS',
    address: postalAddress(),
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE.geo.lat,
      longitude: SITE.geo.lng,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    sameAs: [SITE.social.facebook, SITE.social.instagram],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Event structured data for each upcoming event. Render on pages that list
 * events (e.g. the homepage upcoming-events section).
 */
export function EventsJsonLd({
  events,
  locale,
}: {
  events: FarmEvent[];
  locale: Locale;
}) {
  return (
    <>
      {events.map((event) => {
        const rec = event as unknown as Record<string, unknown>;
        const image = resolveImage(event.image, event.imageUrl, 1200);
        const data = {
          '@context': 'https://schema.org',
          '@type': 'Event',
          name: localized(rec, 'title', locale),
          description: localized(rec, 'description', locale),
          startDate: event.date,
          ...(event.endDate ? { endDate: event.endDate } : {}),
          eventStatus: 'https://schema.org/EventScheduled',
          eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
          ...(image ? { image: [image] } : {}),
          url: `${SITE.url}/${locale}/events/${event.slug}`,
          location: {
            '@type': 'Place',
            name: BUSINESS_NAME(locale),
            address: postalAddress(),
          },
          organizer: {
            '@type': 'Organization',
            name: BUSINESS_NAME(locale),
            url: SITE.url,
          },
          ...(event.price != null
            ? {
                offers: {
                  '@type': 'Offer',
                  price: event.price,
                  priceCurrency: 'ILS',
                  availability: 'https://schema.org/InStock',
                  url: `${SITE.url}/${locale}/events/${event.slug}`,
                },
              }
            : {}),
        };
        return (
          <script
            key={event.slug}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
          />
        );
      })}
    </>
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
