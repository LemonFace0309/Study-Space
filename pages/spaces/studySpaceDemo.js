import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";

import { Paper, Container, Box, Typography } from "@material-ui/core";
import { useTheme, createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
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
      light: "#F5F2F9",
    },
    secondary: {
      main: "#f44336",
    },
  },
});

function TimeCard(props) {
  const theme = useTheme();

  return (
    <Paper className={`flex flex-col`}>
      <Box className="flex flex-grow justify-between ">
        <Box color={theme.palette.primary.dark} className="text-left p-3">
          <h2 className="text-xl">{props.spaceName}</h2>
          <p className="text-sm text-gray-500">{props.description}</p>
        </Box>

        <Box
          color={theme.palette.primary.main}
          className=" flex items-center justify-center flex-col m-1 bg-opacity-30"
        >
          <VideocamOffIcon />
          <MicIcon />
          <ChatIcon />
        </Box>
      </Box>

      <Box
        bgcolor={theme.palette.primary.light}
        color={theme.palette.primary.main}
        className="flex flex-row text-sm rounded-xl p-2 space-x-2"
      >
        <Box>
          <PeopleIcon />
          {props.headCount}
        </Box>
        <Box>
          <LibraryMusicIcon />
          {props.music}
        </Box>
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
    <div >
      <LinearProgress variant="determinate" value={progress} />
    </div>
  );
}

export default function StudySpaceDemo() {
    return (
        <LinearDeterminate/>
    );
}

