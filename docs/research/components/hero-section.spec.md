# Hero Section Specification

## Overview
- **Target file:** `src/components/HeroSection.tsx`
- **Interaction model:** Scroll-triggered animations + click navigation on cards
- **Key animations:** Fade-in, slide-up on entrance

## DOM Structure
```
<section class="hero">
  <div class="hero-content">
    <!-- Main heading -->
    <h1 class="hero-title">
      مستشار في بناء المشاريع الاستشاريّة والتدريبيّة.
      <br />
      رائد أعمال وكاتب.
    </h1>
    
    <!-- Hero cards -->
    <div class="hero-cards">
      <a href="./consulting" class="hero-card green">
        <div class="card-indicator">●</div>
        <div class="card-body">
          <span class="card-label">ابدأ معي</span>
          <span class="card-title">احجز استشارة</span>
        </div>
      </a>
      
      <a href="./blog" class="hero-card">
        <div class="card-indicator">●●</div>
        <div class="card-body">
          <span class="card-label">المقالات</span>
          <span class="card-title">١٥٠ مقال في بيع الخبرات</span>
        </div>
      </a>
      
      <a href="./services" class="hero-card">
        <div class="card-indicator">●●●</div>
        <div class="card-body">
          <span class="card-label">اعمل معي</span>
          <span class="card-title">خدماتي والباقات</span>
        </div>
      </a>
    </div>
  </div>
</section>
```

## Computed Styles

### hero (section container)
- display: flex
- align-items: center
- justify-content: center
- min-height: 100vh
- padding: 120px 24px 80px
- background: #0f0f0f
- position: relative

### hero-content
- display: flex
- flex-direction: column
- gap: 48px
- max-width: 1400px
- width: 100%
- margin: 0 auto

### hero-title (h1)
- font-size: clamp(36px, 4.6vw, 62px)
- font-weight: 700
- color: #ebebeb
- line-height: 1.2
- text-align: right
- direction: rtl
- animation: slideUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards
- animation-delay: 0s

### hero-cards
- display: flex
- gap: 24px
- justify-content: flex-end
- direction: rtl

### hero-card (link)
- display: flex
- flex-direction: column
- gap: 12px
- padding: 24px
- border: 1px solid rgba(255, 255, 255, 0.1)
- border-radius: 12px
- background: rgba(23, 23, 23, 0.6)
- cursor: pointer
- text-decoration: none
- transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1)
- min-width: 200px
- animation: slideUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards
- animation-delay: 0.1s / 0.2s / 0.3s (staggered)

### hero-card:hover
- background: rgba(33, 33, 33, 0.9)
- border-color: rgba(255, 255, 255, 0.2)
- transform: translateY(-4px)
- box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3)

### hero-card.green
- border-color: #3ecf5c
- background: rgba(62, 207, 92, 0.1)

### hero-card.green:hover
- background: rgba(62, 207, 92, 0.2)
- box-shadow: 0 0 20px rgba(62, 207, 92, 0.3)

### card-indicator
- font-size: 12px
- color: #888888
- letter-spacing: 2px

### card-body
- display: flex
- flex-direction: column
- gap: 4px

### card-label
- font-size: 12px
- color: #888888
- text-transform: uppercase
- letter-spacing: 0.05em

### card-title
- font-size: 16px
- font-weight: 600
- color: #ebebeb
- line-height: 1.3

## States & Behaviors

### Entrance Animations
- **Trigger:** Page load / scroll to hero section (IntersectionObserver)
- **Animation:** slideUp (fade-in + translateY)
- **Duration:** 800ms
- **Easing:** cubic-bezier(0.4, 0, 0.2, 1)
- **Stagger:** Cards animate with 100ms delay between each (title → card1 → card2 → card3)
- **Implementation:** CSS animations with animation-delay property

### Card Hover
- **Scale:** 1 → 1.02
- **Shadow:** Increased depth
- **Border:** Slightly brightened
- **Duration:** 300ms
- **Easing:** ease-out

### Card Click
- Navigate to: ./consulting, ./blog, or ./services
- No animation needed (browser handles navigation)

## Text Content
- Hero title: "مستشار في بناء المشاريع الاستشاريّة والتدريبيّة. رائد أعمال وكاتب."
- Card 1 label: "ابدأ معي", title: "احجز استشارة"
- Card 2 label: "المقالات", title: "١٥٠ مقال في بيع الخبرات"
- Card 3 label: "اعمل معي", title: "خدماتي والباقات"

## Responsive Behavior
- **Desktop (1440px):** 3 cards in a row, full layout
- **Tablet (768px):** Cards may adjust layout slightly
- **Mobile (390px):** Cards stack vertically or reduce to 1-2 per row

## Assets
- No images required (text-only section)

## Animation Implementation
Uses @keyframes slideUp from globals.css:
```css
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```
