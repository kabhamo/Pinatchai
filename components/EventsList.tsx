'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import type { FarmEvent, EventCategory } from '@/lib/types';
import EventCard from './EventCard';

const FILTERS: (EventCategory | 'all')[] = [
  'all',
  'celebration',
  'birthday',
  'tour',
  'workshop',
];

export default function EventsList({ events }: { events: FarmEvent[] }) {
  const t = useTranslations('events');
  const [filter, setFilter] = useState<EventCategory | 'all'>('all');

  const visible = events.filter((e) => filter === 'all' || e.category === filter);

  return (
    <>
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
            {f === 'all' ? t('filterAll') : t(`categories.${f}`)}
          </button>
        ))}
      </div>

      {visible.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((event) => (
            <EventCard key={event.slug} event={event} />
          ))}
        </div>
      ) : (
        <p className="text-center text-farm-text/60">{t('empty')}</p>
      )}
    </>
  );
}
