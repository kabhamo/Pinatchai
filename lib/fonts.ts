import { Noto_Sans_Hebrew } from 'next/font/google';

// Single family used for both Hebrew and Arabic UI; Arabic glyphs fall back
// to the system Arabic font stack defined in globals.css.
export const notoHebrew = Noto_Sans_Hebrew({
  subsets: ['hebrew', 'latin'],
  weight: ['400', '500', '700', '800'],
  display: 'swap',
  variable: '--font-noto-hebrew',
});
