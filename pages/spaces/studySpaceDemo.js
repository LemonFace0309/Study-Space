import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";

import { Paper, Container, Box, Grid, Typography } from "@material-ui/core";
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

import Avatar from "@material-ui/core/Avatar";
import PersonIcon from "@material-ui/icons/Person";

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

function TimeCard(props) {
  const theme = useTheme();

  return (
    <Paper elevate={10} className="rounded-3xl">
      <Box
        bgcolor={theme.palette.primary.light}
        className="flex flex-col justify-center p-5 rounded-3xl"
      >
        <Grid className="grid grid-cols-1">
          <Box
            color={theme.palette.secondary.main}
            bgcolor={theme.palette.primary.medium}
            className="text-center text-md uppercase tracking-tight font-bold rounded-lg w-11/12 p-3 m-2 "
          >
            Almost there! Take a break in
          </Box>

          <Container className="flex flex-col text-center justify-between ">
            <Box
              color={theme.palette.primary.dark}
              className="text-6xl uppercase tracking-widest font-semibold"
            >
              01:15
            </Box>
            <Box
              color={theme.palette.secondary.main}
              className="flex flex-row justify-between m-auto space-x-10 text-sm uppercase tracking-tight font-semibold"
            >
              <h3>Hour</h3>
              <h3>Minutes</h3>
            </Box>
          </Container>

          <Container className="flex flex-col text-center justify-between ">
            <Box color={theme.palette.primary.dark}>
              <LinearDeterminate />
            </Box>
            <Box
              color={theme.palette.secondary.main}
              className="flex flex-row justify-between text-sm tracking-tight font-semibold"
            >
              <h3>12:10 pm</h3>
              <h3>2:30 pm</h3>
            </Box>
          </Container>
        </Grid>
      </Box>
    </Paper>
  );
}

function LinearDeterminate() {
  const [progress, setProgress] = React.useState(70);

  //   React.useEffect(() => {
  //     const timer = setInterval(() => {
  //       setProgress((oldProgress) => {
  //         if (oldProgress === 100) {
  //           return 0;
  //         }
  //         const diff = Math.random() * 10;
  //         return Math.min(oldProgress + diff, 100);
  //       });
  //     }, 500);

  //     return () => {
  //       clearInterval(timer);
  //     };
  //   }, []);

  return (
    <div>
      <LinearProgress color="primary" variant="determinate" value={progress} />
    </div>
  );
}

function User() {
    const theme = useTheme();
    return (
      <Paper elevate={10} className="rounded-lg">
        <Box
          bgcolor={theme.palette.primary.light}
          color={theme.palette.primary.dark}
          className="flex flex-col justify-center items-center p-5 rounded-lg w-full h-full"
        >
          <Avatar>
            <PersonIcon />
          </Avatar>
          <p className="font-bold">Jimmy &#40;Host&#41;</p>
        </Box>
      </Paper>
    );
}
export default function StudySpaceDemo() {
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
          <TimeCard />
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
