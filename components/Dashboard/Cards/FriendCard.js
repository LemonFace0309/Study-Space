import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import uniqueId from 'lodash/uniqueId';

const useStyles = makeStyles((theme) => ({
  list: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: '0rem 1rem 1rem 0rem',
    flexGrow: '1',
  },
  statusText: {
    '& > p': {
      color: theme.palette.primary.contrastText,
    },
  },
}));

const FriendCard = ({ open, friendData }) => {
  const classes = useStyles();

  return (
    <List className={classes.list}>
      {friendData.map(({ name, status, image }) => {
        return (
          <ListItem className="whitespace-normal" key={uniqueId(name)}>
            <ListItemAvatar>
              <Avatar />
            </ListItemAvatar>
            {open && <ListItemText primary={name} secondary={status} className={classes.statusText} />}
          </ListItem>
        );
      })}
    </List>
  );
};

FriendCard.propTypes = {
  open: PropTypes.bool.isRequired,
  friendData: PropTypes.array.isRequired,
};
export default FriendCard;
