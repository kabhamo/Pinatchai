import { getTranslations, setRequestLocale } from 'next-intl/server';
import { MapPin, Phone, Mail, Facebook, Instagram } from 'lucide-react';
import type { Locale } from '@/lib/types';
import HeroSection from '@/components/HeroSection';
import ContactForm from '@/components/ContactForm';
import MapEmbed from '@/components/MapEmbed';
import { pageMetadata } from '@/lib/metadata';
import { SITE } from '@/lib/config';

const HERO =
  'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1600&q=70';

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }) {
  return pageMetadata({ locale, path: '/contact', namespace: 'contact' });
}

export default async function ContactPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  setRequestLocale(locale);
  const t = await getTranslations('contact');

  return (
    <>
      <HeroSection title={t('title')} subtitle={t('subtitle')} imageUrl={HERO} imageAlt={t('title')} emoji="📞" />

      <section className="section">
        <div className="container-farm grid gap-10 lg:grid-cols-2">
          {/* Form */}
          <div>
            <h2 className="text-2xl font-extrabold text-farm-text">{t('title')}</h2>
            <div className="mt-5 rounded-card bg-white p-6 shadow-soft sm:p-8">
              <ContactForm fields={['name', 'phone', 'email', 'message']} />
            </div>
          </div>

          {/* Info */}
          <div>
            <h2 className="text-2xl font-extrabold text-farm-text">{t('infoTitle')}</h2>
            <ul className="mt-5 space-y-4">
              <li className="flex items-start gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-farm-green/10 text-farm-green">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-bold text-farm-text/60">{t('addressLabel')}</p>
                  <p className="text-farm-text">{SITE.address[locale]}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-farm-green/10 text-farm-green">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-bold text-farm-text/60">{t('phoneLabel')}</p>
                  <a href={`tel:${SITE.phone}`} className="block text-farm-text hover:text-farm-green" dir="ltr">
                    {SITE.phoneDisplay}
                  </a>
                  <a href={`tel:${SITE.phone2}`} className="block text-farm-text hover:text-farm-green" dir="ltr">
                    {SITE.phone2Display}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-farm-green/10 text-farm-green">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-bold text-farm-text/60">{t('emailLabel')}</p>
                  <a href={`mailto:${SITE.email}`} className="text-farm-text hover:text-farm-green" dir="ltr">
                    {SITE.email}
                  </a>
                </div>
              </li>
            </ul>

            <p className="mt-6 text-sm font-bold text-farm-text/60">{t('followUs')}</p>
            <div className="mt-2 flex gap-3">
              <a href={SITE.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="grid h-11 w-11 place-items-center rounded-full bg-farm-green text-white transition hover:brightness-110">
                <Facebook className="h-5 w-5" />
              </a>
              <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid h-11 w-11 place-items-center rounded-full bg-farm-green text-white transition hover:brightness-110">
                <Instagram className="h-5 w-5" />
              </a>
            </div>

            <div className="mt-8">
              <MapEmbed title={t('mapTitle')} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
