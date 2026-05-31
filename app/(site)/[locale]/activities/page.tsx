import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Clock, Check } from 'lucide-react';
import type { Locale } from '@/lib/types';
import HeroSection from '@/components/HeroSection';
import Reveal from '@/components/Reveal';
import { pageMetadata } from '@/lib/metadata';
import { cn } from '@/lib/utils';

const HERO =
  'https://images.unsplash.com/photo-1444212477490-ca407925329e?auto=format&fit=crop&w=1600&q=70';
const IMG = {
  feeding: 'https://images.unsplash.com/photo-1444212477490-ca407925329e?auto=format&fit=crop&w=900&q=70',
  kids: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=900&q=70',
  play: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=900&q=70',
};

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }) {
  return pageMetadata({ locale, path: '/activities', namespace: 'activities' });
}

export default async function ActivitiesPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  setRequestLocale(locale);
  const t = await getTranslations('activities');

  const kidsList = t.raw('kids.list') as string[];
  const playFeatures = t.raw('play.features') as string[];

  return (
    <>
      <HeroSection title={t('title')} subtitle={t('subtitle')} imageUrl={HERO} imageAlt={t('title')} emoji="🎈" />

      {/* Feeding */}
      <section className="section">
        <div className="container-farm grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-card shadow-soft">
              <Image src={IMG.feeding} alt={t('feeding.title')} fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <h2 className="section-title">🥕 {t('feeding.title')}</h2>
              <p className="mt-4 text-lg text-farm-text/70">{t('feeding.text')}</p>
              <div className="mt-5 inline-flex items-center gap-2 rounded-pill bg-farm-green/10 px-5 py-2.5 font-bold text-farm-green">
                <Clock className="h-5 w-5" />
                {t('feeding.scheduleTitle')}: <span dir="ltr">{t('feeding.schedule')}</span>
              </div>
              <p className="mt-4 text-farm-text/70">{t('feeding.allowed')}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Kids */}
      <section className="section bg-farm-green-light/10">
        <div className="container-farm grid items-center gap-10 lg:grid-cols-2">
          <Reveal className="lg:order-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-card shadow-soft">
              <Image src={IMG.kids} alt={t('kids.title')} fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:order-1">
            <div>
              <h2 className="section-title">🎨 {t('kids.title')}</h2>
              <p className="mt-4 text-lg text-farm-text/70">{t('kids.text')}</p>
              <span className="mt-4 inline-block rounded-pill bg-farm-yellow px-4 py-1.5 text-sm font-bold text-farm-text">
                {t('kids.ageGroups')}
              </span>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {kidsList.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-farm-text/80">
                    <Check className="h-5 w-5 shrink-0 text-farm-green" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Play */}
      <section className="section">
        <div className="container-farm grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-card shadow-soft">
              <Image src={IMG.play} alt={t('play.title')} fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <h2 className="section-title">🛝 {t('play.title')}</h2>
              <p className="mt-4 text-lg text-farm-text/70">{t('play.text')}</p>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {playFeatures.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-farm-text/80">
                    <Check className="h-5 w-5 shrink-0 text-farm-green" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
