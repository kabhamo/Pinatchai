import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PawPrint, Sparkles, CalendarDays, Users, Quote, ArrowLeft } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { getAnimals, getUpcomingEvents, getBlogPosts } from '@/lib/data';
import type { Locale } from '@/lib/types';
import HeroSection from '@/components/HeroSection';
import AnimalCard from '@/components/AnimalCard';
import EventCard from '@/components/EventCard';
import BlogCard from '@/components/BlogCard';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';
import { LocalBusinessJsonLd } from '@/components/JsonLd';

const HERO_IMG =
  'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1920&q=70';

export default async function HomePage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  setRequestLocale(locale);
  const t = await getTranslations('home');
  const [animals, events, posts] = await Promise.all([
    getAnimals(),
    getUpcomingEvents(3),
    getBlogPosts(),
  ]);

  const highlights = [
    { icon: PawPrint, key: 'animals', href: '/animals' },
    { icon: Sparkles, key: 'activities', href: '/activities' },
    { icon: CalendarDays, key: 'events', href: '/events' },
    { icon: Users, key: 'groups', href: '/group-visits' },
  ] as const;

  const activities = [
    { key: 'feeding', emoji: '🥕' },
    { key: 'kids', emoji: '🎨' },
    { key: 'play', emoji: '🛝' },
  ] as const;

  const testimonials = t.raw('testimonials.items') as { name: string; text: string }[];

  return (
    <>
      <LocalBusinessJsonLd locale={locale} />

      {/* Hero */}
      <HeroSection
        size="tall"
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        imageUrl={HERO_IMG}
        imageAlt={locale === 'ar' ? 'منظر المزرعة' : 'נוף החווה'}
        actions={[
          { label: t('hero.cta'), href: '/visit', variant: 'primary' },
          { label: t('hero.ctaSecondary'), href: '/animals', variant: 'secondary' },
        ]}
      />

      {/* Highlights strip */}
      <section className="section">
        <div className="container-farm">
          <SectionHeading title={t('highlights.title')} emoji="🌿" />
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {highlights.map(({ icon: Icon, key, href }, i) => (
              <Reveal key={key} delay={i * 0.08}>
                <Link
                  href={href}
                  className="group flex h-full flex-col items-center gap-3 rounded-card bg-white p-6 text-center shadow-soft transition hover:-translate-y-1 hover:shadow-soft-lg"
                >
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-farm-green/10 text-farm-green transition group-hover:bg-farm-green group-hover:text-white">
                    <Icon className="h-8 w-8" />
                  </span>
                  <h3 className="text-lg font-extrabold text-farm-text">
                    {t(`highlights.${key}.title`)}
                  </h3>
                  <p className="text-sm text-farm-text/60">{t(`highlights.${key}.text`)}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured animals */}
      <section className="section bg-farm-green-light/10">
        <div className="container-farm">
          <SectionHeading
            title={t('featuredAnimals.title')}
            subtitle={t('featuredAnimals.subtitle')}
            emoji="🐾"
          />
          <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-4 no-scrollbar sm:mx-0 sm:grid sm:grid-cols-3 sm:px-0 lg:grid-cols-6">
            {animals.slice(0, 6).map((animal) => (
              <AnimalCard key={animal.slug} animal={animal} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/animals" className="btn-secondary">
              {t('featuredAnimals.cta')}
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Activities preview */}
      <section className="section">
        <div className="container-farm">
          <SectionHeading title={t('activitiesPreview.title')} emoji="🎈" />
          <div className="grid gap-6 sm:grid-cols-3">
            {activities.map(({ key, emoji }, i) => (
              <Reveal key={key} delay={i * 0.1}>
                <div className="flex h-full flex-col items-center gap-3 rounded-card bg-white p-8 text-center shadow-soft">
                  <span className="text-5xl">{emoji}</span>
                  <h3 className="text-xl font-extrabold text-farm-text">
                    {t(`activitiesPreview.${key}.title`)}
                  </h3>
                  <p className="text-sm text-farm-text/60">
                    {t(`activitiesPreview.${key}.text`)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/activities" className="btn-secondary">
              {t('activitiesPreview.cta')}
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming events */}
      <section className="section bg-farm-green-light/10">
        <div className="container-farm">
          <SectionHeading
            title={t('events.title')}
            subtitle={t('events.subtitle')}
            emoji="🎉"
          />
          {events.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-3">
              {events.map((event) => (
                <EventCard key={event.slug} event={event} />
              ))}
            </div>
          ) : (
            <p className="text-center text-farm-text/60">{t('events.empty')}</p>
          )}
          <div className="mt-8 text-center">
            <Link href="/events" className="btn-secondary">
              {t('events.cta')}
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section">
        <div className="container-farm">
          <SectionHeading title={t('testimonials.title')} emoji="💚" />
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((item, i) => (
              <Reveal key={item.name} delay={i * 0.1}>
                <figure className="flex h-full flex-col rounded-card bg-white p-7 shadow-soft">
                  <Quote className="h-8 w-8 text-farm-yellow" />
                  <blockquote className="mt-3 flex-1 text-farm-text/80">{item.text}</blockquote>
                  <figcaption className="mt-4 font-extrabold text-farm-green">
                    {item.name}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Latest news / blog */}
      {posts.length > 0 && (
        <section className="section bg-farm-green-light/10">
          <div className="container-farm">
            <SectionHeading title={t('news.title')} subtitle={t('news.subtitle')} emoji="📰" />
            <div className="grid gap-6 md:grid-cols-3">
              {posts.slice(0, 3).map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link href="/blog" className="btn-secondary">
                {t('news.cta')}
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA banner */}
      <section className="section">
        <div className="container-farm">
          <div className="overflow-hidden rounded-card bg-farm-green px-8 py-14 text-center text-white shadow-soft-lg sm:px-16">
            <h2 className="text-3xl font-extrabold sm:text-4xl">{t('ctaBanner.title')}</h2>
            <p className="mx-auto mt-3 max-w-2xl text-lg text-white/85">{t('ctaBanner.text')}</p>
            <Link
              href="/group-visits"
              className="mt-8 inline-flex min-h-[48px] items-center gap-2 rounded-pill bg-farm-yellow px-8 text-lg font-extrabold text-farm-text shadow-soft transition hover:brightness-105"
            >
              {t('ctaBanner.cta')}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
