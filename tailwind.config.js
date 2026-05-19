/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        wood: { DEFAULT: '#4CAF50', light: '#81C784', dark: '#2E7D32' },
        fire: { DEFAULT: '#F44336', light: '#EF5350', dark: '#C62828' },
        earth: { DEFAULT: '#FFC107', light: '#FFD54F', dark: '#FF8F00' },
        metal: { DEFAULT: '#FFD700', light: '#FFE082', dark: '#F57F17' },
        water: { DEFAULT: '#2196F3', light: '#64B5F6', dark: '#1565C0' },
        yin: { DEFAULT: '#9C27B0', light: '#CE93D8', dark: '#6A1B9A' },
        yang: { DEFAULT: '#FF9800', light: '#FFB74D', dark: '#E65100' },
        bazi: {
          dark: '#1a1a2e',
          card: '#16213e',
          accent: '#e94560',
          gold: '#d4af37',
          cream: '#f5f0e8',
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
