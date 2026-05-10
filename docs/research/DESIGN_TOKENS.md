# Design Tokens for moedesigns.io Clone

## Color Tokens

### Backgrounds
- **Primary Background**: `#0f0f0f` (rgb(15, 15, 15))
- **Secondary Background**: `#1a1a1a` (rgb(26, 26, 26))
- **Card Background (Dark)**: `#171717` (rgb(23, 23, 23))
- **Card Background (Medium)**: `#212121` (rgb(33, 33, 33))

### Text Colors
- **Text Primary (Light)**: `#ebebeb` (rgb(235, 235, 235))
- **Text Secondary**: `#d9d9d9` (rgb(217, 217, 217))
- **Text Tertiary**: `#c1c1c1` (rgb(193, 193, 193))
- **Text Muted**: `#888888` (rgb(136, 136, 136))

### Accent Colors
- **Blue**: `#2151ff` (rgb(33, 81, 255))
- **Orange**: `#ff7b0f` (rgb(255, 123, 15))
- **Green**: `#3ecf5c` (rgb(62, 207, 92))

### Card Overlay Colors (Portfolio Section)
- **Brown**: `#8B6F47` (semi-transparent with gradient)
- **Green**: `#6b8a4a` (semi-transparent)
- **Cream**: `#c4b7a0` (semi-transparent)
- **Tan**: `#d4a574` (semi-transparent)

### Semantic Colors
- **Link**: `#0000ee` (rgb(0, 0, 238)) - standard link blue
- **Button Hover**: Changes opacity and box-shadow
- **Border**: `rgba(255, 255, 255, 0.1)` (subtle light border)
- **Divider**: `rgba(255, 255, 255, 0.05)`

## Typography Tokens

### Font Family
- **Primary**: "itf Huwiya Arabic", "itf Huwiya Arabic Regular Placeholder", sans-serif
- **Medium Weight**: "itf Huwiya Arabic Medium", "itf Huwiya Arabic Medium Placeholder", sans-serif
- **Fallback**: sans-serif

### Font Weights
- **Light**: 300
- **Regular**: 400
- **Medium**: 500
- **Bold**: 600
- **Extra Bold**: 700

### Font Sizes (with responsive clamp values)
- **H1 (Hero Title)**: `clamp(36px, 4.6vw, 62px)`
- **H2 (Section Heading)**: `clamp(24px, 3vw, 40px)`
- **H3 (Card Title)**: `clamp(18px, 2.2vw, 28px)`
- **Body (P)**: `clamp(14px, 1.2vw, 18px)`
- **Small**: `clamp(12px, 1vw, 16px)`

### Line Heights
- **Tight**: 1.2
- **Normal**: 1.5
- **Relaxed**: 1.8
- **Loose**: 2

### Letter Spacing
- **Normal**: 0
- **Wide**: 0.05em
- **Wider**: 0.1em

## Spacing Tokens

### Padding
- **XS**: 8px
- **SM**: 12px
- **MD**: 16px
- **LG**: 24px
- **XL**: 32px
- **2XL**: 48px

### Gaps (flexbox/grid)
- **SM**: 8px
- **MD**: 16px
- **LG**: 24px
- **XL**: 32px
- **2XL**: 48px

### Margins
- **Section Vertical**: 48px - 64px
- **Block Vertical**: 24px - 32px

## Border Radius Tokens
- **SM**: 4px
- **MD**: 8px
- **LG**: 12px
- **XL**: 16px
- **Full**: 9999px (rounded pills)
- **Card**: 12px - 16px (portfolio cards)

## Box Shadow Tokens
- **None**: none
- **Subtle**: `0 2px 4px rgba(0, 0, 0, 0.1)`
- **Medium**: `0 4px 12px rgba(0, 0, 0, 0.2)`
- **Large**: `0 8px 24px rgba(0, 0, 0, 0.3)`
- **Glow**: `0 0 20px rgba(33, 81, 255, 0.3)` (blue glow for buttons)
- **Card Hover**: `0 12px 32px rgba(0, 0, 0, 0.4)`

## Backdrop & Blur Effects
- **Blur Small**: `blur(4px)`
- **Blur Medium**: `blur(8px)`
- **Blur Large**: `blur(12px)`
- **Backdrop Blur**: `backdrop-filter: blur(8px)`
- **Backdrop Saturation**: `backdrop-filter: saturate(1.2)`

## Gradient Tokens

### Background Gradients
- **Dark Fade**: `linear-gradient(180deg, rgba(15, 15, 15, 0.8) 0%, rgba(15, 15, 15, 0.4) 100%)`
- **Orange to Transparent**: `linear-gradient(90deg, #ff7b0f 0%, transparent 100%)`
- **Blue Accent**: `linear-gradient(135deg, #2151ff 0%, #ff7b0f 100%)`
- **Card Overlay**: `linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.8) 100%)`

### Product Card Gradients
- **Warm**: `linear-gradient(135deg, #f5deb3 0%, #d2b48c 100%)`
- **Soft Green**: `linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)`
- **Peach**: `linear-gradient(135deg, #ffe0b2 0%, #ffcc80 100%)`

## Animation Tokens

### Durations
- **Fast**: 150ms
- **Base**: 300ms
- **Slow**: 500ms
- **Slower**: 800ms

### Easing Functions
- **Linear**: `linear`
- **EaseInOut**: `cubic-bezier(0.4, 0, 0.2, 1)`
- **EaseOut**: `cubic-bezier(0.0, 0, 0.2, 1)`
- **EaseIn**: `cubic-bezier(0.4, 0, 1, 1)`
- **Spring**: `cubic-bezier(0.68, -0.55, 0.265, 1.55)`

### Keyframe Animations

#### Fade In
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

#### Slide Up
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

#### Scale Up
```css
@keyframes scaleUp {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

#### Pulse
```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
```

## Transition Tokens

### Standard Transitions
- **Color**: `transition: color 300ms cubic-bezier(0.4, 0, 0.2, 1)`
- **Background**: `transition: background 300ms cubic-bezier(0.4, 0, 0.2, 1)`
- **Transform**: `transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1)`
- **All**: `transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1)`
- **Opacity**: `transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1)`

## Viewport Breakpoints
- **Mobile**: 320px - 640px
- **Tablet**: 641px - 1024px
- **Desktop**: 1025px - 1440px
- **Wide**: 1441px and above

## RTL Direction
- **Direction**: `direction: rtl`
- **Text Alignment**: Default RTL (right-aligned text)
- **Flexbox**: `flex-direction: row` (naturally inverted due to RTL)
- **Margin/Padding**: Use logical properties or separate RTL rules

## Overlay Effects
- **Dark Overlay**: `background: rgba(0, 0, 0, 0.4)`
- **Dark Overlay (Strong)**: `background: rgba(0, 0, 0, 0.7)`
- **Gradient Overlay**: Uses gradient tokens above

## Z-Index Scale
- **Dropdown**: 100
- **Modal**: 200
- **Tooltip**: 300
- **Notification**: 400
- **Fixed Header**: 50
