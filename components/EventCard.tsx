import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { CalendarDays } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { resolveImage, localized, formatDate } from '@/lib/utils';
import type { FarmEvent, Locale } from '@/lib/types';

export default function EventCard({ event }: { event: FarmEvent }) {
  const locale = useLocale() as Locale;
  const t = useTranslations('events');
  const title = localized(event as unknown as Record<string, unknown>, 'title', locale);
  const desc = localized(event as unknown as Record<string, unknown>, 'description', locale);
  const img = resolveImage(event.image, event.imageUrl, 600);

  return (
    <article className="group flex flex-col overflow-hidden rounded-card bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-soft-lg">
      <div className="relative aspect-[16/10] overflow-hidden bg-farm-green-light/20">
        {img && (
          <Image
            src={img}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 380px"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        )}
        <span className="absolute start-3 top-3 flex items-center gap-1.5 rounded-pill bg-farm-yellow px-3 py-1 text-xs font-bold text-farm-text">
          <CalendarDays className="h-4 w-4" />
          {formatDate(event.date, locale)}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-xl font-extrabold text-farm-text">{title}</h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm text-farm-text/60">{desc}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-extrabold text-farm-green">
            {event.price ? `${t('from')} ₪${event.price}` : t('free')}
          </span>
          <Link
            href={`/events/${event.slug}`}
            className="rounded-pill bg-farm-orange px-5 py-2 text-sm font-bold text-white transition hover:brightness-105"
          >
            {t('register')}
          </Link>
        </div>
      </div>
    </article>
  );
}
