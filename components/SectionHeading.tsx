import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export default function SectionHeading({
  title,
  subtitle,
  center = true,
  emoji,
  children,
}: {
  title: string;
  subtitle?: string;
  center?: boolean;
  emoji?: string;
  children?: ReactNode;
}) {
  return (
    <div className={cn('mb-10', center && 'text-center')}>
      {emoji && <div className="mb-2 text-4xl">{emoji}</div>}
      <h2 className="section-title">{title}</h2>
      {subtitle && (
        <p className={cn('section-subtitle', center && 'mx-auto max-w-2xl')}>{subtitle}</p>
      )}
      {children}
    </div>
  );
}
