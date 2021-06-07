import React from "react";
import SpacesCard from "../../components/SpacesCard";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      dark: "#614885",
      main: "#977BBF",
      light: "#F5F2F9",
    },
    secondary: {
      main: "#f44336",
    },
  },
});

export default function SpacesCardDemo() {
  return (
    <ThemeProvider theme={theme}>
      <div className="flex flex-row space-x-5">
        <div className="cursor-pointer transform hover:scale-110 transition ease-out duration-200">
          <SpacesCard
            spaceName="UW Math 2025"
            description="finals grind, upper years available in chat for help with past exams"
            headCount="17"
            music="lofi 2"
          />
        </div>
        <SpacesCard
          spaceName="Capstone Grind '25"
          description="writing your report, making your presentation, setting up data"
          headCount="23"
          music="cafe beats eng edition F21"
        />
        <SpacesCard
          spaceName="UW Math 2025"
          description="3rd and 4th years offering help in MSCI, GENE, MATH, and CS"
          headCount="8"
          music="none"
        />
      </div>
    </ThemeProvider>
  );
}
