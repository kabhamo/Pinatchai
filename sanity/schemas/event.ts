import { defineField, defineType } from 'sanity';

export const event = defineType({
  name: 'event',
  title: 'אירוע / فعالية',
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
    defineField({ name: 'date', title: 'תאריך ושעה', type: 'datetime', validation: (r) => r.required() }),
    defineField({ name: 'endDate', title: 'תאריך סיום', type: 'datetime' }),
    defineField({ name: 'price', title: 'מחיר (₪)', type: 'number' }),
    defineField({ name: 'maxCapacity', title: 'תפוסה מרבית', type: 'number' }),
    defineField({
      name: 'category',
      title: 'קטגוריה',
      type: 'string',
      options: {
        list: [
          { title: 'חגיגות / احتفالات', value: 'celebration' },
          { title: 'ימי הולדת / أعياد ميلاد', value: 'birthday' },
          { title: 'סיורים / جولات', value: 'tour' },
          { title: 'סדנאות / ورشات', value: 'workshop' },
        ],
      },
    }),
    defineField({ name: 'description_he', title: 'תיאור (עברית)', type: 'text', rows: 5 }),
    defineField({ name: 'description_ar', title: 'الوصف (عربي)', type: 'text', rows: 5 }),
    defineField({
      name: 'image',
      title: 'תמונה',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'טקסט חלופי (עברית)', type: 'string' }],
    }),
  ],
  preview: { select: { title: 'title_he', subtitle: 'date', media: 'image' } },
});
