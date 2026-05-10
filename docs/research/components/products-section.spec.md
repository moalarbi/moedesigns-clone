# قسم المنتجات والدورات - Specification

## نظرة عامة
- **ملف الهدف:** `src/components/ProductsSection.tsx`
- **نوع التفاعل:** Carousel يدوي + نقاط التنقل
- **الاتجاه:** RTL

## هيكل DOM

```html
<section class="products-section">
  <a href="./products" class="section-header">
    <h2>أحدث المنتجات</h2>
  </a>
  
  <div class="products-carousel">
    <div class="carousel-slides">
      <a href="..." class="product-card">
        <div class="product-image">
          <img src="..." alt="..." />
        </div>
        <div class="product-info">
          <span class="product-type">دورة مسجّلة</span>
          <p class="product-price">$249</p>
          <h3 class="product-title">المنهجيّة في الكتابة الإعلانيّة</h3>
        </div>
      </a>
    </div>
  </div>
  
  <div class="carousel-dots">
    <button class="dot active"></button>
    <button class="dot"></button>
    <button class="dot"></button>
  </div>
  
  <div class="carousel-nav">
    <button class="nav-prev">←</button>
    <button class="nav-next">→</button>
  </div>
</section>
```

## الأنماط المحسوبة

### products-section
- direction: rtl
- padding: 80px 24px
- background: #0f0f0f

### section-header
- text-decoration: none
- color: inherit

### section-header > h2
- font-size: clamp(24px, 3vw, 40px)
- font-weight: 700
- color: #ebebeb
- margin-bottom: 48px
- text-align: right

### carousel-slides
- display: flex
- gap: 24px
- direction: rtl
- transition: transform 500ms ease

### product-card
- flex: 0 0 calc(33.333% - 16px)
- border-radius: 16px
- overflow: hidden
- text-decoration: none
- color: inherit
- transition: transform 300ms, box-shadow 300ms

### product-card:hover
- transform: scale(1.02)
- box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3)

### product-image
- width: 100%
- aspect-ratio: 3/4
- overflow: hidden

### product-image > img
- width: 100%
- height: 100%
- object-fit: cover

### product-info
- padding: 16px
- background: #171717
- direction: rtl

### product-type
- display: block
- font-size: 12px
- color: #888888
- margin-bottom: 8px
- text-transform: uppercase

### product-price
- font-size: 16px
- font-weight: 700
- color: #2151ff
- margin-bottom: 8px

### product-title
- font-size: 16px
- font-weight: 600
- color: #ebebeb
- line-height: 1.4

### carousel-dots
- display: flex
- justify-content: center
- gap: 8px
- margin-top: 32px
- direction: ltr

### dot
- width: 8px
- height: 8px
- border-radius: 50%
- background: #888888
- border: none
- cursor: pointer
- transition: background 300ms

### dot.active
- background: #ebebeb

## بيانات المنتجات

```javascript
[
  {
    id: 1,
    title: "المنهجيّة 'العلميّة' في الكتابة الإعلانيّة",
    type: "دورة مسجّلة",
    price: 249,
    image: "/images/products/copywriting.jpg",
    link: "https://theprocess.ae/..."
  },
  {
    id: 2,
    title: "دورة تصميم وبناء المواقع",
    type: "دورة رقميّة مسجّلة",
    price: 199,
    image: "/images/products/web-design.jpg",
    link: "https://theprocess.ae/..."
  },
  // ... 3 منتجات أخرى
]
```

## الاستجابة

- **سطح المكتب:** 3-4 منتجات مرئية
- **الجهاز اللوحي:** 2 منتج
- **الهاتف:** 1 منتج كامل العرض
