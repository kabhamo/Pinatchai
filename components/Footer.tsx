import { useTranslations, useLocale } from 'next-intl';
import { MapPin, Phone, Mail, Facebook, Instagram, PawPrint } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { NAV_LINKS, SITE } from '@/lib/config';
import type { Locale } from '@/lib/types';

export default function Footer() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-farm-green text-white">
      <div className="container-farm grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white/15">
              <PawPrint className="h-6 w-6" />
            </span>
            <span className="text-lg font-extrabold">{t('site.name')}</span>
          </div>
          <p className="mt-3 text-sm text-white/80">{t('footer.tagline')}</p>
          <div className="mt-4 flex gap-3">
            <a
              href={SITE.social.facebook}
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-10 w-10 place-items-center rounded-full bg-white/15 transition hover:bg-white/25"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href={SITE.social.instagram}
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-10 w-10 place-items-center rounded-full bg-white/15 transition hover:bg-white/25"
            >
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="text-base font-extrabold">{t('footer.quickLinks')}</h3>
          <ul className="mt-4 grid grid-cols-2 gap-y-2 text-sm text-white/80">
            {NAV_LINKS.map(({ key, href }) => (
              <li key={key}>
                <Link href={href} className="transition hover:text-white">
                  {t(`nav.${key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-base font-extrabold">{t('footer.contact')}</h3>
          <ul className="mt-4 space-y-3 text-sm text-white/80">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0" />
              <span>{t('site.address')}</span>
            </li>
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 h-5 w-5 shrink-0" />
              <span className="flex flex-col gap-1">
                <a href={`tel:${SITE.phone}`} className="transition hover:text-white" dir="ltr">
                  {SITE.phoneDisplay}
                </a>
                <a href={`tel:${SITE.phone2}`} className="transition hover:text-white" dir="ltr">
                  {SITE.phone2Display}
                </a>
              </span>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 transition hover:text-white">
                <Mail className="h-5 w-5 shrink-0" />
                <span dir="ltr">{SITE.email}</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Hours */}
        <div>
          <h3 className="text-base font-extrabold">{t('footer.hours')}</h3>
          <p className="mt-4 text-sm text-white/80">{t('footer.hoursValue')}</p>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="container-farm py-5 text-center text-sm text-white/70">
          © {year} {t('site.name')} — {t('footer.rights')}
        </div>
      </div>
    </footer>
  );
}
