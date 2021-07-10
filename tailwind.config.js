module.exports = {
  purge: ['./pages/**/*.js', './components/**/*.js'],
  darkMode: false, // or 'media' or 'class'
  important: true,
  theme: {
    extend: {
      inset: {
        '4/5': '80%',
        '9/10': '90%',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
