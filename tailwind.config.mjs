/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        kailash: {
          dark: '#0F0E0D',
          gold: '#B8956A',
          light: '#F8F6F3',
          accent: '#A67B5B',
          warm: '#C9A87C',
          cream: '#E8E0D5',
          stone: '#2A2826',
          'gold-dark': '#7A5A24'
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