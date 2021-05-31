import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme({
  palette: {
    primary: {
      light: "#BDACD4",
      main: "#977BBF",
      dark: "#4E3276",
      contrastText: "#fff",
    },
    secondary: {
      light: "#FAF3F5",
      main: "#E3BAC6",
      contrastText: "#000",
    },
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
