/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Box, Grid, Button, Typography, useTheme } from '@material-ui/core';

import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import FriendCard from './Cards/FriendCard';

const useStyles = makeStyles({
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
});

const Sidebar = () => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <Box bgcolor={theme.palette.primary.dark} className="h-screen rounded-r-xl">
      <Grid direction="column" container spacing={5}>
        <Grid item container direction="row">
          <Typography variant="subtitle1" align="left">
            Dashboard😊
          </Typography>
          <MenuOpenIcon className="pt-2" style={{ color: '#BDACD4' }} />
        </Grid>
        <Grid item container direction="column" spacing={1}>
          <Grid item>
            <Button className={classes.button} startIcon={<HomeIcon />}>
              Home
            </Button>
          </Grid>
          <Grid item>
            <Button className={classes.button} startIcon={<SearchIcon />}>
              Browse
            </Button>
          </Grid>
          <Grid item>
            <Button className={classes.button} startIcon={<EqualizerIcon />}>
              Statistics
            </Button>
          </Grid>
        </Grid>
        <Grid item>
          <Typography variant="subtitle2">FRIEND ACTIVITY</Typography>
          <FriendCard></FriendCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Sidebar;
