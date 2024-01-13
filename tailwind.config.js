/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      colors:{
        "mainBG":'#0D1117',
        "columnBG":'#161C22'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

