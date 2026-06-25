import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Sleek Premium Theme (Obsidian/Zinc neutral dark, avoiding blue 'AI slop')
        navy: { // Kept 'navy' name for codebase compatibility, but colors are now Neutral Charcoal
          900: '#121212', // Eerie Black
          800: '#18181B', // Zinc 900
          700: '#27272A', // Zinc 800
          600: '#3F3F46', // Zinc 700
          500: '#52525B', // Zinc 600
          400: '#A1A1AA', // Zinc 400
          100: '#FAFAFA', // Neutral 50
        },
        game: {
          contradiction: '#EF4444', // Red-500
          correlation: '#10B981',   // Emerald-500
          context: '#F59E0B',       // Amber-500
          irrelevant: '#71717A',    // Zinc-500
          weak: '#8B5CF6',          // Violet-500
          accent: '#E11D48',        // Elegant Crimson/Rose instead of generic Blue
          warm: '#F97316',          // Orange-500
        },
      },
      fontFamily: {
        body: ['Plus Jakarta Sans', 'sans-serif'],
        heading: ['Playfair Display', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
