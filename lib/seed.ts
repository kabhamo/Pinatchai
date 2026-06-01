import type { Animal, FarmEvent, BlogPost, GalleryItem } from './types';

// Unsplash placeholders (allowed in next.config remotePatterns).
const img = (id: string, w = 800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;

export const seedAnimals: Animal[] = [
  {
    slug: 'nachash',
    name_he: 'נחש',
    name_ar: 'ثعبان',
    category: 'reptile',
    emoji: '🐍',
    imageUrl: img('1531386151447-fd76ad50012f'),
    description_he:
      'הנחש שלנו הוא נחש מים ידידותי ושקט שאוהב להתחמם תחת מנורת החום. ביקור אצלו הוא הזדמנות מצוינת ללמוד שזוחלים לא מפחידים בכלל.',
    description_ar:
      'ثعباننا ودود وهادئ يحب الاستلقاء تحت مصباح الحرارة. زيارته فرصة رائعة لتعلّم أن الزواحف ليست مخيفة أبداً.',
    careInfo_he: 'מואכל אחת לשבוע, חי בטרריום מבוקר חום ולחות.',
    careInfo_ar: 'يُطعم مرة أسبوعياً، ويعيش في حوض زجاجي بدرجة حرارة ورطوبة مضبوطة.',
    funFacts: [
      { he: 'נחשים מריחים בעזרת הלשון', ar: 'تشمّ الثعابين بواسطة لسانها' },
      { he: 'הם מחליפים עור כמה פעמים בשנה', ar: 'تبدّل جلدها عدة مرات في السنة' },
    ],
  },
  {
    slug: 'tuki',
    name_he: 'תוכי',
    name_ar: 'ببغاء',
    category: 'bird',
    emoji: '🦜',
    imageUrl: img('1552728089-57bdde30beb3'),
    description_he:
      'התוכי הצבעוני שלנו יודע לומר שלום ולשרוק מנגינות. הילדים מתים עליו והוא תמיד מוכן להופעה קטנה.',
    description_ar:
      'ببغاؤنا الملوّن يعرف أن يقول مرحباً ويصفّر الألحان. يحبه الأطفال كثيراً وهو دائماً مستعد لعرض صغير.',
    careInfo_he: 'אוכל זרעים, פירות וירקות טריים מדי יום.',
    careInfo_ar: 'يأكل البذور والفواكه والخضار الطازجة يومياً.',
    funFacts: [
      { he: 'תוכים יכולים לחיות עשרות שנים', ar: 'يمكن أن تعيش الببغاوات عشرات السنين' },
      { he: 'הם מחקים קולות וצלילים', ar: 'تقلّد الأصوات والنغمات' },
    ],
  },
  {
    slug: 'ez',
    name_he: 'עז',
    name_ar: 'ماعز',
    category: 'livestock',
    emoji: '🐐',
    imageUrl: img('1524024973431-2ad916746881'),
    description_he:
      'העזים שלנו סקרניות, חברותיות ואוהבות שמלטפים אותן. אפשר להאכיל אותן בעלים ירוקים מתוך היד.',
    description_ar:
      'ماعزنا فضولي وودود ويحب المداعبة. يمكن إطعامه أوراقاً خضراء من اليد مباشرة.',
    careInfo_he: 'רועות בחצר, אוכלות חציר ומזון מותאם.',
    careInfo_ar: 'ترعى في الساحة وتأكل القشّ وعلفاً مخصصاً.',
    funFacts: [
      { he: 'לעזים אישונים מלבניים', ar: 'حدقات الماعز مستطيلة الشكل' },
      { he: 'הן מצוינות בטיפוס', ar: 'الماعز بارع جداً في التسلّق' },
    ],
  },
  {
    slug: 'arnav',
    name_he: 'ארנב',
    name_ar: 'أرنب',
    category: 'livestock',
    emoji: '🐰',
    imageUrl: img('1585110396000-c9ffd4e4b308'),
    description_he:
      'הארנבים הרכים שלנו הם הכוכבים של פינת הליטוף. הם שקטים, נעימים למגע ומושלמים לפעוטות.',
    description_ar:
      'أرانبنا الناعمة هي نجوم ركن المداعبة. هادئة ولطيفة الملمس ومثالية للأطفال الصغار.',
    careInfo_he: 'אוכלים חציר, ירקות וגזר. זקוקים למקום מוצל.',
    careInfo_ar: 'تأكل القشّ والخضار والجزر، وتحتاج إلى مكان مظلّل.',
    funFacts: [
      { he: 'שיני הארנב גדלות כל החיים', ar: 'تنمو أسنان الأرنب طوال حياته' },
      { he: 'הם קופצים גבוה כשהם שמחים', ar: 'تقفز عالياً عندما تكون سعيدة' },
    ],
  },
  {
    slug: 'tsav',
    name_he: 'צב',
    name_ar: 'سلحفاة',
    category: 'reptile',
    emoji: '🐢',
    imageUrl: img('1437622368342-7a3d73a34c8f'),
    description_he:
      'הצב שלנו לא ממהר לשום מקום. הוא אוהב לאכול חסה ולשבת בשמש, ומלמד את הילדים סבלנות.',
    description_ar:
      'سلحفاتنا لا تتعجّل أبداً. تحب أكل الخس والجلوس في الشمس، وتعلّم الأطفال الصبر.',
    careInfo_he: 'אוכל ירקות עליים, חי בחצר עם בריכת מים רדודה.',
    careInfo_ar: 'تأكل الخضار الورقية وتعيش في الساحة مع بركة ماء ضحلة.',
    funFacts: [
      { he: 'צבים יכולים לחיות מעל 50 שנה', ar: 'يمكن أن تعيش السلاحف أكثر من 50 سنة' },
      { he: 'השריון הוא חלק מהשלד שלהם', ar: 'الصدفة جزء من هيكلها العظمي' },
    ],
  },
  {
    slug: 'chamor',
    name_he: 'חמור',
    name_ar: 'حمار',
    category: 'livestock',
    emoji: '🫏',
    imageUrl: img('1566251037378-5e04e3bec343'),
    description_he:
      'החמור הטוב שלנו הוא חבר אמיתי. הוא רגוע, סבלני ואוהב לטיולים קצרים עם הילדים בחצר החווה.',
    description_ar:
      'حمارنا الطيب صديق حقيقي. هادئ وصبور ويحب الجولات القصيرة مع الأطفال في ساحة المزرعة.',
    careInfo_he: 'אוכל חציר ושעורה, אוהב מברשת והרבה תשומת לב.',
    careInfo_ar: 'يأكل القشّ والشعير، ويحب التمشيط والكثير من الاهتمام.',
    funFacts: [
      { he: 'לחמורים זיכרון מצוין', ar: 'تتمتع الحمير بذاكرة ممتازة' },
      { he: 'הם נזהרים מאוד ולא עקשנים', ar: 'الحمير حذرة جداً وليست عنيدة' },
    ],
  },
];

const daysFromNow = (d: number) => {
  const date = new Date();
  date.setDate(date.getDate() + d);
  date.setHours(10, 0, 0, 0);
  return date.toISOString();
};

export const seedEvents: FarmEvent[] = [
  {
    slug: 'summer-festival',
    title_he: 'חגיגת קיץ בחווה',
    title_ar: 'مهرجان الصيف في المزرعة',
    date: daysFromNow(7),
    price: 45,
    maxCapacity: 120,
    category: 'celebration',
    imageUrl: img('1500595046743-cd271d694d30'),
    description_he:
      'יום שלם של כיף משפחתי: מתחמי האכלה, מופע בועות ענק, פינת יצירה ודוכני אוכל. בואו לחגוג איתנו את הקיץ!',
    description_ar:
      'يوم كامل من المرح العائلي: أركان إطعام، عرض فقاعات عملاق، ركن إبداع وأكشاك طعام. تعالوا نحتفل بالصيف معاً!',
  },
  {
    slug: 'birthday-at-farm',
    title_he: 'יום הולדת בפארם',
    title_ar: 'عيد ميلاد في المزرعة',
    date: daysFromNow(14),
    price: 60,
    maxCapacity: 30,
    category: 'birthday',
    imageUrl: img('1530103862676-de8c9debad1d'),
    description_he:
      'חבילת יום הולדת בלתי נשכחת: סיור מודרך, האכלת בעלי חיים, פינת משחקים פרטית וכיבוד מתוק לכל הילדים.',
    description_ar:
      'باقة عيد ميلاد لا تُنسى: جولة مرشدة، إطعام الحيوانات، ركن ألعاب خاص وضيافة حلوة لكل الأطفال.',
  },
  {
    slug: 'night-tour',
    title_he: 'סיור לילות בחווה',
    title_ar: 'جولة ليلية في المزرعة',
    date: daysFromNow(21),
    price: 50,
    maxCapacity: 40,
    category: 'tour',
    imageUrl: img('1470071459604-3b5ec3a7fe05'),
    description_he:
      'הרפתקה מיוחדת אחרי השקיעה: נגלה איך בעלי החיים מתנהגים בלילה, נקשיב לקולות החווה ונדליק פנסים יחד.',
    description_ar:
      'مغامرة خاصة بعد الغروب: نكتشف كيف تتصرّف الحيوانات ليلاً، نصغي إلى أصوات المزرعة ونضيء الفوانيس معاً.',
  },
];

export const seedBlogPosts: BlogPost[] = [
  {
    slug: 'how-to-feed-animals',
    title_he: 'איך מאכילים נכון את בעלי החיים בחווה',
    title_ar: 'كيف نُطعم حيوانات المزرعة بشكل صحيح',
    excerpt_he: 'מדריך קצר להורים: מה מותר להאכיל, איך מתקרבים בבטחה ולמה לא להביא אוכל מהבית.',
    excerpt_ar: 'دليل قصير للأهل: ماذا يُسمح بإطعامه، كيف نقترب بأمان، ولماذا لا نُحضر طعاماً من البيت.',
    publishedAt: daysFromNow(-3),
    category: 'tips',
    imageUrl: img('1444212477490-ca407925329e'),
  },
  {
    slug: 'meet-the-goats',
    title_he: 'הכירו את העזים שלנו',
    title_ar: 'تعرّفوا على ماعزنا',
    excerpt_he: 'סיפורן של העזים הסקרניות בחווה — מאיפה הגיעו, מה הן אוהבות ואיך הן מתחברות לילדים.',
    excerpt_ar: 'قصة ماعزنا الفضولي — من أين أتى، ماذا يحب، وكيف يتآلف مع الأطفال.',
    publishedAt: daysFromNow(-10),
    category: 'animals',
    imageUrl: img('1524024973431-2ad916746881'),
  },
  {
    slug: 'spring-at-the-farm',
    title_he: 'אביב בחווה: מה חדש אצלנו',
    title_ar: 'الربيع في المزرعة: ما الجديد لدينا',
    excerpt_he: 'פינת משחקים מחודשת, חברים חדשים בחווה ולוח אירועים מלא לעונה הקרובה.',
    excerpt_ar: 'ركن ألعاب مُجدّد، أصدقاء جدد في المزرعة، وروزنامة فعاليات مليئة للموسم القادم.',
    publishedAt: daysFromNow(-20),
    category: 'news',
    imageUrl: img('1416879595882-3373a0480b5b'),
  },
];

export const seedGallery: GalleryItem[] = [
  { _id: 'g1', title: 'עזים בחצר', category: 'animals', imageUrl: img('1524024973431-2ad916746881', 600) },
  { _id: 'g2', title: 'חגיגת קיץ', category: 'events', imageUrl: img('1500595046743-cd271d694d30', 600) },
  { _id: 'g3', title: 'האכלת בעלי חיים', category: 'activities', imageUrl: img('1444212477490-ca407925329e', 600) },
  { _id: 'g4', title: 'נוף החווה', category: 'farm', imageUrl: img('1416879595882-3373a0480b5b', 600) },
  { _id: 'g5', title: 'ארנב רך', category: 'animals', imageUrl: img('1585110396000-c9ffd4e4b308', 600) },
  { _id: 'g6', title: 'פינת משחקים', category: 'activities', imageUrl: img('1530103862676-de8c9debad1d', 600) },
];
