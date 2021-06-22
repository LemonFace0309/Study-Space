import React from "react";
import BigSpaceCard from "../../components/Dashboard/Cards/BigSpaceCard";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      dark: "#614885",
      main: "#977BBF",
      light: "#F5F2F9",
      text: "#8BA0AB",
    },
    secondary: {
      main: "#f44336",
    },
  },
});

export default function SpaceCardDemo() {
  // For the sake of the demo, we are using locally defined theme.
  // When using ThemeProvider, use the useTheme() hook.
  // const theme = useTheme();

  return (
    <ThemeProvider theme={theme}>
      <div className="flex flex-row space-x-5">
        <div className="cursor-pointer transform hover:scale-110 transition ease-out duration-200">
          <BigSpaceCard
            title="Create a Space"
            description="Insert some sort of tagline or feature description"
            startColor="purple-900"
            endColor="purple-800"
            textColor="gray-100"
          />
        </div>

        <div className="cursor-pointer transform hover:scale-110 transition ease-out duration-200">
          <BigSpaceCard
            title="Join a Space"
            description="Insert some sort of tagline, fact, or productivity tips here"
            startColor="purple-100"
            endColor="white-400"
            textColor="purple-900"
          />
        </div>
      </div>
    </ThemeProvider>
  );
}
