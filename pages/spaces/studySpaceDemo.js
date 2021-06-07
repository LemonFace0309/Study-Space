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
    },
  },
});

function TimeCard(props) {
  const theme = useTheme();

  return (
    <Paper elevate={10}>
      <Box
        bgcolor={theme.palette.primary.light}
        className="flex flex-col justify-center p-5 rounded-lg"
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
            <Box
              color={theme.palette.primary.dark}
            
            >
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
      <LinearProgress
        color='primary'
        variant="determinate"
        value={progress}
      />
    </div>
  );
}

export default function StudySpaceDemo() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Container className="w-5/12">
          <TimeCard />
        </Container>
      </Container>
    </ThemeProvider>
  );
}
