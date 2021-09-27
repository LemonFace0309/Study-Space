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
    screens: {
      // matches MUI's v4.0 defaults
      sm: '600px',
      md: '960px',
      lg: '1280px',
      xl: '1920px',
      '2xl': '9000px',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
