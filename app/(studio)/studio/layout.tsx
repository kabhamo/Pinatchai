import type { ReactNode } from 'react';
import '../../globals.css';

export const metadata = {
  title: 'פינת חי בורגתה — ניהול תוכן',
  robots: { index: false, follow: false },
};

// Separate root layout for the Sanity Studio (non-localized).
export default function StudioRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
