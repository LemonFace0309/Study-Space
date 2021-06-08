import React from "react";
import { makeStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import AllOutIcon from "@material-ui/icons/AllOut";
import DoneIcon from "@material-ui/icons/Done";
import EcoIcon from "@material-ui/icons/Eco";
import LockIcon from "@material-ui/icons/Lock";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ImageIcon from "@material-ui/icons/Image";
import WorkIcon from "@material-ui/icons/Work";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";

const useStyles = makeStyles({
    box: {
      borderRadius: "0px 15px 15px 0px",
      // HOW TO PUT MATERIAL UI COLORS HERE
      background: "#977BBF",
    },
  }),
  FriendCard = () => {
    const classes = useStyles();
    return (
      <Box className={classes.box}>
        <List className={classes.root}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Yi Nan Zhang" secondary="in study session" />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <WorkIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Jimmy Yang" secondary="in study session" />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <BeachAccessIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Charles Liu" secondary="in study session" />
          </ListItem>
        </List>
      </Box>
    );
  };

export default FriendCard;
