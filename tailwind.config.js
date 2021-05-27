module.exports = {
  purge: ["./pages/**/*.js", "./components/**/*.js"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    grey: {
      darkest: "#251C37",
      dark: "#616161",
      med: "#999999",
      light: "#C4C4C4",
    },
    purple: {
      dark: "#4E3276",
      med: "#977BBF",
      light: "#BDACD4",
    },
    pink: {
      med: "E3BAC6",
      light: "FAF3F5",
    },
    blue: {
      grey: "607D8B",
      dark: "324976",
      med: "7BA7BF",
      light: "A3C6D9",
    },
    green: {
      DEFAULT: "BDE3BA",
    },
    red: {
      DEFAULT: "EF5D66",
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
