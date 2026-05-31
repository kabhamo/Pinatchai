import { groq } from 'next-sanity';

export const animalsQuery = groq`*[_type == "animal"] | order(name_he asc){
  "slug": slug.current, name_he, name_ar, category,
  description_he, description_ar, careInfo_he, careInfo_ar,
  funFacts, image
}`;

export const animalBySlugQuery = groq`*[_type == "animal" && slug.current == $slug][0]{
  "slug": slug.current, name_he, name_ar, category,
  description_he, description_ar, careInfo_he, careInfo_ar,
  funFacts, image
}`;

export const eventsQuery = groq`*[_type == "event"] | order(date asc){
  "slug": slug.current, title_he, title_ar, date, endDate, price,
  maxCapacity, category, description_he, description_ar, image
}`;

export const upcomingEventsQuery = groq`*[_type == "event" && date >= now()] | order(date asc)[0...$limit]{
  "slug": slug.current, title_he, title_ar, date, price, category,
  description_he, description_ar, image
}`;

export const eventBySlugQuery = groq`*[_type == "event" && slug.current == $slug][0]{
  "slug": slug.current, title_he, title_ar, date, endDate, price,
  maxCapacity, category, description_he, description_ar, image
}`;

export const blogPostsQuery = groq`*[_type == "blogPost"] | order(publishedAt desc){
  "slug": slug.current, title_he, title_ar, excerpt_he, excerpt_ar,
  publishedAt, category, mainImage
}`;

export const blogPostBySlugQuery = groq`*[_type == "blogPost" && slug.current == $slug][0]{
  "slug": slug.current, title_he, title_ar, body_he, body_ar,
  excerpt_he, excerpt_ar, publishedAt, category, mainImage
}`;

export const galleryQuery = groq`*[_type == "galleryImage"] | order(date desc){
  _id, title, category, date, image
}`;
