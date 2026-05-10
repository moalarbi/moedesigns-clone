# 📁 شرح تفصيلي لبنية المشروع

## مجلد `src/`

مجلد الكود المصدري الرئيسي للتطبيق.

### `src/components/`

جميع مكونات React في التطبيق.

#### `src/components/sections/`

أقسام الصفحة الرئيسية الكبيرة (كل قسم = ملف منفصل):

- **Navigation.tsx** - شريط التنقل العلوي (الهيدر)
  - يحتوي على: اللوجو، روابط التنقل، الزر الثلاثي، ملف التعريف
  - يبقى ثابتاً عند التمرير
  
- **Hero.tsx** - قسم البطل (الجزء العلوي من الصفحة)
  - يحتوي على: العنوان الكبير، الوصف، البطاقات الثلاث
  - حركات الدخول (fade-in, slide-up)

- **Portfolio.tsx** - قسم الأعمال (أحدث الأعمال)
  - دوّار أفقي للمشاريع
  - صور وأسماء المشاريع
  - أزرار الملاحة (السابق/التالي)

- **Stats.tsx** - قسم الإحصائيات
  - أرقام متحركة (counter animation)
  - السنوات، عدد المؤسسين، نسبة الاستثمار

- **Clients.tsx** - قسم شعارات العملاء
  - دوّار أفقي لشعارات العملاء
  - شعارات رمادية على خلفية داكنة

- **Services.tsx** - قسم الفئات/الخدمات
  - دوّار أفقي للفئات
  - أزرار قابلة للنقر

- **Nashra.tsx** - قسم ترويج Nashra
  - نموذج الاشتراك في البريد الإلكتروني
  - وصف الخدمة

- **Products.tsx** - قسم المنتجات
  - دوّار أفقي للمنتجات
  - صور المنتجات، الأسعار، الفئات

- **Blog.tsx** - قسم المقالات
  - قائمة المقالات
  - روابط مع الأوصاف

- **Videos.tsx** - قسم الفيديوهات
  - دوّار أفقي للفيديوهات
  - أزرار التشغيل

- **CTA.tsx** - قسم الدعوة للعمل (Call to Action)
  - عنوان مقنع
  - أزرار الإجراء

- **Footer.tsx** - التذييل
  - روابط المساعدة
  - نموذج الاشتراك
  - معلومات التواصل

#### `src/components/ui/`

مكونات واجهة المستخدم المعاد استخدامها:

- **Button.tsx** - مكون الزر
  - أنماط مختلفة (أساسي، ثانوي، إجراء)
  - أحجام مختلفة (صغير، متوسط، كبير)
  - حالات (عادي، تمرير الفأرة، نشط)

- **Card.tsx** - مكون البطاقة
  - استخدم في المشاريع والمنتجات
  - أنماط مختلفة مع صور وظلال

- **Carousel.tsx** - مكون دوّار الصور
  - يدعم التمرير الأفقي
  - أزرار الملاحة والدوائر
  - حركات سلسة

- **Dropdown.tsx** - مكون القائمة المنسدلة
  - يستخدم في قائمة الثلاث نقاط
  - حركات الفتح والإغلاق

### `src/pages/`

صفحات Next.js (App Router):

- **index.tsx** - الصفحة الرئيسية
  - تجميع جميع الأقسام
  
- **services.tsx** - صفحة الخدمات
  - تفاصيل الخدمات الكاملة

- **products.tsx** - صفحة المنتجات
  - قائمة المنتجات الكاملة

- **blog.tsx** - صفحة المقالات
  - قائمة جميع المقالات

- **works.tsx** - صفحة الأعمال
  - معرض جميع المشاريع

- **contact.tsx** - صفحة التواصل
  - نموذج التواصل

### `src/styles/`

ملفات الأنماط (CSS):

- **globals.css** - الأنماط العامة
  - تحديد الخط الافتراضي
  - الألوان الأساسية
  - الأنماط الأساسية للعناصر

- **variables.css** - متغيرات CSS
  - متغيرات الألوان
  - متغيرات المسافات
  - متغيرات الخطوط
  - متغيرات الظلال

- **animations.css** - الحركات
  - `@keyframes fadeIn`
  - `@keyframes slideUp`
  - `@keyframes scaleUp`
  - `@keyframes pulse`

### `src/types/`

تعريفات TypeScript:

- **index.ts** - التعريفات الأساسية
  ```typescript
  export interface Project { }
  export interface Product { }
  export interface Article { }
  ```

- **models.ts** - نماذج البيانات
  ```typescript
  export type Theme = 'light' | 'dark'
  export type Direction = 'ltr' | 'rtl'
  ```

### `src/hooks/`

React Hooks مخصصة:

- **useIntersection.ts** - كشف التقاطع (للحركات على التمرير)
  ```typescript
  const ref = useIntersection((isVisible) => {
    if (isVisible) playAnimation()
  })
  ```

- **useMediaQuery.ts** - الاستجابة (responsive)
  ```typescript
  const isMobile = useMediaQuery('(max-width: 640px)')
  ```

### `src/utils/`

دوال مساعدة:

- **cn.ts** - دمج أسماء الأصناف (classNames)
  ```typescript
  cn('px-4', isMobile && 'px-2') // دمج ديناميكي
  ```

- **helpers.ts** - وظائف مساعدة عامة
  ```typescript
  export const formatPrice = (price: number) => { }
  export const truncateText = (text: string, length: number) => { }
  ```

### `src/layout.tsx`

التخطيط الرئيسي:

```typescript
export default function RootLayout({ children }) {
  return (
    <html dir="rtl" lang="ar">
      <body>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  )
}
```

---

## مجلد `public/`

الملفات الثابتة التي يتم تقديمها بدون معالجة.

### `public/fonts/`

ملفات الخطوط:

- **itf-huwiya-arabic/**
  - `regular.woff2` - الخط العادي
  - `medium.woff2` - الخط المتوسط
  - `bold.woff2` - الخط الغامق
  - `light.woff2` - الخط الخفيف

### `public/images/`

الصور:

- **logo.png** - شعار الموقع
- **profile.jpg** - صورة الملف الشخصي (الهيدر)
- **portfolio/**
  - `luniva.jpg` - صورة مشروع
  - `sharik.jpg` - صورة مشروع
  - وغيرها...
- **testimonials/**
  - صور العملاء والعملاء

### `public/videos/`

الفيديوهات:

- **hero-bg.mp4** - فيديو خلفية البطل (اختياري)
- **products/**
  - فيديوهات الدورات

---

## مجلد `docs/`

التوثيق والمواصفات.

### `docs/research/`

البحث والتحليل التفصيلي:

- **README.md** - دليل التوثيق الرئيسي
- **PAGE_TOPOLOGY.md** - بنية الصفحة كاملة
- **DESIGN_TOKENS.md** - نظام التصميم (الألوان، الخطوط، المسافات)
- **BEHAVIORS.md** - جميع الحركات والسلوكيات

### `docs/research/components/`

مواصفات كل مكون:

- **NAVIGATION.md** - مواصفات الملاحة
- **HERO.md** - مواصفات البطل
- **CAROUSEL.md** - مواصفات الدوارات
- وغيرها...

### `docs/design-references/`

صور مرجعية:

- **desktop/desktop-hero.png** - صورة الموقع على سطح المكتب
- **mobile/mobile-hero.png** - صورة الموقع على الهاتف
- **tablet/tablet-portfolio.png** - صورة على التابلت

---

## مجلد `scripts/`

سكريبتات مساعدة:

- **download-assets.mjs** - تحميل الأصول من الموقع الأصلي
  ```bash
  node scripts/download-assets.mjs
  ```

---

## ملفات الجذر

### `package.json`

معلومات المشروع والتبعيات:

```json
{
  "name": "moedesigns-clone",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": { }
}
```

### `tsconfig.json`

إعدادات TypeScript:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### `next.config.js`

إعدادات Next.js:

```js
module.exports = {
  i18n: {
    locales: ['ar'],
    defaultLocale: 'ar',
    localeDetection: false
  }
}
```

---

## ملفات مهمة

- **README.md** - دليل البدء السريع
- **STRUCTURE.md** - هذا الملف (شرح البنية)
- **.gitignore** - الملفات المستثناة من Git
- **.env.example** - مثال على متغيرات البيئة

---

## نصائح للتنقل

### للعثور على ملف معين:

1. **مكون واجهة مستخدم**: `src/components/ui/[ComponentName].tsx`
2. **قسم صفحة**: `src/components/sections/[SectionName].tsx`
3. **صفحة**: `src/pages/[PageName].tsx`
4. **نمط**: `src/styles/[FileName].css`
5. **دالة مساعدة**: `src/utils/[FileName].ts`

### للعثور على توثيق معينة:

1. **شرح المشروع**: `docs/research/README.md`
2. **نظام التصميم**: `docs/research/DESIGN_TOKENS.md`
3. **حركات معينة**: `docs/research/BEHAVIORS.md`
4. **مكون محدد**: `docs/research/components/[ComponentName].md`

---

**حظاً موفقاً في التطوير! 🚀**
