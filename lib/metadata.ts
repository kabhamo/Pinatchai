import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { SITE } from './config';
import type { Locale } from './types';

/**
 * Build per-page metadata with canonical + hreflang alternates.
 * `path` is the locale-less route, e.g. '/about'.
 */
export async function pageMetadata({
  locale,
  path,
  namespace,
  title,
  description,
}: {
  locale: Locale;
  path: string;
  namespace?: string;
  title?: string;
  description?: string;
}): Promise<Metadata> {
  let resolvedTitle = title;
  let resolvedDescription = description;

  if (namespace && (!title || !description)) {
    const t = await getTranslations({ locale, namespace });
    resolvedTitle = resolvedTitle ?? t('title');
    resolvedDescription = resolvedDescription ?? t('subtitle');
  }

  const clean = path === '/' ? '' : path;
  return {
    title: resolvedTitle,
    description: resolvedDescription,
    alternates: {
      canonical: `${SITE.url}/${locale}${clean}`,
      languages: {
        he: `/he${clean}`,
        ar: `/ar${clean}`,
      },
    },
    openGraph: {
      title: resolvedTitle,
      description: resolvedDescription,
      url: `${SITE.url}/${locale}${clean}`,
    },
  };
}
