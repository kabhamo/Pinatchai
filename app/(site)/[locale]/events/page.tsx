import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/lib/types';
import { getEvents } from '@/lib/data';
import HeroSection from '@/components/HeroSection';
import EventsList from '@/components/EventsList';
import { pageMetadata } from '@/lib/metadata';

const HERO =
  'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1600&q=70';

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }) {
  return pageMetadata({ locale, path: '/events', namespace: 'events' });
}

export default async function EventsPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  setRequestLocale(locale);
  const t = await getTranslations('events');
  const events = await getEvents();

  return (
    <>
      <HeroSection title={t('title')} subtitle={t('subtitle')} imageUrl={HERO} imageAlt={t('title')} emoji="🎉" />
      <section className="section">
        <div className="container-farm">
          <EventsList events={events} />
        </div>
      </section>
    </>
  );
}
