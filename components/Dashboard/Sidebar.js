/* eslint-disable jsx-a11y/accessible-emoji */
import PropTypes from 'prop-types';
import { React } from 'react';
import { makeStyles } from '@material-ui/core';
import { Box, Grid, Button, IconButton, Typography, useTheme } from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import FriendCard from './Cards/FriendCard';

const useStyles = makeStyles((theme) => ({
  iconButton: {
    color: theme.palette.primary.contrastText,
    marginLeft: 'auto',
  },
  button: {
    width: '100%',
    fontSize: '18px',
    '&:focus': {
      outline: 'none',
    },
    textTransform: 'capitalize',
    color: '#BDACD4',
    '&:hover': {
      backgroundColor: '#977BBF',
      color: '#fff',
    },
  },
}));

const Sidebar = ({ open, onClose, onOpen, friendData }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Box bgcolor={theme.palette.primary.dark} height={1}>
      <Grid container direction="row" spacing={5}>
        <Grid container item xs={12}>
          <IconButton className={classes.iconButton} onClick={open ? onClose : onOpen}>
            <MenuIcon />
          </IconButton>
        </Grid>
        <Grid container item xs={12} direction="column">
          <Grid item>
            <Button className={classes.button} startIcon={<HomeIcon />}>
              {open && 'Home'}
            </Button>
          </Grid>
          <Grid item>
            <Button className={classes.button} startIcon={<SearchIcon />}>
              {open && 'Browse'}
            </Button>
          </Grid>
          <Grid item>
            <Button className={classes.button} startIcon={<EqualizerIcon />}>
              {open && 'Statistics'}
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2" color="secondary">
            {open && 'FRIENDS'}
          </Typography>
          <FriendCard open={open} friendData={friendData}></FriendCard>
        </Grid>
      </Grid>
    </Box>
  );
};

Sidebar.propTypes = {
  open: PropTypes.bool.isRequired,
  onOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  friendData: PropTypes.array.isRequired,
};

export default Sidebar;
