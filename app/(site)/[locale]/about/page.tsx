import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { GraduationCap, Smile, Leaf } from 'lucide-react';
import type { Locale } from '@/lib/types';
import HeroSection from '@/components/HeroSection';
import SectionHeading from '@/components/SectionHeading';
import MapEmbed from '@/components/MapEmbed';
import Reveal from '@/components/Reveal';
import { pageMetadata } from '@/lib/metadata';

const HERO =
  'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1600&q=70';
const TEAM = '/images/image_1.jpeg';

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }) {
  const t = await getTranslations({ locale, namespace: 'about' });
  return pageMetadata({ locale, path: '/about', title: t('title'), description: t('hero') });
}

export default async function AboutPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  setRequestLocale(locale);
  const t = await getTranslations('about');

  const values = [
    { icon: GraduationCap, key: 'education' },
    { icon: Smile, key: 'fun' },
    { icon: Leaf, key: 'nature' },
  ] as const;

  return (
    <>
      <HeroSection
        title={t('title')}
        subtitle={t('hero')}
        imageUrl={HERO}
        imageAlt={t('title')}
        emoji="🌳"
      />

      {/* Story */}
      <section className="section">
        <div className="container-farm grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-card shadow-soft">
              <Image src={TEAM} alt={t('team.title')} fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <h2 className="section-title">{t('story.title')}</h2>
              <p className="mt-4 text-lg leading-relaxed text-farm-text/70">{t('story.text')}</p>
              <h3 className="mt-8 text-2xl font-extrabold text-farm-green">{t('mission.title')}</h3>
              <p className="mt-2 text-farm-text/70">{t('mission.text')}</p>
              <h3 className="mt-6 text-2xl font-extrabold text-farm-green">{t('team.title')}</h3>
              <p className="mt-2 text-farm-text/70">{t('team.text')}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-farm-green-light/10">
        <div className="container-farm">
          <SectionHeading title={t('values.title')} emoji="💚" />
          <div className="grid gap-6 sm:grid-cols-3">
            {values.map(({ icon: Icon, key }, i) => (
              <Reveal key={key} delay={i * 0.1}>
                <div className="flex h-full flex-col items-center gap-3 rounded-card bg-white p-8 text-center shadow-soft">
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-farm-green/10 text-farm-green">
                    <Icon className="h-8 w-8" />
                  </span>
                  <h3 className="text-xl font-extrabold text-farm-text">{t(`values.${key}.title`)}</h3>
                  <p className="text-sm text-farm-text/60">{t(`values.${key}.text`)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="section">
        <div className="container-farm">
          <SectionHeading title={t('location.title')} emoji="📍" />
          <MapEmbed title={t('location.title')} />
        </div>
      </section>
    </>
  );
}
