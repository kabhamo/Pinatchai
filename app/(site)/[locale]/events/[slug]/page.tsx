import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ArrowLeft, CalendarDays, Clock, MapPin, Banknote, Users } from 'lucide-react';
import { Link } from '@/i18n/routing';
import type { Locale } from '@/lib/types';
import { getEvent, getEvents } from '@/lib/data';
import { resolveImage, localized, formatDate, formatTime } from '@/lib/utils';
import { pageMetadata } from '@/lib/metadata';
import { SITE } from '@/lib/config';
import ContactForm from '@/components/ContactForm';
import Reveal from '@/components/Reveal';

export async function generateStaticParams() {
  const events = await getEvents();
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params: { locale, slug },
}: {
  params: { locale: Locale; slug: string };
}) {
  const event = await getEvent(slug);
  if (!event) return {};
  const title = localized(event as unknown as Record<string, unknown>, 'title', locale);
  const desc = localized(event as unknown as Record<string, unknown>, 'description', locale);
  return pageMetadata({ locale, path: `/events/${slug}`, title, description: desc });
}

export default async function EventDetailPage({
  params: { locale, slug },
}: {
  params: { locale: Locale; slug: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations('events');
  const event = await getEvent(slug);
  if (!event) notFound();

  const rec = event as unknown as Record<string, unknown>;
  const title = localized(rec, 'title', locale);
  const description = localized(rec, 'description', locale);
  const img = resolveImage(event.image, event.imageUrl, 1200);

  const meta = [
    { icon: CalendarDays, label: t('detail.when'), value: formatDate(event.date, locale) },
    { icon: Clock, label: '', value: formatTime(event.date, locale) },
    { icon: MapPin, label: t('detail.where'), value: SITE.address[locale] },
    {
      icon: Banknote,
      label: t('detail.price'),
      value: event.price ? `₪${event.price}` : t('free'),
    },
    ...(event.maxCapacity
      ? [{ icon: Users, label: t('detail.capacity'), value: String(event.maxCapacity) }]
      : []),
  ];

  return (
    <div className="container-farm py-10 sm:py-14">
      <Link href="/events" className="inline-flex items-center gap-1 text-sm font-bold text-farm-green hover:underline">
        <ArrowLeft className="h-4 w-4" />
        {t('detail.back')}
      </Link>

      <Reveal>
        <div className="mt-6 overflow-hidden rounded-card shadow-soft">
          <div className="relative aspect-[16/9] bg-farm-green-light/20">
            {img && <Image src={img} alt={title} fill priority sizes="100vw" className="object-cover" />}
          </div>
        </div>
      </Reveal>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px]">
        {/* Main */}
        <div>
          <h1 className="text-4xl font-extrabold text-farm-text">{title}</h1>
          <div className="mt-5 flex flex-wrap gap-3">
            {meta.map((m, i) => (
              <span key={i} className="inline-flex items-center gap-2 rounded-pill bg-farm-green/10 px-4 py-2 text-sm font-bold text-farm-green">
                <m.icon className="h-4 w-4" />
                {m.label && `${m.label}: `}
                <span dir="auto">{m.value}</span>
              </span>
            ))}
          </div>
          <p className="mt-6 text-lg leading-relaxed text-farm-text/70">{description}</p>
        </div>

        {/* Registration */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-card bg-white p-6 shadow-soft">
            <h2 className="text-xl font-extrabold text-farm-text">{t('detail.formTitle')}</h2>
            <p className="mt-1 text-sm text-farm-text/60">{title}</p>
            <div className="mt-4">
              <ContactForm
                fields={['name', 'phone', 'children', 'adults']}
                optional={['adults']}
              />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
