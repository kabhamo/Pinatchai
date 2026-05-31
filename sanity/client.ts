import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import type { Image } from 'sanity';
import { apiVersion, dataset, projectId, hasSanity } from './env';

export const client = hasSanity
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    })
  : null;

const builder = hasSanity ? imageUrlBuilder({ projectId, dataset }) : null;

export function urlForImage(source: Image) {
  if (!builder) return undefined;
  return builder.image(source);
}

/**
 * Fetch helper that safely returns a fallback when Sanity is not configured
 * or the query fails — keeps pages rendering with seed data.
 */
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  fallback: T
): Promise<T> {
  if (!client) return fallback;
  try {
    const data = await client.fetch<T>(query, params, {
      next: { revalidate: 60 },
    });
    if (data == null || (Array.isArray(data) && data.length === 0)) {
      return fallback;
    }
    return data;
  } catch {
    return fallback;
  }
}
