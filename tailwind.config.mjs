/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f3ff',
          100: '#cce7ff',
          200: '#99ceff',
          300: '#66b6ff',
          400: '#339dff',
          500: '#0085ff',
          600: '#006acc',
          700: '#005099',
          800: '#003566',
          900: '#001b33'
        },
        success: {
          50: '#e6f9f0',
          100: '#ccf3e1',
          200: '#99e7c3',
          300: '#66dba5',
          400: '#33cf87',
          500: '#00c369',
          600: '#009c54',
          700: '#00753f',
          800: '#004e2a',
          900: '#002715'
        }
      }
    }
  },
  plugins: []
}