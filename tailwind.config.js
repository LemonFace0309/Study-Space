module.exports = {
  purge: ["./pages/**/*.js", "./components/**/*.js"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    gradientColorStops: (theme) => ({
      ...theme("colors"),
      primary: "#4e3276",
      secondary: "#bdacd4",
    }),
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
