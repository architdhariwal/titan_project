/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        "titan-bg-theme": "#fdfaf5",
        "titan-theme-dark": "#c48d35"
      },
    },
  },
  plugins: [],
};
