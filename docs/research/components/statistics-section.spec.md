# قسم الإحصائيات - Specification

## نظرة عامة
- **ملف الهدف:** `src/components/StatisticsSection.tsx`
- **نوع التفاعل:** Scroll-driven (تحريك العدادات عند ظهور القسم)
- **الاتجاه:** RTL

## هيكل DOM

```html
<section class="statistics-section">
  <div class="stats-content">
    <p class="stats-text">
      خلال 
      <span class="stat-number" data-target="7">0</span>
      سنوات ساعدت 
      <span class="stat-number" data-target="80">0</span>
      مؤسّس ليبدأ مشروعه في بيع الخبرات. 
      عُملائي يشهدون بعائد استثمار يبدأ من 
      <span class="stat-number" data-target="400">0</span>
      %
    </p>
  </div>
</section>
```

## الأنماط المحسوبة (Computed Styles)

### statistics-section
- direction: rtl
- padding: 80px 24px
- background: #0f0f0f
- text-align: center

### stats-content
- max-width: 900px
- margin: 0 auto

### stats-text
- font-size: clamp(18px, 2.2vw, 28px)
- font-weight: 500
- color: #d9d9d9
- line-height: 1.8
- text-align: right

### stat-number
- font-weight: 700
- color: #2151ff
- font-size: 1.1em
- transition: opacity 300ms

## السلوك والحالات

### تحريك العدادات (Counter Animation)
- **المشغل:** عند ظهور القسم في viewport (IntersectionObserver)
- **الحركة:** 
  - 7 سنوات: من 0 إلى 7
  - 80+ مؤسس: من 0 إلى 80
  - 400% عائد: من 0 إلى 400
- **المدة:** 1500ms لكل عداد
- **التأخير (Stagger):** 200ms بين كل عداد
- **الوظيفة (Easing):** ease-out

## نص المحتوى (Text Content)

```
خلال ٧ سنوات ساعدت 80+ مؤسّس ليبدأ مشروعه في بيع الخبرات. 
عُملائي يشهدون بعائد استثمار يبدأ من 400%
```

## الاستجابة (Responsive)

- **جميع الأحجام:** نص مركزي RTL
- **سطح المكتب:** حجم النص أكبر
- **الهاتف:** حجم النص أصغر مع نفس الحركات
