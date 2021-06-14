import React from "react";
import { makeStyles } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";

const FriendCard = (props) => {
  const theme = useTheme();
  return (
    <Box bgcolor={theme.palette.primary.main} className="rounded-r-xl">
      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar />
          </ListItemAvatar>
          <ListItemText primary="Yi Nan Zhang" secondary="in study session" />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar />
          </ListItemAvatar>
          <ListItemText primary="Jimmy Yang" secondary="in study session" />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar />
          </ListItemAvatar>
          <ListItemText primary="Charles Liu" secondary="in study session" />
        </ListItem>
      </List>
    </Box>
  );
};

export default FriendCard;