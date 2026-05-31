'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { GalleryItem, GalleryCategory } from '@/lib/types';

const FILTERS: (GalleryCategory | 'all')[] = ['all', 'animals', 'events', 'activities', 'farm'];

export default function GalleryGrid({
  items,
}: {
  items: (GalleryItem & { resolvedUrl?: string })[];
}) {
  const t = useTranslations('gallery');
  const [filter, setFilter] = useState<GalleryCategory | 'all'>('all');
  const [active, setActive] = useState<number | null>(null);

  const visible = items.filter((i) => filter === 'all' || i.category === filter);

  return (
    <>
      {/* Filters */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={cn(
              'min-h-[44px] rounded-pill px-5 text-sm font-bold transition',
              filter === f
                ? 'bg-farm-green text-white shadow-soft'
                : 'bg-white text-farm-text/70 ring-1 ring-black/5 hover:bg-farm-green/5'
            )}
          >
            {t(`filters.${f}`)}
          </button>
        ))}
      </div>

      {/* Masonry */}
      <div className="columns-2 gap-4 [column-fill:_balance] sm:columns-3 lg:columns-4">
        {visible.map((item, i) => (
          <button
            key={item._id}
            type="button"
            onClick={() => setActive(i)}
            className="group mb-4 block w-full overflow-hidden rounded-card shadow-soft"
          >
            {item.resolvedUrl && (
              <Image
                src={item.resolvedUrl}
                alt={item.title ?? ''}
                width={500}
                height={Math.round(500 * (i % 3 === 0 ? 1.3 : i % 2 === 0 ? 0.8 : 1))}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="h-auto w-full object-cover transition duration-500 group-hover:scale-105"
              />
            )}
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {active !== null && visible[active]?.resolvedUrl && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4"
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            aria-label={t('close')}
            className="absolute end-4 top-4 grid h-12 w-12 place-items-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
            onClick={() => setActive(null)}
          >
            <X className="h-6 w-6" />
          </button>
          <div className="relative max-h-[85vh] w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <Image
              src={visible[active].resolvedUrl!}
              alt={visible[active].title ?? ''}
              width={1200}
              height={800}
              className="h-auto max-h-[85vh] w-full rounded-card object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
