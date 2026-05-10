# قسم المقالات - Specification

## نظرة عامة
- **ملف الهدف:** `src/components/BlogSection.tsx`
- **نوع التفاعل:** روابط ثابتة (Static)
- **الاتجاه:** RTL

## هيكل DOM

```html
<section class="blog-section">
  <a href="./blog" class="section-header">
    <h2>آخر المقالات</h2>
  </a>
  
  <div class="articles-list">
    <a href="./blog/selling-high-ticket" class="article-link">
      <h3>منهجيّتي لبيع الخدمات الأغلى | High ticket</h3>
    </a>
    
    <a href="./blog/4-branding-values" class="article-link">
      <h3>٤ قِيَم. كُل أصحاب البراندات الناجحة كانت عندهم</h3>
    </a>
    
    <!-- 3-6 مقالات إضافية -->
  </div>
</section>
```

## الأنماط المحسوبة

### blog-section
- direction: rtl
- padding: 80px 24px
- background: #0f0f0f

### section-header
- text-decoration: none
- margin-bottom: 48px

### section-header > h2
- font-size: clamp(24px, 3vw, 40px)
- font-weight: 700
- color: #ebebeb
- text-align: right

### articles-list
- display: flex
- flex-direction: column
- gap: 24px
- max-width: 800px
- margin: 0 auto
- direction: rtl

### article-link
- text-decoration: none
- color: #d9d9d9
- padding: 16px
- border-radius: 8px
- transition: all 300ms
- border-bottom: 1px solid rgba(255, 255, 255, 0.1)

### article-link:hover
- background: rgba(235, 235, 235, 0.05)
- color: #ebebeb
- transform: translateX(8px)

### article-link > h3
- font-size: 18px
- font-weight: 600
- line-height: 1.5

## نص المقالات (Content)

```javascript
[
  {
    title: "منهجيّتي لبيع الخدمات الأغلى | High ticket",
    slug: "selling-high-ticket"
  },
  {
    title: "٤ قِيَم. كُل أصحاب البراندات الناجحة كانت عندهم",
    slug: "4-branding-values"
  },
  {
    title: "تقرير: هل ما زال بيع الدورات مشروع مُربح؟",
    slug: "report-elearning-trends"
  },
  {
    title: "٣ أسئلة قبل أن أبدأ بأي مشروع",
    slug: "starting-a-new-project"
  },
  {
    title: "درست حَملات أفضل من يبيعون المنتجات الرقميّة. اتّضح أن لديهم سر..",
    slug: "designing-campaigns"
  },
  {
    title: "التخصّص يحميك من تحيّزاتك الفكريّة",
    slug: "cognitive-biases"
  }
]
```

## السلوك

### عند التمرير (Hover)
- انتقال لطيف للداخل: 8px
- تغيير لون النص
- إضافة خلفية فاتحة
- المدة: 300ms

### عند النقر
- الانتقال إلى صفحة المقالة
- استخدام Next.js Link أو `<a>`

## الاستجابة

- **جميع الأحجام:** قائمة عمودية RTL
- **سطح المكتب:** حد أقصى للعرض 800px
- **الهاتف:** كامل العرض مع padding
