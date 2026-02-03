/* eslint-disable global-require */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': {
            transform: 'rotate(-6deg)',
          },
          '50%': {
            transform: 'rotate(6deg)',
          },
        },
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
