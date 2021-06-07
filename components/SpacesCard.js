import React from "react";
import { Paper, Container, Box, Typography } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import VideocamOffIcon from "@material-ui/icons/VideocamOff";
import MicIcon from "@material-ui/icons/Mic";
import ChatIcon from "@material-ui/icons/Chat";
import PeopleIcon from "@material-ui/icons/People";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";

export default function SpacesCard(props) {
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
