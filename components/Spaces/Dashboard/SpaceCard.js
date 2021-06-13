import React from "react";
import { Paper, Box, Typography } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

// Icons
import VideocamOffIcon from "@material-ui/icons/VideocamOff";
import MicIcon from "@material-ui/icons/Mic";
import ChatIcon from "@material-ui/icons/Chat";
import PeopleIcon from "@material-ui/icons/People";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";


export default function SpaceCard(props) {
  const theme = useTheme();
  const { spaceName, description, headCount, music } = props;
  return (
    <Paper className="rounded-xl">
      <Box className="flex flex-grow justify-between ">
        <Box color={theme.palette.primary.dark} className="text-left p-3">
          <Typography variant="h5" align="center">
            {spaceName}
          </Typography>
          <Typography color="textSecondary" variant="body1">
            {description}
          </Typography>
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
        className="flex flex-row text-sm rounded-bl-xl rounded-br-xl p-2 space-x-2"
      >
        <Box>
          <PeopleIcon />
          {headCount}
        </Box>
        <Box>
          <LibraryMusicIcon />
          {music}
        </Box>
      </Box>
    </Paper>
  );
}
