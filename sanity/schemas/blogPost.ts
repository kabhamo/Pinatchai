import { defineField, defineType } from 'sanity';

export const blogPost = defineType({
  name: 'blogPost',
  title: 'פוסט בלוג / مقال',
  type: 'document',
  fields: [
    defineField({ name: 'title_he', title: 'כותרת (עברית)', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'title_ar', title: 'العنوان (عربي)', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title_he', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'excerpt_he', title: 'תקציר (עברית)', type: 'text', rows: 2 }),
    defineField({ name: 'excerpt_ar', title: 'مقتطف (عربي)', type: 'text', rows: 2 }),
    defineField({ name: 'publishedAt', title: 'תאריך פרסום', type: 'datetime', validation: (r) => r.required() }),
    defineField({
      name: 'category',
      title: 'קטגוריה',
      type: 'string',
      options: {
        list: [
          { title: 'טיפים / نصائح', value: 'tips' },
          { title: 'חדשות החווה / أخبار المزرعة', value: 'news' },
          { title: 'בעלי חיים / حيوانات', value: 'animals' },
          { title: 'פעילויות / أنشطة', value: 'activities' },
        ],
      },
    }),
    defineField({ name: 'body_he', title: 'תוכן (עברית)', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'body_ar', title: 'المحتوى (عربي)', type: 'array', of: [{ type: 'block' }] }),
    defineField({
      name: 'mainImage',
      title: 'תמונה ראשית',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'טקסט חלופי (עברית)', type: 'string' }],
    }),
  ],
  preview: { select: { title: 'title_he', subtitle: 'category', media: 'mainImage' } },
});
