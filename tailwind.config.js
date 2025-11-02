/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enable dark mode using a class
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
     extend: {
      colors: {
        // Refined 'brand' colors for your base theme
        brand: {
          pink: '#ec4899',
          'pink-light': '#fce7f3',
          // VIBRANT PINKS (kept from before, can be used as an accent)

          // DEEPER & RICHER DARK THEME
          dark: '#0B1120',           // Deep Navy - for the main background
          'dark-secondary': '#161E31', // Lighter Navy - for cards and surfaces

          // CLEAN LIGHT THEME (remains the same)
          light: '#f8fafc',
          'light-secondary': '#ffffff',
        },
        'theme-primary': 'var(--theme-primary)',
        'theme-secondary': 'var(--theme-secondary)',
      },
      keyframes: {
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.5s ease-out',
      },
    },
  },
  plugins: [],
};