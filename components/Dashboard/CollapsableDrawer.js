import PropTypes from 'prop-types';
import { React } from 'react';
import clsx from 'clsx';
import { Drawer, makeStyles } from '@material-ui/core';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    width: drawerWidth,
    borderRadius: '0px 1rem 1rem 0px',
    overflow: 'hidden',
    flexShrink: 0,
    whiteSpace: 'nowrap',
    height: '100vh',
  },
  drawerOpen: {
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
      className="h-full"
      classes={{
        paper: clsx(classes.drawerPaper, {
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
