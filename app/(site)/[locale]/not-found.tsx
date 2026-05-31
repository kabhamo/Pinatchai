import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function NotFound() {
  const t = useTranslations('notFound');
  return (
    <div className="container-farm flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <div className="text-7xl">🐾</div>
      <h1 className="mt-4 text-3xl font-extrabold text-farm-green sm:text-4xl">{t('title')}</h1>
      <p className="mt-2 text-lg text-farm-text/60">{t('text')}</p>
      <Link href="/" className="btn-primary mt-8">
        {t('cta')}
      </Link>
    </div>
  );
}
