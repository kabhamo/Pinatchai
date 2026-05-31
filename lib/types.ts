import type { Image } from 'sanity';

export type Locale = 'he' | 'ar';

export type Bilingual = { he: string; ar: string };

export type AnimalCategory = 'reptile' | 'bird' | 'livestock';
export type EventCategory = 'celebration' | 'birthday' | 'tour' | 'workshop';
export type BlogCategory = 'tips' | 'news' | 'animals' | 'activities';
export type GalleryCategory = 'animals' | 'events' | 'activities' | 'farm';

export interface Animal {
  slug: string;
  name_he: string;
  name_ar: string;
  category: AnimalCategory;
  description_he: string;
  description_ar: string;
  careInfo_he?: string;
  careInfo_ar?: string;
  funFacts?: Bilingual[];
  image?: Image;
  /** Local fallback image when Sanity image is absent */
  imageUrl?: string;
  emoji?: string;
}

export interface FarmEvent {
  slug: string;
  title_he: string;
  title_ar: string;
  date: string;
  endDate?: string;
  price?: number;
  maxCapacity?: number;
  category?: EventCategory;
  description_he: string;
  description_ar: string;
  image?: Image;
  imageUrl?: string;
}

export interface BlogPost {
  slug: string;
  title_he: string;
  title_ar: string;
  excerpt_he: string;
  excerpt_ar: string;
  publishedAt: string;
  category: BlogCategory;
  mainImage?: Image;
  imageUrl?: string;
  body_he?: unknown[];
  body_ar?: unknown[];
}

export interface GalleryItem {
  _id: string;
  title?: string;
  category: GalleryCategory;
  date?: string;
  image?: Image;
  imageUrl?: string;
}
