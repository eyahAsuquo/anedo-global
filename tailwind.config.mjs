/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f7f5f0',
          100: '#e8e2d3',
          200: '#d4c9ad',
          300: '#bfad84',
          400: '#ad9563',
          500: '#9c814a',
          600: '#836a3d',
          700: '#6a5433',
          800: '#5a4730',
          900: '#4e3d2c',
          950: '#2b2117',
        },
        tile: {
          50: '#f4f7f6',
          100: '#e3eae6',
          200: '#c6d5cd',
          300: '#a2b9ae',
          400: '#7d9b8d',
          500: '#618072',
          600: '#4c675b',
          700: '#3f534a',
          800: '#35443d',
          900: '#2e3a35',
          950: '#171e1b',
        },
        door: {
          50: '#faf7f4',
          100: '#f2ece2',
          200: '#e4d7c3',
          300: '#d2bc9c',
          400: '#c09e74',
          500: '#b28a59',
          600: '#a5794d',
          700: '#8a6341',
          800: '#705038',
          900: '#5c4331',
          950: '#302218',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'slide-down': 'slideDown 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
