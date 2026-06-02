/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          turquoise: '#00A6A6',
          deep: '#007C7C',
          light: '#E6FAF8',
          text: '#1F2933',
          gray: '#F5F7FA',
          accent: '#F4B860',
          cream: '#FFF8EC',
          green: '#4E8F5B',
        },
      },
      boxShadow: {
        brand: '0 18px 45px rgba(0, 166, 166, 0.12)',
      },
    },
  },
  plugins: [],
}
