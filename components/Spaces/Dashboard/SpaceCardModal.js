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
  useTheme,
} from "@material-ui/core";

import  PersonIcon from "@material-ui/icons/Person";



function UserList({ users }) {
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

export default function SpaceCardModal({ handleClose, open, children, friends, participants, hosts }) {

  return (
    <Dialog onClose={() => handleClose()} open={open}>
      <Box className="p-10 rounded-lg">
        {children}

        <Typography
          variant="h6"
          className="uppercase py-4 text-primary-text"
        >
          In Session
        </Typography>

        <Container className="flex flex-col sm:flex-row justify-between  ">
          <Box
          
            className="flex flex-col p-5 rounded-lg bg-primary-light"
          >
            <Typography variant="body1" color="text-primary-text">
              Friends
            </Typography>
            <UserList users={friends} />

            <Typography variant="body1" className="text-primary-text">
              Participants
            </Typography>
            <UserList users={participants} />
          </Box>

          <Box className="flex flex-col p-5">
            <Typography variant="body1" className="text-primary-text">
              Host&#40;s&#41;
            </Typography>
            <UserList users={hosts} />
          </Box>
        </Container>
      </Box>
    </Dialog>
  );
}
