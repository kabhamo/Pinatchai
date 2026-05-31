import { ImageResponse } from 'next/og';
import { routing } from '@/i18n/routing';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'פינת חי - בורגתה';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const CONTENT = {
  he: { name: 'פינת חי - בורגתה', tagline: 'חוויה בלתי נשכחת לכל המשפחה' },
  ar: { name: 'ركن الحيوانات - بورغاتا', tagline: 'تجربة لا تُنسى لكل العائلة' },
} as const;

/**
 * Load just the glyphs we need of Noto Sans Hebrew from Google Fonts so
 * Hebrew + Arabic render in the generated image.
 */
async function loadFont(text: string): Promise<ArrayBuffer | null> {
  const url = `https://fonts.googleapis.com/css2?family=Noto+Sans+Hebrew:wght@800&text=${encodeURIComponent(
    text
  )}`;
  const css = await (await fetch(url)).text();
  const src = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/);
  if (!src) return null;
  const res = await fetch(src[1]);
  if (!res.ok) return null;
  return res.arrayBuffer();
}

export default async function OgImage({
  params: { locale },
}: {
  params: { locale: 'he' | 'ar' };
}) {
  const { name, tagline } = CONTENT[locale] ?? CONTENT.he;
  const font = await loadFont(`${name} ${tagline}🐾`);

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#2E7D32',
          backgroundImage:
            'linear-gradient(135deg, #2E7D32 0%, #43A047 55%, #81C784 100%)',
          color: 'white',
          direction: 'rtl',
          padding: 80,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 140,
            height: 140,
            borderRadius: 40,
            backgroundColor: 'rgba(255,255,255,0.18)',
            fontSize: 80,
          }}
        >
          🐾
        </div>
        <div style={{ marginTop: 40, fontSize: 76, fontWeight: 800, textAlign: 'center' }}>
          {name}
        </div>
        <div style={{ marginTop: 20, fontSize: 38, opacity: 0.92, textAlign: 'center' }}>
          {tagline}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: font
        ? [{ name: 'Noto Sans Hebrew', data: font, weight: 800, style: 'normal' }]
        : [],
    }
  );
}
