/* eslint-disable jsx-a11y/accessible-emoji */
import PropTypes from 'prop-types';
import { React } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Button, IconButton, Typography } from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import FriendCard from './Cards/FriendCard';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.primary.dark,
    height: '100%',
    flexWrap: 'nowrap',
  },
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
  friendsSection: {
    flex: '1',
    flexWrap: 'nowrap',
    overflowY: 'auto',
    overflowX: 'hidden',
    padding: ({ open }) => open && theme.spacing(0, 1.5),
    '& > ul': {
      flexGrow: '1',
    },
    /* Hide scrollbar for Chrome, Safari and Opera */
    '&::-webkit-scrollbar': {
      display: ({ isSmallScreen }) => !isSmallScreen && 'none',
    },
    '-ms-overflow-style': 'none' /* IE and Edge */,
    scrollbarWidth: ({ isSmallScreen }) => !isSmallScreen && 'none' /* Firefox */,
  },
}));

const Sidebar = ({ open, onClose, onOpen, friendData, isSmallScreen }) => {
  const classes = useStyles({ open, isSmallScreen });

  return (
    <Grid container direction="column" className={classes.container}>
      <Grid container item className="mb-16">
        <IconButton className={classes.iconButton} onClick={open ? onClose : onOpen}>
          <MenuIcon />
        </IconButton>
      </Grid>
      <Grid container item className="mb-16" direction="column">
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
      <Grid container item direction="column" className={classes.friendsSection}>
        <Typography variant="subtitle2" color="secondary">
          {open && 'FRIENDS'}
        </Typography>
        <FriendCard open={open} friendData={friendData}></FriendCard>
      </Grid>
    </Grid>
  );
};

Sidebar.propTypes = {
  open: PropTypes.bool.isRequired,
  onOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  friendData: PropTypes.array.isRequired,
  isSmallScreen: PropTypes.bool,
};

Sidebar.defaultProps = {
  isSmallScreen: false,
};

export default Sidebar;
