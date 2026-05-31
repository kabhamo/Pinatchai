'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import type { BlogPost, BlogCategory } from '@/lib/types';
import BlogCard from './BlogCard';

const FILTERS: (BlogCategory | 'all')[] = ['all', 'tips', 'news', 'animals', 'activities'];

export default function BlogList({ posts }: { posts: BlogPost[] }) {
  const t = useTranslations('blog');
  const [filter, setFilter] = useState<BlogCategory | 'all'>('all');

  const visible = posts.filter((p) => filter === 'all' || p.category === filter);

  return (
    <>
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={cn(
              'min-h-[44px] rounded-pill px-5 text-sm font-bold transition',
              filter === f
                ? 'bg-farm-green text-white shadow-soft'
                : 'bg-white text-farm-text/70 ring-1 ring-black/5 hover:bg-farm-green/5'
            )}
          >
            {t(`categories.${f}`)}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </>
  );
}
