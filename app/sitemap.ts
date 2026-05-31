import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/config';
import { routing } from '@/i18n/routing';
import { getAnimals, getEvents, getBlogPosts } from '@/lib/data';

// Locale-less static routes. Each is emitted for every locale with hreflang
// alternates pointing at the other locale(s).
const STATIC_PATHS = [
  '',
  '/about',
  '/animals',
  '/activities',
  '/events',
  '/blog',
  '/gallery',
  '/visit',
  '/group-visits',
  '/contact',
];

function entry(path: string, lastModified?: string | Date): MetadataRoute.Sitemap[number] {
  const clean = path === '/' ? '' : path;
  return {
    url: `${SITE.url}/${routing.defaultLocale}${clean}`,
    lastModified: lastModified ?? new Date(),
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((loc) => [loc, `${SITE.url}/${loc}${clean}`])
      ),
    },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [animals, events, posts] = await Promise.all([
    getAnimals(),
    getEvents(),
    getBlogPosts(),
  ]);

  return [
    ...STATIC_PATHS.map((p) => entry(p)),
    ...animals.map((a) => entry(`/animals/${a.slug}`)),
    ...events.map((e) => entry(`/events/${e.slug}`, e.date)),
    ...posts.map((p) => entry(`/blog/${p.slug}`, p.publishedAt)),
  ];
}
