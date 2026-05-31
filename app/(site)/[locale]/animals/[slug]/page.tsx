import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ArrowLeft, Heart, Lightbulb, Stethoscope } from 'lucide-react';
import { Link } from '@/i18n/routing';
import type { Locale } from '@/lib/types';
import { getAnimal, getAnimals } from '@/lib/data';
import { resolveImage, localized } from '@/lib/utils';
import { pageMetadata } from '@/lib/metadata';
import Reveal from '@/components/Reveal';

export async function generateStaticParams() {
  const animals = await getAnimals();
  return animals.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params: { locale, slug },
}: {
  params: { locale: Locale; slug: string };
}) {
  const animal = await getAnimal(slug);
  if (!animal) return {};
  const name = localized(animal as unknown as Record<string, unknown>, 'name', locale);
  const desc = localized(animal as unknown as Record<string, unknown>, 'description', locale);
  return pageMetadata({ locale, path: `/animals/${slug}`, title: name, description: desc });
}

export default async function AnimalDetailPage({
  params: { locale, slug },
}: {
  params: { locale: Locale; slug: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations('animals');
  const animal = await getAnimal(slug);
  if (!animal) notFound();

  const rec = animal as unknown as Record<string, unknown>;
  const name = localized(rec, 'name', locale);
  const description = localized(rec, 'description', locale);
  const care = localized(rec, 'careInfo', locale);
  const img = resolveImage(animal.image, animal.imageUrl, 900);
  const funFacts = (animal.funFacts ?? []).map((f) => f[locale] ?? f.he);

  return (
    <div className="container-farm py-10 sm:py-14">
      <Link href="/animals" className="inline-flex items-center gap-1 text-sm font-bold text-farm-green hover:underline">
        <ArrowLeft className="h-4 w-4" />
        {t('detail.back')}
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        {/* Image */}
        <Reveal>
          <div className="relative aspect-square overflow-hidden rounded-card bg-farm-green-light/20 shadow-soft">
            {img && <Image src={img} alt={name} fill priority sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />}
            <span className="absolute end-4 top-4 rounded-pill bg-white/90 px-4 py-1.5 text-sm font-bold text-farm-green">
              {t(`categories.${animal.category}`)}
            </span>
          </div>
        </Reveal>

        {/* Info */}
        <div>
          <h1 className="flex items-center gap-3 text-4xl font-extrabold text-farm-text">
            {animal.emoji && <span>{animal.emoji}</span>}
            {name}
          </h1>

          {description && (
            <>
              <h2 className="mt-6 text-xl font-extrabold text-farm-green">{t('detail.description')}</h2>
              <p className="mt-2 leading-relaxed text-farm-text/70">{description}</p>
            </>
          )}

          {funFacts.length > 0 && (
            <div className="mt-6 rounded-card bg-farm-yellow/20 p-5">
              <h2 className="flex items-center gap-2 text-xl font-extrabold text-farm-text">
                <Lightbulb className="h-5 w-5 text-farm-orange" />
                {t('detail.funFacts')}
              </h2>
              <ul className="mt-3 space-y-2">
                {funFacts.map((fact, i) => (
                  <li key={i} className="flex gap-2 text-farm-text/80">
                    <span>🐾</span>
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {care && (
            <>
              <h2 className="mt-6 flex items-center gap-2 text-xl font-extrabold text-farm-green">
                <Stethoscope className="h-5 w-5" />
                {t('detail.care')}
              </h2>
              <p className="mt-2 leading-relaxed text-farm-text/70">{care}</p>
            </>
          )}

          <Link href="/visit" className="btn-primary mt-8">
            <Heart className="h-5 w-5" />
            {t('detail.cta')}
          </Link>
        </div>
      </div>
    </div>
  );
}
