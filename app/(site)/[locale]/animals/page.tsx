import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Bird, Turtle, Rabbit, Lightbulb } from 'lucide-react';
import type { Locale } from '@/lib/types';
import { getAnimals } from '@/lib/data';
import HeroSection from '@/components/HeroSection';
import AnimalCard from '@/components/AnimalCard';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';
import { pageMetadata } from '@/lib/metadata';

const HERO =
  'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?auto=format&fit=crop&w=1600&q=70';

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }) {
  return pageMetadata({ locale, path: '/animals', namespace: 'animals' });
}

export default async function AnimalsPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  setRequestLocale(locale);
  const t = await getTranslations('animals');
  const animals = await getAnimals();

  const categories = [
    { icon: Turtle, key: 'reptile' },
    { icon: Bird, key: 'bird' },
    { icon: Rabbit, key: 'livestock' },
  ] as const;

  const funFacts = t.raw('funFacts') as string[];

  return (
    <>
      <HeroSection
        title={t('title')}
        subtitle={t('subtitle')}
        imageUrl={HERO}
        imageAlt={t('title')}
        emoji="🐾"
      />

      <section className="section">
        <div className="container-farm grid gap-10 lg:grid-cols-[1fr_300px]">
          <div>
            {/* Categories */}
            <SectionHeading title={t('categories.title')} center={false} />
            <div className="grid gap-4 sm:grid-cols-3">
              {categories.map(({ icon: Icon, key }, i) => (
                <Reveal key={key} delay={i * 0.08}>
                  <div className="flex h-full flex-col items-center gap-2 rounded-card bg-white p-6 text-center shadow-soft">
                    <span className="grid h-14 w-14 place-items-center rounded-full bg-farm-green/10 text-farm-green">
                      <Icon className="h-7 w-7" />
                    </span>
                    <h3 className="text-lg font-extrabold text-farm-text">{t(`categories.${key}`)}</h3>
                    <p className="text-sm text-farm-text/60">{t(`categories.${key}Text`)}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* All animals grid */}
            <h2 className="mt-12 mb-6 text-2xl font-extrabold text-farm-text">{t('title')}</h2>
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {animals.map((animal) => (
                <AnimalCard key={animal.slug} animal={animal} />
              ))}
            </div>
          </div>

          {/* Fun facts sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-card bg-farm-yellow/20 p-6 shadow-soft">
              <h3 className="flex items-center gap-2 text-xl font-extrabold text-farm-text">
                <Lightbulb className="h-6 w-6 text-farm-orange" />
                {t('funFactsTitle')}
              </h3>
              <ul className="mt-4 space-y-3">
                {funFacts.map((fact, i) => (
                  <li key={i} className="flex gap-2 text-farm-text/80">
                    <span>🐾</span>
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
