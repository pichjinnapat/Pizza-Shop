const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      primary: '#FCE457',
      secondary: '#ED932A',
      black: colors.black,
      white: colors.white,
      gray: colors.trueGray,
      indigo: colors.indigo,
      red: colors.red,
      yellow: colors.amber,
      blue: colors.blue,
      purple: colors.purple,
      rose: colors.rose,
      orange: colors.orange,
    },
    animation: {
      'spin-slow': 'spin 3s linear infinite',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
