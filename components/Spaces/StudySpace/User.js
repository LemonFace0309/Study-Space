import React from "react";

import { Paper, Box, Typography, Avatar } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

import PersonIcon from "@material-ui/icons/Person";

export default function User() {
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
        <Typography variant="body2" color="primary">
          Jimmy &#40;Host&#41;
        </Typography>
      </Box>
    </Paper>
  );
}
