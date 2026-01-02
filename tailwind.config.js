/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    colors: {
      white: '#fafafa',
      black: '#111111',
      'bubble-gum': '#ff77e9',
    },
    fontFamily: {
      display: ['HalyardDisplayMedium', 'sans-serif'],
      text: ['HalyardTextMedium', 'sans-serif'],
    },
    extend: {
      /*animation: {
        slideright: 'slideright 1s ease-in-out once',
      },
      keyframes: {
        slideright: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(8.33%)' },
        }
      }*/
    },
    plugins: [require('daisyui'), require('@tailwindcss/typography')],
  },
}
