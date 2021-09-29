import PropTypes from 'prop-types';
import { React } from 'react';
import classNames from 'classnames';
import { Drawer } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    backgroundColor: 'white',
    height: '40vh',
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    border: 'none',
    width: drawerWidth,
    borderRadius: '0px 1rem 1rem 0px',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    height: '100vh',
  },
  drawerOpen: {
    width: '240',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
}));

const CollapsableDrawer = ({ children, open }) => {
  const classes = useStyles();

  return (
    <Drawer
      variant="permanent"
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: classNames(classes.drawerPaper, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}>
      {children}
    </Drawer>
  );
};

CollapsableDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
};

export default CollapsableDrawer;
