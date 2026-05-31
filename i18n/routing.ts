import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['he', 'ar'],
  defaultLocale: 'he',
  localePrefix: 'always',
});

export type Locale = (typeof routing.locales)[number];

// All supported locales are RTL.
export const rtlLocales: Locale[] = ['he', 'ar'];

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
