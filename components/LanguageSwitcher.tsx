'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Globe, ChevronDown } from 'lucide-react';
import { usePathname, useRouter, routing } from '@/i18n/routing';
import { cn } from '@/lib/utils';

export default function LanguageSwitcher({ light = false }: { light?: boolean }) {
  const locale = useLocale();
  const t = useTranslations('language');
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function switchTo(next: string) {
    setOpen(false);
    // usePathname() returns the path without the locale prefix, so a plain
    // string replace keeps the user on the same page in the new locale.
    router.replace(pathname, { locale: next });
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={t('switch')}
        className={cn(
          'flex min-h-[44px] items-center gap-1.5 rounded-pill px-3 py-2 text-sm font-bold transition',
          light
            ? 'text-white hover:bg-white/15'
            : 'text-farm-green hover:bg-farm-green/10'
        )}
      >
        <Globe className="h-5 w-5" />
        <span>{locale === 'he' ? t('he') : t('ar')}</span>
        <ChevronDown className={cn('h-4 w-4 transition', open && 'rotate-180')} />
      </button>

      {open && (
        <div className="absolute end-0 mt-2 w-32 overflow-hidden rounded-2xl bg-white py-1 shadow-soft-lg ring-1 ring-black/5">
          {routing.locales.map((loc) => (
            <button
              key={loc}
              type="button"
              onClick={() => switchTo(loc)}
              className={cn(
                'block w-full px-4 py-2.5 text-start text-sm font-bold transition hover:bg-farm-green/10',
                loc === locale ? 'text-farm-green' : 'text-farm-text/70'
              )}
            >
              {loc === 'he' ? t('he') : t('ar')}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
