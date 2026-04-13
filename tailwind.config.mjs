/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        kailash: {
          dark: '#1a1a2e',
          gold: '#d4a574',
          light: '#f5f5f0',
          accent: '#c9a86c'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'serif']
      }
    }
  },
  plugins: []
};