import React from "react";
import Timer from "../../components/Spaces/StudySpace/Timer";
import User from "../../components/Spaces/StudySpace/User";

import { Container, Box, Grid, Button, Typography } from "@material-ui/core";
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
      <Container className="mt-10">
        <Grid container className="grid grid-cols-12">
          <Grid
            item
            color={theme.palette.primary.dark}
            className="flex flex-row  rounded-full space-x-5 col-span-4"
          >
            <Box >
              <Button
                variant="outlined"
                className="flex flex-row justify-start rounded-full  outline-none"
              >
                <CreateIcon />
                <Typography variant="body1" className="uppercase">
                  Session
                </Typography>
              </Button>
            </Box>
            <SettingsIcon />
          </Grid>

          <Grid item className="col-span-4">
            <Container className="mb-24">
              <Timer />
            </Container>
          </Grid>

          <Grid
            item
            className="flex flex-row justify-end items-start col-span-4"
          >
            <Button
              color="secondary"
              variant="outlined"
              className="rounded-full  outline-none"
            >
              <Typography variant="body1" className="uppercase">
                Quit
              </Typography>
            </Button>
          </Grid>

   
          <Grid item className="flex justify-start items-end col-span-2 px-8 ">
            <Box
              color={theme.palette.primary.dark}
              className="flex flex-row space-x-5 "
            >
              <VideocamOffIcon />
              <MicIcon />
            </Box>
          </Grid>

          {/* MUI grid can be an item AND a container. */}
          <Grid item container className="col-span-8">
            <Container className="mb-24">
              <Grid className="grid grid-cols-6 ml-5 space-x-5 space-y-5 ">
                <div className="mt-5 ml-5">
                  <User />
                </div>
                <User /> <User /> <User /> <User /> <User />
                <User /> <User /> <User /> <User /> <User /> <User />
              </Grid>
            </Container>
          </Grid>
          <Grid item className="flex justify-end items-end col-span-2 px-8 ">
            <Box
              color={theme.palette.primary.dark}
              className="flex flex-row space-x-5 "
            >
              <LibraryMusicIcon />
              <PeopleIcon />
              <ChatIcon />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
