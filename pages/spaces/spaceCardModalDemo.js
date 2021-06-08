import React, { useState } from "react";

import {
  useTheme,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";

import { Button } from "@material-ui/core";
import SpaceCardModal from "../../components/Spaces/Dashboard/SpaceCardModal";
import SpaceCard from "../../components/Spaces/Dashboard/SpaceCard";


import Typography from "@material-ui/core/Typography";


// 
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

export default function SpaceCardModalDemo() {

  // For the sake of the demo, we are using locally defined theme. 
  // When using ThemeProvider, use the useTheme() hook.
  // const theme = useTheme();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <ThemeProvider theme={theme}>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        <Typography variant="body1" color="secondary">
          Open Space Card Modal
        </Typography>
      </Button>
      <SpaceCardModal open={open} onClose={handleClose}>
        <SpaceCard
          spaceName="UW Math 2025"
          description="finals grind, upper years available in chat for help with past exams"
          headCount="17"
          music="lofi 2"
        />
      </SpaceCardModal>
    </ThemeProvider>
  );
}
