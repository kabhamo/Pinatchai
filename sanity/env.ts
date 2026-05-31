export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-09-01';

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';

// True when a real Sanity project is configured. When false, pages fall back
// to local seed data so the site renders fully without a CMS connection.
export const hasSanity = Boolean(projectId);
