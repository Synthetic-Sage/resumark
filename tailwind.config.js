/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        // Onyx Black & Terracotta Palette
        brand: {
          50: '#fdf8f6',
          100: '#f2e8e5',
          200: '#eaddd8',
          300: '#e0cec7',
          400: '#d2bab1',
          500: '#c5a396', // Terracotta Light
          600: '#b78b7a', // Terracotta Base
          700: '#9d6b59', // Terracotta Dark
          800: '#845344',
          900: '#704336',
          950: '#3d2018',
        },
        onyx: {
          50: '#f4f4f5',
          100: '#e4e4e7',
          200: '#d4d4d8',
          300: '#a1a1aa',
          400: '#71717a',
          500: '#52525b',
          600: '#3f3f46',
          700: '#27272a',
          800: '#18181b', // Onyx Base
          900: '#09090b', // Onyx Dark
          950: '#000000',
        }
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'glow': '0 0 20px rgba(183, 139, 122, 0.15)',
      }
    },
  },
  plugins: [],
}
