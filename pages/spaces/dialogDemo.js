import React from "react";
import PropTypes from "prop-types";

import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";

import {
  useTheme,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import { Container, Grid, Box } from "@material-ui/core";
import SpacesCard from "../../components/SpacesCard";



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
   const friends = [
     { name: "Charles Liu", status: "Finish work!" },
     { name: "Charles Liu", status: "in study session!" },
     { name: "Charles Liu", status: "taking a break" },
   ];
   const participants = [
     { name: "Charles Liu", status: "Finish work!" },
     { name: "Charles Liu", status: "in study session!" },
     { name: "Charles Liu", status: "taking a break" },
   ];
   const hosts = [
     { name: "Charles Liu", status: "Finish work!" },
     { name: "Charles Liu", status: "in study session!" },
     { name: "Charles Liu", status: "taking a break" },
     { name: "Charles Liu", status: "Finish work!" },
     { name: "Charles Liu", status: "in study session!" },
     { name: "Charles Liu", status: "taking a break" },
   ];

function populateUsers (users) {
    return (
      <List>
        {users.map((user) => (
          <ListItem key={user.name} className="py-0">
            <ListItemAvatar>
              <Avatar>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={user.name} secondary={user.status} />
          </ListItem>
        ))}
      </List>
    );
}


function SimpleDialog(props) {
  const theme = useTheme();
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <Box className="p-10 ">
        <SpacesCard
          className="w-full transform-none hover:none"
          spaceName="UW Math 2025"
          description="finals grind, upper years available in chat for help with past exams"
          headCount="17"
          music="lofi 2"
        ></SpacesCard>
        <h3 className="text-lg font-semibold  text-gray-500 py-4">IN SESSION</h3>

          <Container className="flex flex-row justify-between ">
            <Box
              bgcolor={theme.palette.primary.light}
              className="flex flex-col p-5 rounded-lg"
            >
              <h3 className="text-lg font-semibold  text-gray-500">Friends</h3>
              {populateUsers(friends)}
              <h3 className="text-lg font-semibold  text-gray-500">
                Participants
              </h3>
              {populateUsers(participants)}
            </Box>

            <Box className="flex flex-col p-5">
              <h3 className="text-lg font-semibold text-gray-500">
                Host&#40;s&#41;{" "}
              </h3>
              {populateUsers(hosts)}
            </Box>
          </Container>
        </Box>
 
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function SimpleDialogDemo() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);

  };

  return (
    <ThemeProvider theme={theme}>

      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open simple dialog
      </Button>
      <SimpleDialog
   
        open={open}
        onClose={handleClose}
      />
    </ThemeProvider>
  );
}
