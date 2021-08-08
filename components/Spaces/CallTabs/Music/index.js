import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import jwt from 'jsonwebtoken';
import classNames from 'classnames';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { differenceInMilliseconds, addMilliseconds } from 'date-fns';
import { TabList, Tab, Tabs, TabPanel } from 'react-tabs';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import renderComponent from 'utils/renderComponent';
import getCookie from 'utils/getCookie';
import * as spotifyState from 'atoms/spotify';
import { SpotifyProvider } from './SpotifyProvider';
import OurPicksTab from './Tabs/OurPicks';
import SearchSongs from './Tabs/SearchSongs';
import QueueTab from './Tabs/Queue';

const useStyles = makeStyles((theme) => ({
  tabContainer: {
    flex: 1,
    padding: theme.spacing(1),
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  tab: {
    flex: 1,
    borderRadius: '8px',
    margin: theme.spacing(1),
    overflow: 'hidden',
    textTransform: 'none',
    color: theme.palette.primary.dark,
  },
  activeTab: {
    textDecoration: 'none',
    backgroundColor: 'rgba(17, 17, 17, 0.04)',
  },
}));

const Music = ({ tabs }) => {
  const classes = useStyles();
  const [tabIndex, setTabIndex] = useState(0);
  const [spotifyRefresh, setSpotifyRefresh] = useRecoilState(spotifyState.refresh);

  useEffect(() => {
    const spotifySessionJWT = getCookie(document.cookie, 'spotify_session');
    if (!spotifySessionJWT) return;
    const spotifySession = jwt.decode(spotifySessionJWT);
    if (!spotifySession) return;
    // let timeoutDuration = spotifySession?.expiresIn * 1000 ?? 3600 * 1000; // onehour in milliseconds
    let timeoutDuration = 100;
    if (spotifyRefresh?.refreshDate) {
      const curDate = new Date();
      const timeToRefresh = differenceInMilliseconds(spotifyRefresh?.refreshDate, curDate) ?? 3600 * 1000;
      timeoutDuration = timeToRefresh;
    }
    const timeout = setTimeout(() => {
      if (!spotifySession?.refreshToken) return;
      axios
        .post('/api/spotify/refresh-token', { refreshToken: spotifySession.refreshToken })
        .then((res) => {
          const expiresIn = res.data.data.expiresIn * 1000;
          const date = new Date();
          const expireDate = addMilliseconds(date, expiresIn);
          const refreshDate = addMilliseconds(date, expiresIn / 4);
          setSpotifyRefresh({ expiresIn, expireDate, refreshDate });
          console.debug('Successfully refreshed spotify token:', res.data);
        })
        .catch((err) => console.debug(err));
    }, timeoutDuration);

    return () => clearTimeout(timeout);
  }, [spotifyRefresh]);

  return (
    <Tabs selectedIndex={tabIndex} onSelect={() => null} className={classes.tabContainer}>
      <div>
        <TabList className="flex w-full justify-center">
          {tabs.map((tabObj, index) => (
            <Button
              key={tabObj.title + '_TAB'}
              className={classNames([classes.tab, tabIndex === index && classes.activeTab])}
              onClick={() => setTabIndex(index)}>
              <Tab>
                <Typography variant="subtitle2">{tabObj.title}</Typography>
              </Tab>
            </Button>
          ))}
        </TabList>
      </div>
      <SpotifyProvider>
        {tabs.map((tabObj) => (
          <TabPanel key={tabObj.title + '_PANEL'}>{renderComponent(tabObj.panel)}</TabPanel>
        ))}
        <h1>test</h1>
      </SpotifyProvider>
    </Tabs>
  );
};

Music.propTypes = {
  tabs: PropTypes.array,
};

Music.defaultProps = {
  tabs: [
    {
      title: 'Our Picks',
      panel: OurPicksTab,
    },
    {
      title: 'Search',
      panel: SearchSongs,
    },
    {
      title: 'Queue',
      panel: QueueTab,
    },
  ],
};

export default Music;
