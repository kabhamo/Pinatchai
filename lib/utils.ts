import { urlForImage } from '@/sanity/client';
import type { Image } from 'sanity';
import type { Locale } from './types';

/** Resolve an image URL from either a Sanity image or a local fallback URL. */
export function resolveImage(
  source: Image | undefined,
  fallbackUrl: string | undefined,
  width = 800
): string | undefined {
  if (source) {
    const built = urlForImage(source);
    if (built) return built.width(width).fit('crop').auto('format').url();
  }
  return fallbackUrl;
}

/** Pick the right localized field, e.g. localized(obj, 'name', 'he'). */
export function localized<T extends Record<string, unknown>>(
  obj: T,
  base: string,
  locale: Locale
): string {
  return (obj[`${base}_${locale}`] as string) ?? (obj[`${base}_he`] as string) ?? '';
}

export function formatDate(iso: string, locale: Locale): string {
  const intlLocale = locale === 'ar' ? 'ar' : 'he-IL';
  return new Intl.DateTimeFormat(intlLocale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(iso));
}

export function formatTime(iso: string, locale: Locale): string {
  const intlLocale = locale === 'ar' ? 'ar' : 'he-IL';
  return new Intl.DateTimeFormat(intlLocale, {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(iso));
}

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
