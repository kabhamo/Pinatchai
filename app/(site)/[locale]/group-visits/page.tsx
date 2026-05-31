import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Check, Users, Sparkles } from 'lucide-react';
import type { Locale } from '@/lib/types';
import HeroSection from '@/components/HeroSection';
import SectionHeading from '@/components/SectionHeading';
import ContactForm from '@/components/ContactForm';
import Reveal from '@/components/Reveal';
import { pageMetadata } from '@/lib/metadata';

const HERO =
  'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1600&q=70';

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }) {
  return pageMetadata({ locale, path: '/group-visits', namespace: 'groupVisits' });
}

export default async function GroupVisitsPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  setRequestLocale(locale);
  const t = await getTranslations('groupVisits');

  const benefits = t.raw('benefits') as string[];
  const included = t.raw('included') as string[];

  return (
    <>
      <HeroSection title={t('title')} subtitle={t('subtitle')} imageUrl={HERO} imageAlt={t('title')} emoji="🏫" />

      <section className="section">
        <div className="container-farm grid gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-card bg-white p-7 shadow-soft">
              <h2 className="flex items-center gap-2 text-2xl font-extrabold text-farm-text">
                <Sparkles className="h-6 w-6 text-farm-orange" />
                {t('benefitsTitle')}
              </h2>
              <ul className="mt-5 space-y-3">
                {benefits.map((b) => (
                  <li key={b} className="flex gap-3 text-farm-text/80">
                    <Check className="h-5 w-5 shrink-0 text-farm-green" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-card bg-farm-green/5 p-7 shadow-soft">
              <h2 className="flex items-center gap-2 text-2xl font-extrabold text-farm-text">
                <Users className="h-6 w-6 text-farm-green" />
                {t('includedTitle')}
              </h2>
              <ul className="mt-5 space-y-3">
                {included.map((b) => (
                  <li key={b} className="flex gap-3 text-farm-text/80">
                    <Check className="h-5 w-5 shrink-0 text-farm-green" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Age groups */}
      <section className="section bg-farm-green-light/10 pt-0">
        <div className="container-farm">
          <div className="rounded-card bg-white p-8 text-center shadow-soft">
            <h2 className="text-2xl font-extrabold text-farm-text">{t('ageGroupsTitle')}</h2>
            <p className="mx-auto mt-3 max-w-2xl text-lg text-farm-text/70">{t('ageGroups')}</p>
          </div>
        </div>
      </section>

      {/* Inquiry form */}
      <section className="section">
        <div className="container-farm max-w-3xl">
          <SectionHeading title={t('formTitle')} emoji="✉️" />
          <div className="rounded-card bg-white p-6 shadow-soft sm:p-8">
            <ContactForm
              fields={['orgName', 'contactName', 'phone', 'date', 'groupSize', 'specialRequests']}
              optional={['specialRequests']}
            />
          </div>
        </div>
      </section>
    </>
  );
}
