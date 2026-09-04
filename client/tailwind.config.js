/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        nexcent: {
          green: '#4CAF4F',
          'green-dark': '#388E3C',
          'green-light': '#E8F5E9',
          silver: '#F5F7FA',
          slate: '#263238',
          heading: '#4D4D4D',
          body: '#717171',
          muted: '#89939E',
          border: '#E4E7EB',
          white: '#FFFFFF',
        },
        forest: {
          darkest: '#062d14',
          dark: '#083d1c',
          main: '#0b4d26',
          card: '#115e30',
          elevated: '#16703b',
          border: '#1e8247',
        },
        gold: {
          400: '#ffd033',
          500: '#ffc72c',
          600: '#fab818',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      }
    },
  },
  plugins: [],
}
