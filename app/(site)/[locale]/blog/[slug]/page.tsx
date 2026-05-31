import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { PortableText, type PortableTextBlock } from '@portabletext/react';
import { ArrowLeft } from 'lucide-react';
import { Link } from '@/i18n/routing';
import type { Locale } from '@/lib/types';
import { getBlogPost, getBlogPosts } from '@/lib/data';
import { resolveImage, localized, formatDate } from '@/lib/utils';
import { pageMetadata } from '@/lib/metadata';
import BlogCard from '@/components/BlogCard';
import ShareButtons from '@/components/ShareButtons';
import Reveal from '@/components/Reveal';

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params: { locale, slug },
}: {
  params: { locale: Locale; slug: string };
}) {
  const post = await getBlogPost(slug);
  if (!post) return {};
  const title = localized(post as unknown as Record<string, unknown>, 'title', locale);
  const excerpt = localized(post as unknown as Record<string, unknown>, 'excerpt', locale);
  return pageMetadata({ locale, path: `/blog/${slug}`, title, description: excerpt });
}

export default async function BlogPostPage({
  params: { locale, slug },
}: {
  params: { locale: Locale; slug: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations('blog');
  const [post, allPosts] = await Promise.all([getBlogPost(slug), getBlogPosts()]);
  if (!post) notFound();

  const rec = post as unknown as Record<string, unknown>;
  const title = localized(rec, 'title', locale);
  const excerpt = localized(rec, 'excerpt', locale);
  const img = resolveImage(post.mainImage, post.imageUrl, 1200);
  const body = (locale === 'ar' ? post.body_ar : post.body_he) as PortableTextBlock[] | undefined;

  const related = allPosts
    .filter((p) => p.slug !== slug)
    .sort((a) => (a.category === post.category ? -1 : 1))
    .slice(0, 3);

  return (
    <article className="container-farm py-10 sm:py-14">
      <Link href="/blog" className="inline-flex items-center gap-1 text-sm font-bold text-farm-green hover:underline">
        <ArrowLeft className="h-4 w-4" />
        {t('back')}
      </Link>

      <div className="mx-auto mt-6 max-w-3xl">
        <span className="rounded-pill bg-farm-green px-3 py-1 text-xs font-bold text-white">
          {t(`categories.${post.category}`)}
        </span>
        <h1 className="mt-4 text-4xl font-extrabold leading-tight text-farm-text">{title}</h1>
        <p className="mt-2 text-sm text-farm-text/50">
          {t('publishedOn')} {formatDate(post.publishedAt, locale)}
        </p>

        <Reveal>
          <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-card bg-farm-green-light/20 shadow-soft">
            {img && <Image src={img} alt={title} fill priority sizes="(max-width:768px) 100vw, 768px" className="object-cover" />}
          </div>
        </Reveal>

        {/* Body */}
        <div className="prose-farm mt-8 space-y-4 text-lg leading-relaxed text-farm-text/80">
          {body && body.length > 0 ? (
            <PortableText value={body} />
          ) : (
            <>
              <p className="text-xl font-medium text-farm-text">{excerpt}</p>
              <p>
                {locale === 'ar'
                  ? 'في مزرعتنا نؤمن أن اللقاء القريب مع الحيوانات يفتح قلوب الأطفال للطبيعة. في كل زيارة نكتشف معاً تفاصيل صغيرة تترك أثراً كبيراً.'
                  : 'בחווה שלנו אנחנו מאמינים שמפגש קרוב עם בעלי החיים פותח את ליבם של הילדים אל הטבע. בכל ביקור אנחנו מגלים יחד פרטים קטנים שמשאירים חותם גדול.'}
              </p>
              <p>
                {locale === 'ar'
                  ? 'ندعوكم لزيارتنا وتجربة ذلك بأنفسكم — يسعدنا استقبالكم أنتم وعائلتكم.'
                  : 'אנחנו מזמינים אתכם לבקר ולחוות זאת בעצמכם — נשמח לארח אתכם ואת המשפחה.'}
              </p>
            </>
          )}
        </div>

        <div className="mt-8 border-t border-black/10 pt-6">
          <ShareButtons title={title} />
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="mx-auto mt-14 max-w-5xl">
          <h2 className="mb-6 text-2xl font-extrabold text-farm-text">{t('relatedTitle')}</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {related.map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
