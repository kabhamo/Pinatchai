'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { CheckCircle2, AlertCircle, Send, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export type FieldName =
  | 'name'
  | 'contactName'
  | 'orgName'
  | 'phone'
  | 'email'
  | 'message'
  | 'date'
  | 'groupSize'
  | 'children'
  | 'adults'
  | 'specialRequests';

interface ContactFormProps {
  fields: FieldName[];
  /** fields that are optional (all others are required) */
  optional?: FieldName[];
}

const NUMBER_FIELDS: FieldName[] = ['groupSize', 'children', 'adults'];
const TEXTAREA_FIELDS: FieldName[] = ['message', 'specialRequests'];

export default function ContactForm({ fields, optional = [] }: ContactFormProps) {
  const t = useTranslations('form');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});

  function validate(data: FormData): boolean {
    const next: Partial<Record<FieldName, string>> = {};
    for (const field of fields) {
      const value = String(data.get(field) ?? '').trim();
      if (!optional.includes(field) && !value) {
        next[field] = t('required');
        continue;
      }
      if (field === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        next[field] = t('invalidEmail');
      }
      if (field === 'phone' && value && !/^[0-9+\-\s()]{7,}$/.test(value)) {
        next[field] = t('invalidPhone');
      }
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (!validate(data)) return;

    setStatus('submitting');
    try {
      // No backend yet — simulate a submission. Swap for a real endpoint
      // (e.g. Netlify Forms / API route) before launch.
      await new Promise((r) => setTimeout(r, 900));
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-3 rounded-card bg-farm-green/10 p-8 text-center">
        <CheckCircle2 className="h-12 w-12 text-farm-green" />
        <p className="text-lg font-bold text-farm-green">{t('success')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-4 sm:grid-cols-2">
      {fields.map((field) => {
        const isTextarea = TEXTAREA_FIELDS.includes(field);
        const isNumber = NUMBER_FIELDS.includes(field);
        const type =
          field === 'email'
            ? 'email'
            : field === 'phone'
              ? 'tel'
              : field === 'date'
                ? 'date'
                : isNumber
                  ? 'number'
                  : 'text';
        const error = errors[field];
        const fullWidth = isTextarea || field === 'name' || field === 'orgName';

        return (
          <div key={field} className={cn('flex flex-col gap-1.5', fullWidth && 'sm:col-span-2')}>
            <label htmlFor={field} className="text-sm font-bold text-farm-text/80">
              {t(field)}
              {!optional.includes(field) && <span className="text-farm-orange"> *</span>}
            </label>
            {isTextarea ? (
              <textarea
                id={field}
                name={field}
                rows={4}
                dir="auto"
                className={cn(
                  'min-h-[48px] rounded-2xl border bg-white px-4 py-3 text-base outline-none transition focus:ring-2 focus:ring-farm-green/40',
                  error ? 'border-red-400' : 'border-black/10'
                )}
              />
            ) : (
              <input
                id={field}
                name={field}
                type={type}
                min={isNumber ? 0 : undefined}
                dir="auto"
                className={cn(
                  'min-h-[48px] rounded-2xl border bg-white px-4 py-3 text-base outline-none transition focus:ring-2 focus:ring-farm-green/40',
                  error ? 'border-red-400' : 'border-black/10'
                )}
              />
            )}
            {error && (
              <span className="flex items-center gap-1 text-xs font-medium text-red-500">
                <AlertCircle className="h-3.5 w-3.5" />
                {error}
              </span>
            )}
          </div>
        );
      })}

      <div className="sm:col-span-2">
        {status === 'error' && (
          <p className="mb-3 flex items-center gap-1.5 text-sm font-medium text-red-500">
            <AlertCircle className="h-4 w-4" />
            {t('error')}
          </p>
        )}
        <button type="submit" disabled={status === 'submitting'} className="btn-primary w-full sm:w-auto">
          {status === 'submitting' ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              {t('submitting')}
            </>
          ) : (
            <>
              <Send className="h-5 w-5" />
              {t('submit')}
            </>
          )}
        </button>
      </div>
    </form>
  );
}
