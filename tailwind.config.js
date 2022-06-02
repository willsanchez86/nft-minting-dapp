const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        coiny: ['Coiny', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'brand-black': 'var(--clr-black)',
        'brand-charcoal': 'var(--clr-charcoal)',
        'brand-dark-maroon': 'var(--clr-dark-maroon)',
        'brand-maroon': 'var(--clr-maroon)',
        'brand-red': 'var(--clr-red)',
        'brand-light-red': 'var(--clr-light-red)',
        'brand-dark-grey': 'var(--clr-dark-grey)',
        'brand-grey': 'var(--clr-grey)',
        'brand-light-grey': 'var(--clr-light-grey)',
        'brand-white': 'var(--clr-white)',
      },
    },
  },
  plugins: [require('daisyui')],
};
