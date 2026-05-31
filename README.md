# פינת חי - בורגתה · Pinat Hai Burgata

A bilingual (Hebrew + Arabic, both RTL) website for **פינת חי - בורגתה**, a family
petting farm at דרך הארז 128, בורגתה, Israel. Built for families with young children.

🌐 Hebrew (default) at `/he` · Arabic at `/ar`

---

## Tech stack

| Area | Choice |
|------|--------|
| Framework | [Next.js 14](https://nextjs.org/) (App Router) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| i18n | [next-intl](https://next-intl.dev/) — `he` + `ar`, both RTL |
| CMS | [Sanity](https://www.sanity.io/) (Studio embedded at `/studio`) |
| Animations | [Framer Motion](https://www.framer.com/motion/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Fonts | Noto Sans Hebrew via `next/font` |
| Hosting | [Netlify](https://www.netlify.com/) |

---

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Configure environment (optional — see below)
cp .env.local.example .env.local

# 3. Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — `/` redirects to `/he`.

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Type-check without emitting |

---

## Environment variables

Copy `.env.local.example` to `.env.local`. **All Sanity variables are optional** —
see [CMS & content](#cms--content) below.

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | No | Sanity project ID. Without it, the site uses local seed data. |
| `NEXT_PUBLIC_SANITY_DATASET` | No | Defaults to `production`. |
| `SANITY_API_TOKEN` | No | Only for authenticated writes / draft previews. |
| `NEXT_PUBLIC_SITE_URL` | No | Public URL used for canonical links and metadata. |

---

## CMS & content

Content is managed in **Sanity Studio**, embedded at [`/studio`](http://localhost:3000/studio).
Schemas live in [`sanity/schemas/`](sanity/schemas): `animal`, `event`, `blogPost`,
`galleryImage` — each with bilingual (`_he` / `_ar`) fields.

### Seed-data fallback

The site is designed to render **fully without a CMS connection**. When
`NEXT_PUBLIC_SANITY_PROJECT_ID` is unset (or a query fails), data access falls back
to local seed content in [`lib/seed.ts`](lib/seed.ts) — 6 animals, 3 events, 3 blog
posts and a gallery, all in Hebrew and Arabic. This means the site looks complete
from day one and never breaks if Sanity is unreachable.

To go live with real content:
1. Create a free project at [sanity.io/manage](https://www.sanity.io/manage).
2. Add `NEXT_PUBLIC_SANITY_PROJECT_ID` (and dataset) to `.env.local`.
3. Visit `/studio`, sign in, and add documents.

---

## Project structure

```
app/
  (site)/[locale]/        # Localized site — own <html dir="rtl"> root layout
    layout.tsx            #   Navbar + Footer + intl provider
    page.tsx              #   Landing page
    not-found.tsx
  (studio)/studio/        # Sanity Studio — separate root layout (non-localized)
components/               # Navbar, Footer, HeroSection, cards, ContactForm, …
i18n/                     # next-intl routing + request config
lib/                      # config, data access, seed data, types, utils, fonts
messages/                 # he.json + ar.json translation catalogs
sanity/                   # client, queries, env, schemas
```

> **Route groups:** the localized site and the Studio each have their own root
> layout via `(site)` and `(studio)` groups, so they can render independent
> `<html>` documents. The group names don't appear in URLs.

### Internationalization notes

- Both locales are **RTL** — `dir="rtl"` is set on `<html>` for every page.
- Default locale is `he`; routes are always prefixed (`/he/...`, `/ar/...`).
- Use the `Link` from `@/i18n/routing` with **string hrefs** (e.g. `/animals/${slug}`);
  the locale prefix is added automatically.
- Localized fields follow the `<base>_<locale>` convention; resolve them with
  `localized()` in [`lib/utils.ts`](lib/utils.ts).

---

## Design system

Defined in [`tailwind.config.ts`](tailwind.config.ts):

| Token | Value | Use |
|-------|-------|-----|
| `farm-green` | `#2E7D32` | Primary / nature |
| `farm-green-light` | `#81C784` | Soft backgrounds |
| `farm-yellow` | `#FDD835` | Playful accent |
| `farm-orange` | `#FF8F00` | CTA buttons |
| `farm-bg` | `#FAFFF6` | Page background |
| `farm-text` | `#1A1A1A` | Body text |

Rounded corners (`rounded-card`, `rounded-pill`), soft shadows (`shadow-soft`),
and ≥48px tap targets throughout. Reusable utility classes: `.btn-primary`,
`.btn-secondary`, `.card`, `.container-farm`, `.section` (see
[`app/globals.css`](app/globals.css)).

---

## Deployment (Netlify)

The repo is set up for auto-deploy on push to `main`.

1. In Netlify, **Add new site → Import from GitHub** and pick `kabhamo/Pinatchai`.
2. Build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
   - Enable the **Next.js runtime** plugin (`@netlify/plugin-nextjs`).
3. Add environment variables (Site settings → Environment):
   `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`,
   `SANITY_API_TOKEN`, `NEXT_PUBLIC_SITE_URL`.
4. Deploy. Each push to `main` triggers a new build.

---

## Status

- [x] Project scaffold (Next.js + Tailwind + next-intl + Sanity)
- [x] Shared components & design system
- [x] Landing page
- [x] Content pages (about, animals, activities, events, blog, gallery, visit, group visits, contact)
- [x] SEO (per-page metadata, canonical + hreflang, sitemap.xml, robots.txt, dynamic OG images, LocalBusiness JSON-LD) & Netlify deploy config

---

_© פינת חי - בורגתה. All rights reserved._
