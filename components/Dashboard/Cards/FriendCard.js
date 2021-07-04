import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import uniqueId from 'lodash/uniqueId';

const FriendCard = ({ isSidebarCollapsed, friendData }) => {
  const theme = useTheme();
  return (
    <Box bgcolor={theme.palette.primary.main} className="rounded-r-xl">
      <List>
        {isSidebarCollapsed
          ? friendData.map(({ name, status, image }) => {
              return (
                <ListItem key={uniqueId(name)}>
                  <ListItemAvatar>
                    <Avatar />
                  </ListItemAvatar>
                </ListItem>
              );
            })
          : friendData.map(({ name, status, image }) => {
              return (
                <ListItem key={uniqueId(name)}>
                  <ListItemAvatar>
                    <Avatar />
                  </ListItemAvatar>

                  <ListItemText primary={name} secondary={status} />
                </ListItem>
              );
            })}
      </List>
    </Box>
  );
};

FriendCard.propTypes = {
  isSidebarCollapsed: PropTypes.bool.isRequired,
  friendData: PropTypes.obj,
};
export default FriendCard;
