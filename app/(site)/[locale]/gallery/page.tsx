import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/lib/types';
import { getGallery } from '@/lib/data';
import { resolveImage } from '@/lib/utils';
import HeroSection from '@/components/HeroSection';
import GalleryGrid from '@/components/GalleryGrid';
import { pageMetadata } from '@/lib/metadata';

const HERO =
  'https://images.unsplash.com/photo-1574068468668-a05a11f871da?auto=format&fit=crop&w=1600&q=70';

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }) {
  return pageMetadata({ locale, path: '/gallery', namespace: 'gallery' });
}

export default async function GalleryPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  setRequestLocale(locale);
  const t = await getTranslations('gallery');
  const items = await getGallery();

  const resolved = items.map((item) => ({
    ...item,
    resolvedUrl: resolveImage(item.image, item.imageUrl, 700),
  }));

  return (
    <>
      <HeroSection title={t('title')} subtitle={t('subtitle')} imageUrl={HERO} imageAlt={t('title')} emoji="📸" />
      <section className="section">
        <div className="container-farm">
          <GalleryGrid items={resolved} />
        </div>
      </section>
    </>
  );
}
