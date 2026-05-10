/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0f0f0f',
        'card-dark': '#171717',
        'card-medium': '#212121',
        'card-light': '#2a2a2a',
        'text-primary': '#ebebeb',
        'text-secondary': '#d9d9d9',
        'text-muted': '#888888',
        'accent-blue': '#2151ff',
        'accent-orange': '#ff7b0f',
        'accent-green': '#3ecf5c',
      },
      fontFamily: {
        arabic: ['"IBM Plex Sans Arabic"', 'sans-serif'],
      },
      fontSize: {
        'hero': 'clamp(36px, 4.6vw, 62px)',
        'section': 'clamp(24px, 3vw, 40px)',
        'card-title': 'clamp(18px, 2.2vw, 28px)',
        'body': 'clamp(14px, 1.2vw, 18px)',
      },
      backgroundImage: {
        'glow-blue': 'radial-gradient(ellipse at 50% 0%, rgba(33,81,255,0.15) 0%, transparent 70%)',
        'glow-orange': 'radial-gradient(ellipse at 100% 50%, rgba(255,123,15,0.1) 0%, transparent 60%)',
        'gradient-card': 'linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.8) 100%)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        scrollLeft: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease forwards',
        'slide-up': 'slideUp 0.7s ease forwards',
        'slide-right': 'slideRight 0.7s ease forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'scroll-left': 'scrollLeft 30s linear infinite',
      },
    },
  },
  plugins: [],
};
