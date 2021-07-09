import { useState } from 'react';
import PropTypes from 'prop-types';
import { getSession } from 'next-auth/client';
import { Grid, Hidden, Button, SwipeableDrawer, Drawer, makeStyles } from '@material-ui/core';
import clsx from 'clsx';

import User from '../../models/User';
import dbConnect from '../../utils/dbConnect';
import Sidebar from '../../components/Dashboard/Sidebar';
import DashboardContainer from '../../components/Dashboard/DashboardContainer';
import ChartCard from '../../components/Dashboard/Cards/ChartCard';
import VerticalBar from '../../components/Dashboard/Charts/VerticalBar';
import LineChart from '../../components/Dashboard/Charts/LineChart';
import ProfileDialog from '../../components/Dashboard/Modals/ProfileDialog';
import { chartData } from '../../data/chartData';
import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';

const drawerWidth = 180;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
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

const MiniDrawer = ({ children, open }) => {
  const classes = useStyles();
  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
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
const Dashboard = ({ session, friendData }) => {
  session = session !== '' && JSON.parse(session);
  console.debug(session);
  const { peakStudyTimes, studyTimes } = chartData;
  const [profileOpen, setProfileOpen] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <Grid container direction="row" justify="flex-start">
      {/* Swipable Drawer on Smaller Screens */}
      <Hidden mdUp>
        <Grid item md={1}>
          <SwipeableDrawer anchor="left" open={open} onClose={() => setOpen(false)} onOpen={() => setOpen(true)}>
            <Sidebar open={open} onClose={() => setOpen(false)} onOpen={() => setOpen(true)} friendData={friendData} />
          </SwipeableDrawer>
        </Grid>
      </Hidden>

      {/* Collapsable Drawer on Medium and Up */}
      <Hidden smDown>
        <Grid item md={open ? 2 : 1}>
          <MiniDrawer open={open} onClose={() => setOpen(false)} onOpen={() => setOpen(true)}>
            <Sidebar open={open} onClose={() => setOpen(false)} onOpen={() => setOpen(true)} friendData={friendData} />
          </MiniDrawer>
        </Grid>
      </Hidden>
      <Grid item xs={12} md={open ? 10 : 9} container direction="column" spacing={5}>
        <Grid item>
          <DashboardContainer />
        </Grid>
        <Grid item container>
          <Grid item xs={12} md={6}>
            <ChartCard
              title={peakStudyTimes.title}
              date={peakStudyTimes.date}
              chart={<VerticalBar options={peakStudyTimes.options} data={peakStudyTimes.data} />}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ChartCard
              title={studyTimes.title}
              date={studyTimes.date}
              chart={<LineChart options={studyTimes.options} data={studyTimes.data} />}
            />
          </Grid>
        </Grid>
      </Grid>
      {session && (
        <>
          <Button onClick={() => setProfileOpen((prev) => !prev)}>Profile</Button>
          <ProfileDialog session={session} isOpen={profileOpen} handleClose={() => setProfileOpen(false)} />
        </>
      )}
    </Grid>
  );
};

Dashboard.propTypes = {
  session: PropTypes.string.isRequired,
  friendData: PropTypes.object,
};

export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  await dbConnect();

  let newSession;
  if (session) {
    const user = await User.findOne({
      email: session.user.email,
    });
    newSession = { ...session, user };
    console.log('Session:', newSession);
  }

  return {
    props: {
      session: JSON.stringify(newSession) ?? '', // otherwise nextjs throws error - can't serialize data
      friendData: [
        {
          name: 'Yi Nan Zhang',
          status: 'In Study Session',
          image: '',
        },
        {
          name: 'Charles Liu',
          status: 'In Study Session',
          image: '',
        },
        {
          name: 'Jimmy Yang',
          status: 'In Study Session',
          image: '',
        },
        {
          name: 'Mabel Kwok',
          status: 'In Study Session',
          image: '',
        },
        {
          name: 'Eden Chan',
          status: 'In Study Session',
          image: '',
        },
      ],
    },
  };
};

export default Dashboard;
