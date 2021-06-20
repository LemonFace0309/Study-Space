import React from "react";
import { Paper, Box, Typography } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

// Icons
import VideocamOffIcon from "@material-ui/icons/VideocamOff";
import MicIcon from "@material-ui/icons/Mic";
import ChatIcon from "@material-ui/icons/Chat";
import PeopleIcon from "@material-ui/icons/People";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";

export default function SpaceCard({ spaceName, description, headCount, music }) {

  return (
    <Paper className="rounded-xl">
      <Box className="flex flex-grow justify-between ">
        <Box className="text-left p-3">
          <Typography variant="h5" align="center" className="text-primary-dark">
            {spaceName}
          </Typography>
          <Typography  variant="body1" className="text-primary-text">
            {description}
          </Typography>
        </Box>

        <Box
          className=" flex items-center justify-center flex-col m-1 bg-opacity-30 text-primary-main"
        >
          <VideocamOffIcon />
          <MicIcon />
          <ChatIcon />
        </Box>
      </Box>

      <Box

        className="flex flex-row text-sm rounded-bl-xl rounded-br-xl p-2 space-x-2 text-primary-main bg-primary-light"
      >
        <Box >
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
