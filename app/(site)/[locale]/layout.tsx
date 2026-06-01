import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { notoHebrew } from '@/lib/fonts';
import { SITE } from '@/lib/config';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import '../../globals.css';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: 'site' });
  return {
    metadataBase: new URL(SITE.url),
    title: { default: t('name'), template: `%s · ${t('name')}` },
    description: t('tagline'),
    openGraph: {
      type: 'website',
      siteName: t('name'),
      title: t('name'),
      description: t('tagline'),
      locale: locale === 'ar' ? 'ar_IL' : 'he_IL',
      images: [
        { url: '/images/og.png', width: 1200, height: 630, alt: t('name') },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('name'),
      description: t('tagline'),
      images: ['/images/og.png'],
    },
    alternates: {
      canonical: `${SITE.url}/${locale}`,
      languages: {
        he: `${SITE.url}/he`,
        ar: `${SITE.url}/ar`,
        'x-default': `${SITE.url}/he`,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} dir="rtl" className={notoHebrew.variable}>
      <body className="flex min-h-screen flex-col bg-farm-bg font-sans text-farm-text">
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
