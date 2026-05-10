# moedesigns.io Page Topology

## Page Overview
- **Platform**: Framer (custom animations and carousels)
- **Language**: Arabic RTL
- **Total Height**: ~4555px
- **Fonts**: "itf Huwiya Arabic" (Regular, Medium)
- **Theme**: Dark mode (black/dark gray background with light text)

## Section Order (Top to Bottom)

### 1. Navigation Bar (Fixed Header)
- Position: Fixed top, RTL layout
- Height: ~80px
- Items (RTL): Logo | Nav Links (المقالات, الأعمال, الخدمات, المنتجات) | Three-dot menu | Profile photo
- Three-dot button opens dropdown with: مصادر مجّانيّة, البودكاست, التواصل, الوضع الليّلي
- CTA Button: "ابدأ باستشارة" (Start Consultation)
- Interactions: Sticky/fixed on scroll, dropdown toggle on three-dots click

### 2. Hero Section
- Height: ~600px
- Layout: Title + Subtitle + Three card navigation
- Large heading with custom font, responsive sizing
- Three cards below with:
  - Card 1: "ابدأ معي - احجز استشارة" (green accent)
  - Card 2: "المقالات - ١٥٠ مقال في بيع الخبرات"
  - Card 3: "اعمل معي - خدماتي والباقات"
- Each card has hover animation
- Background: Gradient or solid dark color
- Interaction Model: Scroll-triggered animations on entrance

### 3. Portfolio / Latest Works Section ("أحدث أعمالي")
- Type: Carousel (Framer slideshow, horizontal scroll)
- Height: ~400px
- Cards per row: 2 visible at 1440px, 1 at mobile
- Card content:
  - Background image with color overlay
  - Project title (RTL)
  - Project category tag (موقع تجاري, منصّة تدريبيّة)
  - Project type (e.g., Luniva, شارك - Coworking)
- Navigation: Previous/Next arrows
- Total items: 12-16 projects (repeating carousel)
- Colors: Warm browns, greens, creams as card backgrounds
- Interaction Model: Click navigation buttons to scroll carousel

### 4. Statistics Section
- Height: ~150px
- Layout: Multi-line centered text
- Content: "خلال ٧ سنوات ساعدت 80+ مؤسّس ليبدأ مشروعه في بيع الخبرات. عُملائي يشهدون بعائد استثمار يبدأ من 400%"
- Highlighted numbers: 7 سنوات, 80+, 400%
- Animation: Counter animations on scroll/load
- Text alignment: RTL centered

### 5. Clients/Logos Carousel Section
- Height: ~120px
- Type: Horizontal carousel with client logos
- Logos: Wfrah, McKinsey & Company, Mindvalley, RASF, and others
- Layout: Grid-like flow, repeating carousel
- Grayscale logos on dark background
- Interaction Model: Continuous auto-scroll or manual navigation

### 6. Service Description Section
- Height: ~150px
- Text: "تشمل خدماتي باقات في تأسيس المشروع أو المُساعدة في توسعته..."
- Link to Services page embedded
- Layout: Centered text with CTA link

### 7. Nashra.ai Promotion Section
- Height: ~300px
- Layout: Split screen or side-by-side
- Left side: 
  - Heading: "نشرتك البريديّة + مدوّنتك"
  - Subtext: "تواصل مع متابعينك مباشرة"
  - Features: "الاشتراك والتفاصيل", "تدعم الكتابة بالعربي", "صفحات هبوط"
  - Link: "تصميم محمّد الحكيم"
- Right side:
  - Large feature card with Nashra branding
  - Email subscription form with colorful input and CTA button
  - Colored gradient banner at top
- Colors: Orange, purple, blue gradient elements
- Interaction Model: Scroll-triggered entrance animations

### 8. Products Carousel Section ("أحدث المنتجات")
- Height: ~350px
- Type: Horizontal carousel (Framer slideshow)
- Cards per row: 3-4 visible at desktop
- Card content:
  - Product image/thumbnail
  - Category tag: "دورة مسجّلة", "دورة رقميّة", "كتيّب رقمي", "ورشة"
  - Price: $249, $199, $69, $35
  - Title: Product name in Arabic
- Product examples: "المنهجيّة في الكتابة الإعلانيّة", "دورة تصميم وبناء المواقع", "كتيّب استراتيجيّة البراند"
- Navigation: Previous/Next arrows + page dots
- Interaction Model: Click navigation or auto-scroll

### 9. Services/Categories Carousel Section
- Height: ~150px
- Type: Horizontal carousel with category pills/buttons
- Categories: البيع والتسعير, السوشال ميديا والإعلام, التسويق والتوسّع, الاستراتيجيّة والتمركز, بناء المشروع والمنتجات
- Layout: Repeating carousel, scrollable
- Interaction Model: Click to navigate or continuous scroll

### 10. Blog Articles Section ("آخر المقالات")
- Height: ~200px
- Layout: 5-6 article links in a list
- Article format: Heading only (no images)
- Example articles: "منهجيّتي لبيع الخدمات الأغلى", "٤ قِيَم", "تقرير: هل ما زال بيع الدورات مشروع مُربح"
- Interaction Model: Click to navigate to article

### 11. Video Gallery Section ("محتوى ومُقابلات")
- Height: ~300px
- Type: Carousel with video thumbnails
- Card content:
  - Video thumbnail (YouTube preview)
  - Play button overlay
  - Optional title/description
- Navigation: Previous/Next arrows
- Interaction Model: Click thumbnail to play (modal or embedded player)

### 12. CTA Section ("تبحث عن خدماتي؟")
- Height: ~200px
- Layout: Text + 2 buttons
- Content: Heading + Description paragraph
- Buttons:
  - "تواصل معي" (Contact Me)
  - "الخدمات والباقات" (Services & Packages)
  - "جميع الحلقات" (All Episodes - for Podcast)
- Interaction Model: Click to navigate to linked pages

### 13. Footer Section
- Height: ~300px
- Layout: Multiple columns with sections
- Sections:
  - Podcast heading + latest episodes link
  - Newsletter signup
  - Branding text: "Bali / Dubai"
  - Contact: hala@moedesigns.io
  - Links: Nashra newsletter, consultation booking
  - Social/brand integrations
- Interaction Model: Email form submission, link clicks

## Global Style Properties

### Color Palette
- Background: #0f0f0f (very dark), #1a1a1a (dark)
- Text primary: #ebebeb, #d9d9d9 (light gray)
- Accent: Orange (#ff7b0f), Blue (#2151ff)
- Card backgrounds: Browns (#8B6F47), Greens (#6b8a4a), Creams (#c4b7a0)
- Borders: rgba colors with low opacity

### Typography
- Font Family: "itf Huwiya Arabic" (Regular 400, Medium 500, Bold 600)
- Fallback: sans-serif
- H1: Large responsive sizing (clamp())
- H2: Medium sizing with light gray color
- P: Standard paragraph sizing, light gray color
- Links: Blue text (#0000ee), underlined on hover

### Spacing & Layout
- Container: RTL flexbox layout
- Gaps: 2rem, 3rem between sections
- Padding: 2rem for content sections
- Margin: Consistent vertical spacing

### Animations & Effects
- Scroll-triggered fade-in animations
- Carousel auto-advance with navigation controls
- Smooth transitions on hover (0.3s)
- Gradient overlays on carousel cards
- Blur effects on some backgrounds

## Key Interaction Patterns
1. **Carousel Navigation**: Framer slideshows with prev/next buttons and page indicators
2. **Scroll Animations**: Elements fade in and slide up as they enter viewport
3. **Hover Effects**: Cards scale slightly, buttons change color/shadow
4. **Form Submission**: Email input with validation
5. **Menu Toggle**: Three-dot dropdown for additional navigation
6. **Click Navigation**: Links throughout page route to different pages (./services, ./blog, ./products, etc.)
