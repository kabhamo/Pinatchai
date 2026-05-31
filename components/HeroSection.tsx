import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';

interface HeroAction {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary';
}

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  imageUrl: string;
  imageAlt: string;
  actions?: HeroAction[];
  /** tall = homepage full hero, compact = inner page header */
  size?: 'tall' | 'compact';
  emoji?: string;
}

export default function HeroSection({
  title,
  subtitle,
  imageUrl,
  imageAlt,
  actions = [],
  size = 'compact',
  emoji,
}: HeroSectionProps) {
  const tall = size === 'tall';
  return (
    <section
      className={cn(
        'relative -mt-16 flex items-center justify-center overflow-hidden sm:-mt-20',
        tall ? 'min-h-[88vh]' : 'min-h-[52vh]'
      )}
    >
      <Image
        src={imageUrl}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-farm-green/70" />

      <div className="container-farm relative z-10 pt-16 text-center text-white sm:pt-20">
        {emoji && <div className="mb-3 text-5xl">{emoji}</div>}
        <h1
          className={cn(
            'font-extrabold leading-tight drop-shadow-lg',
            tall ? 'text-4xl sm:text-6xl' : 'text-3xl sm:text-5xl'
          )}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-2xl text-lg font-medium text-white/90 drop-shadow sm:text-2xl">
            {subtitle}
          </p>
        )}
        {actions.length > 0 && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {actions.map((a) => (
              <Link
                key={a.href + a.label}
                href={a.href}
                className={a.variant === 'secondary' ? 'btn-secondary' : 'btn-primary'}
              >
                {a.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
