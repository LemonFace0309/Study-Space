import PropTypes from 'prop-types';
import { React } from 'react';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';

const drawerWidth = 240;

// const useStyles = makeStyles((theme) => ({
//   drawer: {
//     backgroundColor: 'white',
//     height: '40vh',
//     width: drawerWidth,
//     flexShrink: 0,
//   },
//   drawerPaper: {
//     border: 'none',
//     width: drawerWidth,
//     borderRadius: '0px 1rem 1rem 0px',
//     overflow: 'hidden',
//     whiteSpace: 'nowrap',
//     height: '100vh',
//   },
//   drawerOpen: {
//     width: '240',
//     transition: theme.transitions.create('width', {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   },
//   drawerClose: {
//     transition: theme.transitions.create('width', {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     overflowX: 'hidden',
//     width: theme.spacing(7) + 1,
//     [theme.breakpoints.up('sm')]: {
//       width: theme.spacing(9) + 1,
//     },
//   },
// }));

const roundedCornersMixin = () => ({
  border: 'none',
  borderRadius: '0px 1rem 1rem 0px',
  height: '100vh',
});

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': {
      ...roundedCornersMixin(),
      ...openedMixin(theme),
    },
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': {
      ...roundedCornersMixin(),
      ...closedMixin(theme),
    },
  }),
}));

const CollapsableDrawer = ({ children, open }) => {
  // const classes = useStyles();

  return (
    <Drawer variant="permanent" open={open}>
      {children}
    </Drawer>
  );
};

CollapsableDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
};

export default CollapsableDrawer;
