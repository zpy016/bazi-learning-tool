/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        wx: {
          wood: 'var(--wx-wood)',
          fire: 'var(--wx-fire)',
          earth: 'var(--wx-earth)',
          metal: 'var(--wx-metal)',
          water: 'var(--wx-water)',
        },
        bazi: {
          bg: 'var(--bazi-bg)',
          card: 'var(--bazi-card)',
          surface: 'var(--bazi-surface)',
          text: 'var(--bazi-text)',
          'text-secondary': 'var(--bazi-text-secondary)',
          'text-muted': 'var(--bazi-text-muted)',
          accent: 'var(--bazi-accent)',
          border: 'var(--bazi-border)',
        }
      },
      fontFamily: {
        serif: ['"Noto Serif SC"', 'Georgia', 'serif'],
        sans: ['"Noto Sans SC"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'flip': 'flip 0.6s ease-in-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        flip: {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(180deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
