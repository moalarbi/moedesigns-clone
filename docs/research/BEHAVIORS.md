# moedesigns.io Behaviors & Interactions

## Navigation Bar Behaviors

### Scroll Behavior
- **Initial State (scroll position 0)**: Fixed at top, normal appearance
- **Scrolled State (scroll > 0)**: No visible change detected, maintains fixed position
- **Sticky behavior**: Position: fixed, z-index: 50
- **Background**: Semi-transparent dark, may have backdrop blur on scroll

### Three-Dot Menu Toggle
- **Trigger**: Click on three-dot button (...)
- **Behavior**: Dropdown appears/disappears
- **Animation**: Smooth fade-in/out transition (~300ms)
- **Dropdown items**:
  1. مصادر مجّانيّة (Free Resources)
  2. البودكاست (Podcast)
  3. التواصل (Contact)
  4. الوضع الليّلي (Dark Mode)
- **Close trigger**: Click outside dropdown or on another menu item
- **Interaction Model**: Click-driven toggle

## Hero Section Behaviors

### Entrance Animation
- **Trigger**: Page load / scroll into viewport
- **Animation**: Elements fade in with slight slide-up (opacity: 0 → 1, transform translateY)
- **Duration**: ~600-800ms
- **Easing**: ease-out
- **Stagger**: Text elements appear in sequence (heading → subtitle → cards with ~100-150ms delays)

### Card Hover States
- **Trigger**: Hover over any of the three cards
- **Changes**:
  - Scale: 1 → 1.02 (subtle scale up)
  - Box-shadow: Increased shadow depth
  - Background opacity: Slight brightening
- **Duration**: ~300ms
- **Easing**: ease-out
- **Transition**: transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)

### Card Click Behavior
- **Cards are clickable links**: Navigate to different pages
  - Card 1 (green): ./consulting
  - Card 2: ./blog
  - Card 3: ./services

## Portfolio Carousel Section ("أحدث أعمالي")

### Carousel Type
- **Library**: Framer Slideshow (framer-slideshow-axis-x class)
- **Behavior**: Horizontal scrolling carousel with prev/next navigation
- **Visible items**: 2 at desktop (1440px), 1 at tablet/mobile
- **Auto-advance**: NO (user-driven navigation only)

### Navigation Controls
- **Prev button**: Left arrow button, navigates to previous slide(s)
- **Next button**: Right arrow button, navigates to next slide(s)
- **Click behavior**: Carousel animates to next/previous position
- **Animation duration**: ~500-600ms slide transition
- **Interaction Model**: Click-driven carousel

### Card Hover States
- **Trigger**: Hover over portfolio card
- **Changes**: 
  - Overlay opacity increases
  - Text becomes more visible
  - Shadow deepens
- **Duration**: ~300ms

### Carousel Loop Behavior
- **Visible items**: Carousel items repeat/loop (12 items shown multiple times)
- **Continuous carousel**: Can infinitely click through (likely wraps around)

## Statistics Section Behaviors

### Counter Animation
- **Trigger**: Scroll into viewport (IntersectionObserver at ~80% visible)
- **Animation**: Numbers animate up from 0 to target value
  - 7 (سنوات)
  - 80+ (مؤسّس)
  - 400% (return on investment)
- **Duration**: ~1-1.5s per counter
- **Easing**: ease-out
- **Stagger**: Each counter starts with slight delay (~100ms)
- **Interaction Model**: Scroll-driven with IntersectionObserver

## Global Scroll Behaviors

### Smooth Scroll
- **Detection**: Page uses smooth scrolling
- **Behavior**: Smooth easing transition when clicking internal anchor links

### Intersection Observer Usage
- **Detected on**: Hero section text, statistics counters, Nashra section content
- **Trigger threshold**: Likely 0.2-0.3 (element is 20-30% visible in viewport)
- **Root margin**: Possibly -30px or 0px
- **Repeat**: Animations don't repeat on scroll back up (fired once)

## Summary: Interaction Models by Section

| Section | Model | Trigger |
|---------|-------|---------|
| Navigation | Click-driven | Three-dot menu toggle, link clicks |
| Hero | Scroll-triggered entrance + click (cards) | Page load / scroll entry, card click |
| Portfolio Carousel | Click-driven | Prev/Next button clicks |
| Statistics | Scroll-triggered counter | IntersectionObserver (~30% visible) |
| Services Carousel | Click-driven | Category pill clicks |
| Video Gallery | Click-driven | Play button clicks, carousel nav |
| Blog Articles | Click-driven | Article link clicks |
| Footer/CTA | Click-driven | Button clicks, form submit |
