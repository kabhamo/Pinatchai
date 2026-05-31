import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { resolveImage, localized, formatDate } from '@/lib/utils';
import type { BlogPost, Locale } from '@/lib/types';

export default function BlogCard({ post }: { post: BlogPost }) {
  const locale = useLocale() as Locale;
  const t = useTranslations('blog');
  const title = localized(post as unknown as Record<string, unknown>, 'title', locale);
  const excerpt = localized(post as unknown as Record<string, unknown>, 'excerpt', locale);
  const img = resolveImage(post.mainImage, post.imageUrl, 600);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-card bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-soft-lg"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-farm-green-light/20">
        {img && (
          <Image
            src={img}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 380px"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        )}
        <span className="absolute start-3 top-3 rounded-pill bg-farm-green px-3 py-1 text-xs font-bold text-white">
          {t(`categories.${post.category}`)}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <time className="text-xs font-medium text-farm-text/50">
          {formatDate(post.publishedAt, locale)}
        </time>
        <h3 className="mt-1 text-xl font-extrabold text-farm-text">{title}</h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm text-farm-text/60">{excerpt}</p>
        <span className="mt-3 inline-block text-sm font-bold text-farm-orange">
          {t('readMore')} ←
        </span>
      </div>
    </Link>
  );
}
