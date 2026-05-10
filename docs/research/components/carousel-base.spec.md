# Carousel Component (Reusable Base)

## Overview
- **Target file:** `src/components/Carousel.tsx`
- **Interaction model:** Click-driven navigation

## Computed Styles

### carousel-container
- display: flex
- flex-direction: column
- gap: 24px
- width: 100%

### carousel-slides
- display: flex
- gap: 24px
- transition: transform 500ms cubic-bezier(0.4, 0, 0.2, 1)
- direction: rtl

### carousel-controls
- display: flex
- align-items: center
- justify-content: space-between
- gap: 16px

## States & Behaviors
- Click prev/next buttons to navigate
- Smooth 500ms slide transition
- Infinite loop carousel
- Responsive: 3-4 items desktop, 1 mobile
