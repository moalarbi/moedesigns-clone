# Navigation Component Specification

## Overview
- **Target file:** `src/components/Navigation.tsx`
- **Interaction model:** Click-driven (three-dot menu toggle), click navigation for links
- **Fixed position:** Yes, z-index: 50

## DOM Structure
```
<nav class="nav-container">
  <div class="nav-left">
    <!-- Logo/Home link -->
    <a href="./">Logo</a>
  </div>
  <div class="nav-links">
    <!-- Nav links in RTL order -->
    <a href="./blog">المقالات</a>
    <a href="./works">الأعمال</a>
    <a href="./services">الخدمات</a>
    <a href="./products">المنتجات</a>
  </div>
  <div class="nav-right">
    <!-- Three-dot menu button -->
    <button class="dots-btn">···</button>
    <!-- Dropdown menu (hidden by default) -->
    <div class="nav-dropdown" style="display: none;">
      <a href="#">مصادر مجّانيّة</a>
      <a href="#">البودكاست</a>
      <a href="#">التواصل</a>
      <a href="#">الوضع الليّلي</a>
    </div>
    <!-- CTA Button -->
    <a href="./consulting" class="cta-btn">ابدأ باستشارة</a>
    <!-- Profile image/avatar -->
    <img src="..." alt="Profile" class="profile-pic" />
  </div>
</nav>
```

## Computed Styles

### nav-container (fixed header)
- display: flex
- justify-content: space-between
- align-items: center
- position: fixed
- top: 0
- right: 0
- left: 0
- width: 100%
- height: ~80px
- padding: 16px 24px
- background: rgba(15, 15, 15, 0.9) / #0f0f0f
- z-index: 50
- border-bottom: 1px solid rgba(255, 255, 255, 0.05) (optional)

### nav-left
- display: flex
- align-items: center
- flex: 0 0 auto

### nav-links
- display: flex
- gap: 32px
- align-items: center
- flex: 1
- direction: rtl

### nav-links > a
- font-size: 16px
- color: #d9d9d9
- text-decoration: none
- transition: color 300ms cubic-bezier(0.4, 0, 0.2, 1)
- padding: 8px 0

### nav-links > a:hover
- color: #ebebeb

### nav-right
- display: flex
- gap: 16px
- align-items: center
- position: relative

### dots-btn
- background: transparent
- border: 1px solid #888888
- border-radius: 8px
- padding: 8px 12px
- color: #ebebeb
- cursor: pointer
- font-size: 16px
- transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1)

### dots-btn:hover
- border-color: #ebebeb
- background: rgba(235, 235, 235, 0.05)

### nav-dropdown
- position: absolute
- top: calc(100% + 8px)
- right: 0
- background: #171717
- border: 1px solid #212121
- border-radius: 8px
- padding: 12px 0
- min-width: 200px
- box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3)
- display: none
- flex-direction: column
- z-index: 100

### nav-dropdown.active
- display: flex

### nav-dropdown > a
- padding: 12px 16px
- color: #d9d9d9
- text-decoration: none
- transition: background 200ms, color 200ms
- font-size: 14px

### nav-dropdown > a:hover
- background: rgba(235, 235, 235, 0.1)
- color: #ebebeb

### cta-btn
- background: transparent
- border: 1px solid #888888
- color: #ebebeb
- padding: 8px 16px
- border-radius: 8px
- font-size: 14px
- cursor: pointer
- transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1)

### cta-btn:hover
- border-color: #2151ff
- color: #2151ff
- box-shadow: 0 0 20px rgba(33, 81, 255, 0.3)

### profile-pic
- width: 40px
- height: 40px
- border-radius: 50%
- object-fit: cover

## States & Behaviors

### Dropdown Toggle
- **Trigger:** Click on dots-btn
- **State A (closed):** nav-dropdown display: none
- **State B (open):** nav-dropdown display: flex with fade-in animation
- **Animation duration:** 200ms
- **Easing:** ease-out
- **Close trigger:** Click outside dropdown or on another nav link
- **Implementation:** React useState hook with click event listeners

## Text Content
- "المقالات" → Articles link
- "الأعمال" → Works link
- "الخدمات" → Services link
- "المنتجات" → Products link
- "مصادر مجّانيّة" → Free Resources
- "البودكاست" → Podcast
- "التواصل" → Contact
- "الوضع الليّلي" → Dark Mode
- "ابدأ باستشارة" → Start Consultation

## Responsive Behavior
- **Desktop (1440px):** All items visible, flex layout
- **Tablet (768px):** Same as desktop
- **Mobile (390px):** Links stack or hide in hamburger menu, three-dot menu becomes main nav

## Assets
- Profile image: Real profile photo (to be downloaded from site)
- Icons: DotsIcon, CloseIcon from icons.tsx
