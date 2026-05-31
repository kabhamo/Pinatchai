'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Menu, X, Phone, PawPrint } from 'lucide-react';
import { Link, usePathname } from '@/i18n/routing';
import { NAV_LINKS, SITE } from '@/lib/config';
import { cn } from '@/lib/utils';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Solid bar whenever scrolled, menu is open, or not on the homepage hero.
  const solid = scrolled || menuOpen || pathname !== '/';

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-colors duration-300',
        solid ? 'bg-white/95 shadow-soft backdrop-blur' : 'bg-transparent'
      )}
    >
      <nav className="container-farm flex h-16 items-center justify-between gap-4 sm:h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span
            className={cn(
              'grid h-10 w-10 place-items-center rounded-2xl transition',
              solid ? 'bg-farm-green text-white' : 'bg-white/90 text-farm-green'
            )}
          >
            <PawPrint className="h-6 w-6" />
          </span>
          <span
            className={cn(
              'text-lg font-extrabold leading-tight transition sm:text-xl',
              solid ? 'text-farm-green' : 'text-white drop-shadow'
            )}
          >
            {t('home') === 'בית' ? 'פינת חי בורגתה' : 'ركن الحيوانات بورغاتا'}
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 xl:flex">
          {NAV_LINKS.map(({ key, href }) => {
            const active = pathname === href;
            return (
              <li key={key}>
                <Link
                  href={href}
                  className={cn(
                    'rounded-pill px-3 py-2 text-sm font-bold transition',
                    solid
                      ? active
                        ? 'bg-farm-green/10 text-farm-green'
                        : 'text-farm-text/70 hover:text-farm-green'
                      : 'text-white/90 hover:text-white'
                  )}
                >
                  {t(key)}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          <LanguageSwitcher light={!solid} />
          <Link
            href="/contact"
            className="hidden min-h-[44px] items-center gap-1.5 rounded-pill bg-farm-orange px-4 py-2 text-sm font-bold text-white shadow-soft transition hover:brightness-105 sm:inline-flex"
          >
            <Phone className="h-4 w-4" />
            {t('contactCta')}
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="menu"
            className={cn(
              'grid h-11 w-11 place-items-center rounded-2xl xl:hidden',
              solid ? 'text-farm-green' : 'text-white'
            )}
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-black/5 bg-white xl:hidden">
          <ul className="container-farm flex flex-col py-3">
            {NAV_LINKS.map(({ key, href }) => (
              <li key={key}>
                <Link
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    'block rounded-2xl px-4 py-3 text-base font-bold transition',
                    pathname === href
                      ? 'bg-farm-green/10 text-farm-green'
                      : 'text-farm-text/80 hover:bg-farm-green/5'
                  )}
                >
                  {t(key)}
                </Link>
              </li>
            ))}
            <li className="px-4 pt-2">
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                className="btn-primary w-full"
              >
                <Phone className="h-4 w-4" />
                {t('contactCta')}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
