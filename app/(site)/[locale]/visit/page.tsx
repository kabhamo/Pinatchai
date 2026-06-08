import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Clock, Ticket, Car, MapPin } from 'lucide-react';
import type { Locale } from '@/lib/types';
import HeroSection from '@/components/HeroSection';
import SectionHeading from '@/components/SectionHeading';
import MapEmbed from '@/components/MapEmbed';
import FaqAccordion from '@/components/FaqAccordion';
import { pageMetadata } from '@/lib/metadata';
import { SITE } from '@/lib/config';

const HERO =
  '/images/image_1.jpeg';

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }) {
  return pageMetadata({ locale, path: '/visit', namespace: 'visit' });
}

export default async function VisitPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  setRequestLocale(locale);
  const t = await getTranslations('visit');

  const hours = [{ day: t('days.allWeek'), time: t('hours.allWeek') }];

  const pricing = [
    { label: t('pricing.adult'), price: t('pricing.adultPrice') },
    { label: t('pricing.child'), price: t('pricing.childPrice') },
    { label: t('pricing.infant'), price: t('pricing.infantPrice'), free: true },
    { label: t('pricing.group'), price: t('pricing.groupPrice') },
  ];

  const faq = t.raw('faq') as { q: string; a: string }[];

  return (
    <>
      <HeroSection title={t('title')} subtitle={t('subtitle')} imageUrl={HERO} imageAlt={t('title')} emoji="🎟️" />

      <section className="section">
        <div className="container-farm grid gap-8 lg:grid-cols-2">
          {/* Hours */}
          <div className="rounded-card bg-white p-7 shadow-soft">
            <h2 className="flex items-center gap-2 text-2xl font-extrabold text-farm-text">
              <Clock className="h-6 w-6 text-farm-green" />
              {t('hoursTitle')}
            </h2>
            <table className="mt-5 w-full">
              <tbody>
                {hours.map((row) => (
                  <tr key={row.day} className="border-b border-black/5 last:border-0">
                    <td className="py-3 font-bold text-farm-text">{row.day}</td>
                    <td className="py-3 text-end text-farm-text/70" dir="ltr">
                      {row.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pricing */}
          <div className="rounded-card bg-white p-7 shadow-soft">
            <h2 className="flex items-center gap-2 text-2xl font-extrabold text-farm-text">
              <Ticket className="h-6 w-6 text-farm-green" />
              {t('pricingTitle')}
            </h2>
            <table className="mt-5 w-full">
              <tbody>
                {pricing.map((row) => (
                  <tr key={row.label} className="border-b border-black/5 last:border-0">
                    <td className="py-3 font-bold text-farm-text">{row.label}</td>
                    <td className={`py-3 text-end font-extrabold ${row.free ? 'text-farm-green' : 'text-farm-text'}`}>
                      {row.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Getting there */}
      <section className="section bg-farm-green-light/10">
        <div className="container-farm">
          <SectionHeading title={t('gettingThereTitle')} emoji="🚗" />
          <div className="grid gap-8 lg:grid-cols-2">
            <MapEmbed title={t('gettingThereTitle')} />
            <div className="flex flex-col justify-center gap-4">
              <p className="flex items-start gap-3 text-lg text-farm-text/80">
                <MapPin className="mt-1 h-6 w-6 shrink-0 text-farm-green" />
                {SITE.address[locale]}
              </p>
              <p className="flex items-start gap-3 text-lg text-farm-text/80">
                <Car className="mt-1 h-6 w-6 shrink-0 text-farm-green" />
                {t('parking')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container-farm">
          <SectionHeading title={t('faqTitle')} emoji="❓" />
          <FaqAccordion items={faq} />
        </div>
      </section>
    </>
  );
}
