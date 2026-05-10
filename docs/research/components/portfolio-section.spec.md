# قسم المحفظة (أحدث أعمالي) - Specification

## نظرة عامة
- **ملف الهدف:** `src/components/PortfolioSection.tsx`
- **نوع التفاعل:** Carousel يدوي (أزرار التنقل السابق/التالي)
- **الاتجاه:** RTL (من اليمين لليسار)

## هيكل DOM

```html
<section class="portfolio-section">
  <h2 class="section-title">أحدث أعمالي</h2>
  
  <div class="portfolio-carousel">
    <div class="carousel-slides">
      <!-- بطاقات المشاريع -->
      <a href="..." class="portfolio-card">
        <div class="card-image">
          <img src="..." alt="..." />
        </div>
        <div class="card-overlay"></div>
        <div class="card-content">
          <p class="card-category">موقع تجاري</p>
          <h3 class="card-title">اسم المشروع</h3>
        </div>
      </a>
    </div>
  </div>
  
  <div class="carousel-nav">
    <button class="nav-prev">←</button>
    <button class="nav-next">→</button>
  </div>
</section>
```

## الأنماط المحسوبة (Computed Styles)

### portfolio-section
- direction: rtl
- padding: 48px 24px
- background: #0f0f0f
- max-width: 1400px
- margin: 0 auto

### section-title (h2)
- font-size: clamp(24px, 3vw, 40px)
- font-weight: 700
- color: #ebebeb
- margin-bottom: 48px
- text-align: right

### portfolio-carousel
- position: relative
- overflow: hidden

### carousel-slides
- display: flex
- gap: 24px
- direction: rtl
- transition: transform 500ms cubic-bezier(0.4, 0, 0.2, 1)

### portfolio-card (عنصر الرابط)
- flex: 0 0 calc(50% - 12px)
- aspect-ratio: 4/3
- border-radius: 16px
- overflow: hidden
- position: relative
- cursor: pointer
- transition: transform 300ms, box-shadow 300ms
- text-decoration: none

### portfolio-card:hover
- transform: translateY(-8px)
- box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4)

### card-image
- position: absolute
- inset: 0
- width: 100%
- height: 100%

### card-image > img
- width: 100%
- height: 100%
- object-fit: cover

### card-overlay
- position: absolute
- inset: 0
- background: linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.8) 100%)
- z-index: 1

### card-content
- position: absolute
- bottom: 0
- right: 0
- left: 0
- padding: 24px
- z-index: 2
- direction: rtl

### card-category
- font-size: 12px
- color: #888888
- text-transform: uppercase
- letter-spacing: 0.05em
- margin-bottom: 8px

### card-title (h3)
- font-size: 18px
- font-weight: 600
- color: #ebebeb
- line-height: 1.3

## بيانات المشاريع (Content)

```javascript
[
  {
    id: 1,
    title: "Luniva",
    category: "موقع تجاري",
    image: "/images/portfolio/luniva.jpg",
    link: "https://luniva.one"
  },
  {
    id: 2,
    title: "شارك - Coworking",
    category: "موقع تجاري",
    image: "/images/portfolio/sharik.jpg",
    link: "https://sharik.com.sa"
  },
  // ... 10 مشاريع أخرى
]
```

## السلوك والحالات

### التنقل إلى التالي
- **المشغل:** نقر زر التالي (→)
- **الحركة:** شريحة سلسة RTL
- **المدة:** 500ms
- **الحلقة:** تدور بلا نهاية

### الحالة عند التمرير (Hover)
- تحريك للأعلى: -8px
- إضافة ظل أعمق
- التدرج: 300ms

## الاستجابة (Responsive)

- **سطح المكتب (1440px+):** عنصرين مرئيين، RTL
- **الجهاز اللوحي (768px):** عنصر واحد، RTL
- **الهاتف (390px):** عنصر واحد، RTL كامل
