import React from "react";
import SpaceCard from "../../components/Dashboard/Cards/SpaceCard";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import { spaceCardTestData } from "../../data/spaceCardTestData";

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

  const { cardData } = spaceCardTestData;

  return (
    <ThemeProvider theme={theme}>
      <div className="flex flex-row space-x-5">
        {cardData.map((data) => {
          let { spaceName, description, headCount, music } = data;

          return (
            <div className="cursor-pointer transform hover:scale-110 transition ease-out duration-200">
              <SpaceCard
                spaceName={spaceName}
                description={description}
                headCount={headCount}
                music={music}
              />
            </div>
          );
        })}
      </div>
    </ThemeProvider>
  );
}
