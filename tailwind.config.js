const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        'swing': {
          '0%,100%' : { transform: 'rotate(15deg)' },
          '50%' : { transform: 'rotate(-15deg)' },
        }
      },
      animation: {
        'swing': 'swing 1s infinite'
      }
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
  ]
}