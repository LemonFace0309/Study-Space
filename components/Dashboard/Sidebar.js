/* eslint-disable jsx-a11y/accessible-emoji */
import PropTypes from 'prop-types';
import { React } from 'react';
import { makeStyles } from '@material-ui/core';
import { Box, Grid, Button, Typography, useTheme } from '@material-ui/core';

import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import FriendCard from './Cards/FriendCard';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

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

const Sidebar = ({ open, onClose, onOpen, friendData }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Box bgcolor={theme.palette.primary.dark} width={1} height={1} className="rounded-r-xl">
      <Grid direction="column" container spacing={5}>
        <Grid item container direction="row" justify="flex-end">
          <Grid item></Grid>
          <Grid item>
            <Button onClick={open ? onClose : onOpen} className={classes.button} startIcon={<MenuOpenIcon />}></Button>
          </Grid>
        </Grid>
        <Grid item container direction="column" spacing={1}>
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
        <Grid item>
          <Typography variant="subtitle2">FRIENDS</Typography>
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
