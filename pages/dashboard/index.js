import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { getSession } from 'next-auth/client';
import { Grid, Hidden, Button, Drawer, makeStyles, Fab } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import User from '../../models/User';
import dbConnect from '../../utils/dbConnect';
import Sidebar from '../../components/Dashboard/Sidebar';
import DashboardContainer from '../../components/Dashboard/DashboardContainer';
import ChartCard from '../../components/Dashboard/Cards/ChartCard';
import VerticalBar from '../../components/Dashboard/Charts/VerticalBar';
import LineChart from '../../components/Dashboard/Charts/LineChart';
import ProfileDialog from '../../components/Dashboard/Modals/ProfileDialog';
import { chartData } from '../../data/chartData';
import CollapsableDrawer from '../../components/Dashboard/CollapsableDrawer';

// Custom styles for SwipeableDrawer component
const useStyles = makeStyles({
  fabDrawer: {
    borderRadius: '0px 1rem 1rem 0px',
    overflow: 'hidden',
    width: '40vw',
  },
});

const Dashboard = ({ session, friendData }) => {
  const classes = useStyles();

  session = session !== '' && JSON.parse(session);
  console.debug(session);
  const { peakStudyTimes, studyTimes } = chartData;
  const [profileOpen, setProfileOpen] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <>
      <Grid container direction="row">
        {/* Fab Drawer on Smaller Screens */}
        <Hidden mdUp>
          <Fab onClick={() => setOpen(!open)} color="primary" className="fixed bottom-4 right-4 z-40">
            <MenuIcon />
          </Fab>
          <Grid item xs={1}>
            <Drawer anchor="left" open={open} onClose={() => setOpen(false)} classes={{ paper: classes.fabDrawer }}>
              <Sidebar
                open={open}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                friendData={friendData}
                isSmallScreen={true}
              />
            </Drawer>
          </Grid>
        </Hidden>

        {/* Collapsable Drawer on Medium and Up */}
        <Hidden smDown>
          <Grid item md={open ? 2 : 1}>
            <CollapsableDrawer open={open} onClose={() => setOpen(false)} onOpen={() => setOpen(true)}>
              <Sidebar
                open={open}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                friendData={friendData}
                isSmallScreen={false}
              />
            </CollapsableDrawer>
          </Grid>
        </Hidden>

        {/* Body */}
        <Grid item xs={12} md={open ? 10 : 11} container direction="row" justify="center">
          <Grid item xs={12} className="m-4">
            {/* causing the side and top scrolling behaviour */}
            <DashboardContainer />
          </Grid>
          <Grid item container className="m-4">
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
          {session && (
            <Grid container item xs={12} justify="center">
              <Button onClick={() => setProfileOpen((prev) => !prev)}>Profile</Button>
              <ProfileDialog session={session} isOpen={profileOpen} handleClose={() => setProfileOpen(false)} />
            </Grid>
          )}
        </Grid>
      </Grid>
    </>
  );
};

Dashboard.propTypes = {
  session: PropTypes.string.isRequired,
  friendData: PropTypes.array.isRequired,
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
          image: '/images/avatar/cartoon.png',
        },
        {
          name: 'Charles Liu',
          status: 'In Study Session',
          image: '/images/avatar/cartoon.png',
        },
        {
          name: 'Jimmy Yang',
          status: 'In Study Session',
          image: '/images/avatar/cartoon.png',
        },
        {
          name: 'Mabel Kwok',
          status: 'In Study Session',
          image: '/images/avatar/cartoon.png',
        },
        {
          name: 'Eden Chan',
          status: 'In Study Session',
          image: '/images/avatar/cartoon.png',
        },
      ],
    },
  };
};

export default Dashboard;
