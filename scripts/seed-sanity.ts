/**
 * Seed a Sanity dataset with the project's sample content.
 *
 * Usage:
 *   1. Create a project at https://www.sanity.io/manage and a write token.
 *   2. Put these in .env.local:
 *        NEXT_PUBLIC_SANITY_PROJECT_ID=...
 *        NEXT_PUBLIC_SANITY_DATASET=production
 *        SANITY_API_TOKEN=...            (Editor/write token)
 *   3. Run:  npm run seed
 *
 * Idempotent — uses createOrReplace with deterministic IDs, so re-running
 * updates the same documents instead of creating duplicates.
 */
import { createClient } from '@sanity/client';
import { existsSync, readFileSync } from 'node:fs';
import {
  seedAnimals,
  seedEvents,
  seedBlogPosts,
  seedGallery,
} from '../lib/seed';

// --- Minimal .env.local loader (avoids a dotenv dependency) ---------------
if (existsSync('.env.local')) {
  for (const line of readFileSync('.env.local', 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error(
    '\n✗ Missing config. Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_TOKEN in .env.local\n'
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-09-01',
  token,
  useCdn: false,
});

const key = () => Math.random().toString(36).slice(2, 12);

/** Upload a remote image URL as a Sanity asset and return an image field. */
async function uploadImage(url: string, alt: string, filename: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  const asset = await client.assets.upload('image', buffer, { filename });
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id }, alt };
}

/** Build a Portable Text body from plain paragraphs. */
function portableText(paragraphs: string[]) {
  return paragraphs.map((text) => ({
    _type: 'block',
    _key: key(),
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: key(), text, marks: [] }],
  }));
}

async function run() {
  console.log(`\n🌱 Seeding "${dataset}" (project ${projectId})\n`);

  // Animals
  for (const a of seedAnimals) {
    process.stdout.write(`  animal: ${a.name_he} … `);
    const image = a.imageUrl ? await uploadImage(a.imageUrl, a.name_he, `${a.slug}.jpg`) : undefined;
    await client.createOrReplace({
      _id: `animal.${a.slug}`,
      _type: 'animal',
      name_he: a.name_he,
      name_ar: a.name_ar,
      slug: { _type: 'slug', current: a.slug },
      category: a.category,
      description_he: a.description_he,
      description_ar: a.description_ar,
      careInfo_he: a.careInfo_he,
      careInfo_ar: a.careInfo_ar,
      funFacts: (a.funFacts ?? []).map((f) => ({ _type: 'fact', _key: key(), he: f.he, ar: f.ar })),
      ...(image ? { image } : {}),
    });
    console.log('✓');
  }

  // Events
  for (const e of seedEvents) {
    process.stdout.write(`  event: ${e.title_he} … `);
    const image = e.imageUrl ? await uploadImage(e.imageUrl, e.title_he, `${e.slug}.jpg`) : undefined;
    await client.createOrReplace({
      _id: `event.${e.slug}`,
      _type: 'event',
      title_he: e.title_he,
      title_ar: e.title_ar,
      slug: { _type: 'slug', current: e.slug },
      date: e.date,
      endDate: e.endDate,
      price: e.price,
      maxCapacity: e.maxCapacity,
      category: e.category,
      description_he: e.description_he,
      description_ar: e.description_ar,
      ...(image ? { image } : {}),
    });
    console.log('✓');
  }

  // Blog posts
  for (const p of seedBlogPosts) {
    process.stdout.write(`  post: ${p.title_he} … `);
    const mainImage = p.imageUrl ? await uploadImage(p.imageUrl, p.title_he, `${p.slug}.jpg`) : undefined;
    await client.createOrReplace({
      _id: `post.${p.slug}`,
      _type: 'blogPost',
      title_he: p.title_he,
      title_ar: p.title_ar,
      slug: { _type: 'slug', current: p.slug },
      excerpt_he: p.excerpt_he,
      excerpt_ar: p.excerpt_ar,
      publishedAt: p.publishedAt,
      category: p.category,
      body_he: portableText([
        p.excerpt_he,
        'בחווה שלנו אנחנו מאמינים שמפגש קרוב עם בעלי החיים פותח את ליבם של הילדים אל הטבע.',
        'אנחנו מזמינים אתכם לבקר ולחוות זאת בעצמכם — נשמח לארח אתכם ואת המשפחה.',
      ]),
      body_ar: portableText([
        p.excerpt_ar,
        'في مزرعتنا نؤمن أن اللقاء القريب مع الحيوانات يفتح قلوب الأطفال للطبيعة.',
        'ندعوكم لزيارتنا وتجربة ذلك بأنفسكم — يسعدنا استقبالكم أنتم وعائلتكم.',
      ]),
      ...(mainImage ? { mainImage } : {}),
    });
    console.log('✓');
  }

  // Gallery
  for (const g of seedGallery) {
    process.stdout.write(`  gallery: ${g.title} … `);
    const image = g.imageUrl ? await uploadImage(g.imageUrl, g.title ?? '', `${g._id}.jpg`) : undefined;
    if (!image) {
      console.log('skipped (no image)');
      continue;
    }
    await client.createOrReplace({
      _id: `gallery.${g._id}`,
      _type: 'galleryImage',
      title: g.title,
      category: g.category,
      date: g.date,
      image,
    });
    console.log('✓');
  }

  console.log('\n✅ Done. Open /studio to see your content.\n');
}

run().catch((err) => {
  console.error('\n✗ Seed failed:', err.message);
  process.exit(1);
});
