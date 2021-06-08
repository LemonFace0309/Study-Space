import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme({
  palette: {
    primary: {
      // purple
      light: "#BDACD4",
      main: "#977BBF",
      dark: "#4E3276",
      contrastText: "#fff", // white
    },
    secondary: {
      // pink
      light: "#FAF3F5",
      main: "#E3BAC6",
      contrastText: "#000", // black
    },
    error: {
      // red
      main: "#EF5D66",
    },
    /* causes error so I'm leaving it out for now
    success: {
      // green
      main: "1DD1A1",
    }, */
    action: {
      hover: "#BDACD4",
    },
  },
  typography: {
    subtitle1: {
      fontWeight: 500,
      fontSize: "20px",
    },
    subtitle2: {
      fontWeight: 500,
      fontSize: "14px",
    },
    h3: {
      fontWeight: 300,
    },
    body1: {
      color: "#FFF",
    },

    allVariants: {
      color: "#BDACD4",
    },
  },

  button: {
    backgroundColor: "transparent",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#977BBF",
      color: "#fff",
    },
  },
});
