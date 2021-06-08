import React from "react";
import {
  Container,
  Box,
  Typography,
  Dialog,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@material-ui/core";

import { useTheme } from "@material-ui/core/styles";

import PersonIcon from "@material-ui/icons/Person";


function UserList(props) {
  const { users } = props;
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

export default function SpaceCardModal(props) {
  const theme = useTheme();
  const { onClose, open, children } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <Box className="p-10 rounded-lg">
        {children}

        <Typography
          variant="h6"
          color="textSecondary"
          className="uppercase py-4"
        >
          In Session
        </Typography>

        <Container className="flex flex-row justify-between ">
          <Box
            bgcolor={theme.palette.primary.light}
            className="flex flex-col p-5 rounded-lg"
          >
            <Typography variant="body1" color="textSecondary">
              Friends
            </Typography>
            <UserList users={friends} />

            <Typography variant="body1" color="textSecondary">
              Participants
            </Typography>
            <UserList users={participants} />
          </Box>

          <Box className="flex flex-col p-5">
            <Typography variant="body1" color="textSecondary">
              Host&#40;s&#41;
            </Typography>
            <UserList users={hosts} />
          </Box>
        </Container>
      </Box>
    </Dialog>
  );
}
