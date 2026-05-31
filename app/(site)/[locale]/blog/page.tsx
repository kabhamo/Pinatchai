import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/lib/types';
import { getBlogPosts } from '@/lib/data';
import HeroSection from '@/components/HeroSection';
import BlogList from '@/components/BlogList';
import { pageMetadata } from '@/lib/metadata';

const HERO =
  'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1600&q=70';

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }) {
  return pageMetadata({ locale, path: '/blog', namespace: 'blog' });
}

export default async function BlogPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  setRequestLocale(locale);
  const t = await getTranslations('blog');
  const posts = await getBlogPosts();

  return (
    <>
      <HeroSection title={t('title')} subtitle={t('subtitle')} imageUrl={HERO} imageAlt={t('title')} emoji="📝" />
      <section className="section">
        <div className="container-farm">
          <BlogList posts={posts} />
        </div>
      </section>
    </>
  );
}
