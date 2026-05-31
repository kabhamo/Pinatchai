import { defineField, defineType } from 'sanity';

export const animal = defineType({
  name: 'animal',
  title: 'בעל חיים / حيوان',
  type: 'document',
  fields: [
    defineField({
      name: 'name_he',
      title: 'שם (עברית)',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'name_ar',
      title: 'الاسم (عربي)',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name_he', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'category',
      title: 'קטגוריה',
      type: 'string',
      options: {
        list: [
          { title: 'זוחלים / زواحف', value: 'reptile' },
          { title: 'ציפורים / طيور', value: 'bird' },
          { title: 'בעלי חיים / ماشية', value: 'livestock' },
        ],
        layout: 'radio',
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'description_he', title: 'תיאור (עברית)', type: 'text', rows: 4 }),
    defineField({ name: 'description_ar', title: 'الوصف (عربي)', type: 'text', rows: 4 }),
    defineField({ name: 'careInfo_he', title: 'מידע טיפול (עברית)', type: 'text', rows: 3 }),
    defineField({ name: 'careInfo_ar', title: 'معلومات العناية (عربي)', type: 'text', rows: 3 }),
    defineField({
      name: 'funFacts',
      title: 'עובדות מעניינות',
      type: 'array',
      of: [
        defineField({
          name: 'fact',
          type: 'object',
          fields: [
            { name: 'he', title: 'עברית', type: 'string' },
            { name: 'ar', title: 'عربي', type: 'string' },
          ],
        }),
      ],
    }),
    defineField({
      name: 'image',
      title: 'תמונה',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'טקסט חלופי (עברית)', type: 'string' }],
    }),
  ],
  preview: {
    select: { title: 'name_he', subtitle: 'category', media: 'image' },
  },
});
