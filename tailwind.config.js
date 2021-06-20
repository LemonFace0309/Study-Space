module.exports = {
  purge: ["./pages/**/*.js", "./components/**/*.js"],
  darkMode: false, // or 'media' or 'class'
  important: true,
  theme: {
    extend: {
      colors : {
        primary : {
          dark:"#4E3276",
          main:"#977BBF",
          medium_light:"#E5DDED",
          light:"#F5F2F9",
          text:"#999999"
        },
        secondary: {
          main:"#EF5D66"
        }
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
