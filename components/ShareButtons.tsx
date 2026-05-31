'use client';

import { useTranslations } from 'next-intl';
import { Facebook, Link2, Share2, Check } from 'lucide-react';
import { useState } from 'react';

export default function ShareButtons({ title }: { title: string }) {
  const t = useTranslations('blog');
  const [copied, setCopied] = useState(false);

  const url = typeof window !== 'undefined' ? window.location.href : '';

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* noop */
    }
  }

  async function nativeShare() {
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        /* user cancelled */
      }
    } else {
      copy();
    }
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-bold text-farm-text/60">{t('share')}:</span>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook"
        className="grid h-10 w-10 place-items-center rounded-full bg-farm-green/10 text-farm-green transition hover:bg-farm-green hover:text-white"
      >
        <Facebook className="h-5 w-5" />
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label="copy link"
        className="grid h-10 w-10 place-items-center rounded-full bg-farm-green/10 text-farm-green transition hover:bg-farm-green hover:text-white"
      >
        {copied ? <Check className="h-5 w-5" /> : <Link2 className="h-5 w-5" />}
      </button>
      <button
        type="button"
        onClick={nativeShare}
        aria-label="share"
        className="grid h-10 w-10 place-items-center rounded-full bg-farm-green/10 text-farm-green transition hover:bg-farm-green hover:text-white"
      >
        <Share2 className="h-5 w-5" />
      </button>
    </div>
  );
}
