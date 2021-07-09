import PropTypes from 'prop-types';
import { React } from 'react';
import clsx from 'clsx';
import { Drawer, makeStyles } from '@material-ui/core';

const drawerWidth = 180;

const useStyles = makeStyles((theme) => ({
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
    overflowY: 'hidden',
    'border-radius': '0px 15px 15px 0px',
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    overflowY: 'hidden',
    'border-radius': '0px 15px 15px 0px',
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
      classes={{
        paper: clsx({
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
