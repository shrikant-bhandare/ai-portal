/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#377cc7',
          green: '#0de39b',
          dark: '#0A1628',
          card: '#1A2737',
          'card-hover': '#1E2E42'
        }
      }
    },
  },
  plugins: [],
};