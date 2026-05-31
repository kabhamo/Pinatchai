import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { resolveImage, localized } from '@/lib/utils';
import type { Animal, Locale } from '@/lib/types';

export default function AnimalCard({ animal }: { animal: Animal }) {
  const locale = useLocale() as Locale;
  const t = useTranslations('animals');
  const name = localized(animal as unknown as Record<string, unknown>, 'name', locale);
  const img = resolveImage(animal.image, animal.imageUrl, 600);
  const categoryLabel = t(`categories.${animal.category}`);
  const fact = animal.funFacts?.[0]?.[locale] ?? animal.funFacts?.[0]?.he;

  return (
    <Link
      href={`/animals/${animal.slug}`}
      className="group block w-64 shrink-0 overflow-hidden rounded-card bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-soft-lg sm:w-auto"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-farm-green-light/20">
        {img && (
          <Image
            src={img}
            alt={name}
            fill
            sizes="(max-width: 640px) 256px, 300px"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        )}
        <span className="absolute end-3 top-3 rounded-pill bg-white/90 px-3 py-1 text-xs font-bold text-farm-green">
          {categoryLabel}
        </span>
      </div>
      <div className="p-4">
        <h3 className="flex items-center gap-2 text-xl font-extrabold text-farm-text">
          {animal.emoji && <span>{animal.emoji}</span>}
          {name}
        </h3>
        {fact && <p className="mt-1 line-clamp-2 text-sm text-farm-text/60">{fact}</p>}
        <span className="mt-3 inline-block text-sm font-bold text-farm-orange">
          {t('viewAnimal')} ←
        </span>
      </div>
    </Link>
  );
}
