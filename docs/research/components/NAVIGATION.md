# Navigation Bar Component Specification

## Component Overview
Fixed header navigation bar with RTL layout, dropdown menu, and logo.

## Dimensions & Layout

### Container
- **Height**: 80px (fixed)
- **Width**: 100% (full viewport width)
- **Position**: Fixed top (`position: fixed`)
- **Z-Index**: 50
- **Direction**: RTL (`direction: rtl`)
- **Display**: Flex (`display: flex`)
- **Justify Content**: `space-between`
- **Align Items**: `center`
- **Padding**: 16px 32px (responsive: 12px 16px on mobile)

### Computed CSS Values
```css
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  width: 100%;
  background-color: rgba(15, 15, 15, 0.95); /* #0f0f0f with transparency */
  backdrop-filter: blur(8px);
  z-index: 50;
  direction: rtl;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  gap: 24px;
}
```

## Components

### Left Side (nav-right)
- **Layout**: Flex row, gap: 24px
- **Items**: 
  1. **Logo**: Text "محمّد الحكيم" or small logo image
     - Font: "itf Huwiya Arabic" Regular 400
     - Size: 16px
     - Color: #ebebeb
  2. **Nav Links**: المقالات, الأعمال, الخدمات, المنتجات
     - Layout: Flex row, gap: 32px
     - Font: 14px, Regular 400
     - Color: #ebebeb
     - Link styling: `color: #0000ee` on hover (blue)
     - Text decoration: None by default, underline on hover
     - Cursor: pointer
     - Transition: `color 300ms ease-out`

### Right Side (nav-left)
- **Layout**: Flex row, gap: 16px
- **Items**:
  1. **Three-Dot Menu Button** ("···")
     - Size: 24px × 24px
     - Background: Transparent
     - Border: 1px solid rgba(235, 235, 235, 0.3)
     - Border Radius: 8px
     - Color: #ebebeb
     - Font: 18px, bold
     - Cursor: pointer
     - Hover: Background color rgba(235, 235, 235, 0.1)
     - Transition: `all 300ms ease-out`
     - Click Handler: Toggle dropdown menu
  
  2. **Profile Photo**
     - Size: 48px × 48px
     - Border Radius: 50% (circular)
     - Object Fit: cover
     - Border: 2px solid rgba(235, 235, 235, 0.2)
     - Hover: Scale up slightly (1.05)
     - Transition: `transform 300ms ease-out`
  
  3. **CTA Button** ("ابدأ باستشارة")
     - Background: Transparent
     - Border: 1px solid rgba(235, 235, 235, 0.3)
     - Border Radius: 12px
     - Padding: 12px 24px
     - Font: 14px, Regular 400
     - Color: #ebebeb
     - Cursor: pointer
     - Hover: 
       - Background: rgba(235, 235, 235, 0.1)
       - Border Color: #ebebeb
       - Box Shadow: 0 4px 12px rgba(0, 0, 0, 0.2)
     - Transition: `all 300ms ease-out`
     - Click Action: Navigate to ./consulting

## Dropdown Menu Component

### Container
- **Position**: Absolute
- **Top**: 100% (below button)
- **Right**: 0 (RTL positioning)
- **Background**: rgba(26, 26, 26, 0.95)
- **Border**: 1px solid rgba(235, 235, 235, 0.1)
- **Border Radius**: 8px
- **Padding**: 8px 0
- **Min Width**: 200px
- **Box Shadow**: `0 8px 24px rgba(0, 0, 0, 0.4)`
- **Z-Index**: 100
- **Display**: None by default, `block` when active
- **Animation on open**: 
  - `opacity: 0 → 1`
  - `transform: scaleY(0.95) → 1`
  - Duration: 150ms
  - Easing: `cubic-bezier(0.4, 0, 0.2, 1)`

### Dropdown Items
- **Layout**: Vertical list
- **Each Item**:
  - **Padding**: 12px 24px
  - **Font**: 14px, Regular 400
  - **Color**: #ebebeb
  - **Hover**: 
    - **Background**: rgba(235, 235, 235, 0.1)
    - **Color**: #ffffff (brighten)
  - **Transition**: `all 150ms ease-out`
  - **Cursor**: pointer
  - **Border Bottom**: 1px solid rgba(235, 235, 235, 0.05) (between items)

### Dropdown Items Content
1. **مصادر مجّانيّة** (Free Resources)
   - Link target: ./resources (or similar)
2. **البودكاست** (Podcast)
   - Link target: ./podcast
3. **التواصل** (Contact)
   - Link target: ./contact
4. **الوضع الليّلي** (Night Mode)
   - Action: Toggle dark/light theme
   - Icon: Moon icon (optional)

## Responsive Behavior

### Tablet (641px - 1024px)
- Padding: 12px 20px
- Gap reduced: 16px instead of 24px
- Nav links gap: 20px instead of 32px
- Button/elements sized appropriately

### Mobile (390px - 640px)
- Padding: 12px 16px
- Nav links: Hidden (collapsed into hamburger)
- Hamburger icon appears instead of nav links
- CTA button: Text removed, icon only (optional)
- Profile photo: Smaller (40px × 40px)
- Three-dot menu: Still visible

## HTML Structure
```html
<nav class="nav">
  <div class="nav-right">
    <a href="./" class="nav-logo">محمّد الحكيم</a>
    <ul class="nav-links">
      <li><a href="./blog">المقالات</a></li>
      <li><a href="./works">الأعمال</a></li>
      <li><a href="./services">الخدمات</a></li>
      <li><a href="./products">المنتجات</a></li>
    </ul>
  </div>
  
  <div class="nav-left">
    <button class="nav-dots-btn" aria-label="Menu">···</button>
    <div class="nav-dropdown" id="dropdown">
      <a href="./resources">مصادر مجّانيّة</a>
      <a href="./podcast">البودكاست</a>
      <a href="./contact">التواصل</a>
      <button class="theme-toggle">الوضع الليّلي</button>
    </div>
    
    <img src="/images/profile.jpg" alt="Profile" class="nav-profile" />
    <a href="./consulting" class="nav-cta">ابدأ باستشارة</a>
  </div>
</nav>
```

## JavaScript Behaviors

### Dropdown Toggle
```javascript
const dotsBtn = document.querySelector('.nav-dots-btn');
const dropdown = document.querySelector('.nav-dropdown');

dotsBtn.addEventListener('click', () => {
  dropdown.classList.toggle('active');
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
  if (!dotsBtn.contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.classList.remove('active');
  }
});

// Close dropdown when item clicked
dropdown.querySelectorAll('a, button').forEach(item => {
  item.addEventListener('click', () => {
    dropdown.classList.remove('active');
  });
});
```

### Theme Toggle (if needed)
```javascript
const themeToggle = document.querySelector('.theme-toggle');
themeToggle.addEventListener('click', () => {
  document.documentElement.classList.toggle('dark-mode');
  localStorage.setItem('theme', document.documentElement.classList.contains('dark-mode') ? 'dark' : 'light');
});
```

## Accessibility Features

- **ARIA Labels**: `aria-label="Menu"` on dots button
- **Semantic HTML**: Use `<nav>`, `<a>`, `<button>` appropriately
- **Keyboard Navigation**: Tab order RTL, focus visible on all interactive elements
- **Focus Management**: Dropdown items focusable via keyboard
- **Screen Readers**: Links have descriptive text

## Assets Required

- Profile photo: `/public/images/profile.jpg` (48px × 48px minimum)
- Optional: Moon icon for theme toggle (`/public/images/moon-icon.svg`)

## Browser Support

- Modern browsers with CSS backdrop-filter support
- Fallback for older browsers: Solid background instead of blur
- RTL layout fully supported in all modern browsers

## Performance Notes

- Use hardware acceleration: `transform` for hover animations instead of `width`/`height` changes
- Debounce click handlers if needed
- Lazy load profile image if not critical path
