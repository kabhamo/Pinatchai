import { sanityFetch } from '@/sanity/client';
import {
  animalsQuery,
  animalBySlugQuery,
  eventsQuery,
  upcomingEventsQuery,
  eventBySlugQuery,
  blogPostsQuery,
  blogPostBySlugQuery,
  galleryQuery,
} from '@/sanity/queries';
import {
  seedAnimals,
  seedEvents,
  seedBlogPosts,
  seedGallery,
} from './seed';
import type { Animal, FarmEvent, BlogPost, GalleryItem } from './types';

export async function getAnimals(): Promise<Animal[]> {
  return sanityFetch<Animal[]>(animalsQuery, {}, seedAnimals);
}

export async function getAnimal(slug: string): Promise<Animal | undefined> {
  const fallback = seedAnimals.find((a) => a.slug === slug);
  return sanityFetch<Animal | undefined>(animalBySlugQuery, { slug }, fallback);
}

export async function getEvents(): Promise<FarmEvent[]> {
  return sanityFetch<FarmEvent[]>(eventsQuery, {}, seedEvents);
}

export async function getUpcomingEvents(limit = 3): Promise<FarmEvent[]> {
  return sanityFetch<FarmEvent[]>(
    upcomingEventsQuery,
    { limit },
    seedEvents.slice(0, limit)
  );
}

export async function getEvent(slug: string): Promise<FarmEvent | undefined> {
  const fallback = seedEvents.find((e) => e.slug === slug);
  return sanityFetch<FarmEvent | undefined>(eventBySlugQuery, { slug }, fallback);
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  return sanityFetch<BlogPost[]>(blogPostsQuery, {}, seedBlogPosts);
}

export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  const fallback = seedBlogPosts.find((p) => p.slug === slug);
  return sanityFetch<BlogPost | undefined>(blogPostBySlugQuery, { slug }, fallback);
}

export async function getGallery(): Promise<GalleryItem[]> {
  return sanityFetch<GalleryItem[]>(galleryQuery, {}, seedGallery);
}
