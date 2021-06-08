import React from "react";
import Timer from "../../components/Spaces/StudySpace/Timer";
import User from "../../components/Spaces/StudySpace/User";

import { Paper, Container, Box, Grid, Typography, LinearProgress, Avatar } from "@material-ui/core";
import {
  useTheme,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";


import VideocamOffIcon from "@material-ui/icons/VideocamOff";
import MicIcon from "@material-ui/icons/Mic";
import ChatIcon from "@material-ui/icons/Chat";
import PeopleIcon from "@material-ui/icons/People";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import CreateIcon from "@material-ui/icons/Create";
import SettingsIcon from "@material-ui/icons/Settings";


const theme = createMuiTheme({
  palette: {
    primary: {
      dark: "#614885",
      main: "#977BBF",
      medium: "#E5DDED",
      light: "#F5F2F9",
    },
    secondary: {
      main: "#8698A7",
      quit: "#F3858C",
    },
  },
});




export default function StudySpaceDemo() {
  // For the sake of the demo, we are using locally defined theme.
  // When using ThemeProvider, use the useTheme() hook.
  // const theme = useTheme();
  
  return (
    <ThemeProvider theme={theme}>
      <Grid className="grid grid-cols-12 space-y-24">
        <Box
          color={theme.palette.primary.dark}
          className="flex flex-row  rounded-full py-3 px-8 space-x-5 col-span-4"
        >
          <Box className="flex flex-row justify-start rounded-full border-2">
            <CreateIcon />
            <p className="font-bold uppercase tracking-tight">Session</p>
          </Box>
          <SettingsIcon />
        </Box>
        <Box className="col-span-4">
          <Timer />
        </Box>

        <Box
          color={theme.palette.secondary.quit}
          className="flex flex-row justify-start rounded-full border-2 col-span-4"
        >
          <p className="font-bold">Quit</p>
        </Box>
        <Box
          color={theme.palette.primary.dark}
          className="flex flex-row space-x-5  justify-start items-end col-span-2 px-8"
        >
          <VideocamOffIcon />
          <MicIcon />
        </Box>
        <Box className="col-span-8">
          <Grid className="grid grid-cols-6 ">
            <User /> <User /> <User /> <User /> <User /> <User />
            <User /> <User /> <User /> <User /> <User /> <User />
          </Grid>
        </Box>
        <Box
          color={theme.palette.primary.dark}
          className="flex flex-row space-x-5 justify-end items-end col-span-2 px-8"
        >
          <LibraryMusicIcon />
          <PeopleIcon />
          <ChatIcon />
        </Box>
      </Grid>
    </ThemeProvider>
  );
}
