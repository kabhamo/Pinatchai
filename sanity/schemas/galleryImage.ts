import { defineField, defineType } from 'sanity';

export const galleryImage = defineType({
  name: 'galleryImage',
  title: 'תמונת גלריה / صورة معرض',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'כותרת', type: 'string' }),
    defineField({
      name: 'category',
      title: 'קטגוריה',
      type: 'string',
      options: {
        list: [
          { title: 'בעלי חיים / حيوانات', value: 'animals' },
          { title: 'אירועים / فعاليات', value: 'events' },
          { title: 'פעילויות / أنشطة', value: 'activities' },
          { title: 'החווה / المزرعة', value: 'farm' },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'date', title: 'תאריך', type: 'date' }),
    defineField({
      name: 'image',
      title: 'תמונה',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'טקסט חלופי (עברית)', type: 'string' }],
      validation: (r) => r.required(),
    }),
  ],
  preview: { select: { title: 'title', subtitle: 'category', media: 'image' } },
});
