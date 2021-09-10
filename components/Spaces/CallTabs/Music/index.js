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

import { useSpotifyContext, ENUM_AUTHENTICATION } from '@/context/spaces/SpotifyContext';
import renderComponent from '@/utils/renderComponent';
import getCookie from '@/utils/getCookie';
import * as spotifyState from '@/atoms/spotify';
import SpotifySignUpBlocker from './SpotifySignUpBlocker';
import Player from './Player';
import HomeTab from './Tabs/Home';
import SearchSongsTab from './Tabs/SearchSongs';
import QueueTab from './Tabs/Queue';

const useStyles = makeStyles((theme) => ({
  tabContainer: {
    flex: 1,
    padding: theme.spacing(1),
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    '& > .react-tabs__tab-panel--selected': {
      flex: 1,
      overflowY: 'auto',
    },
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
  playerContainer: {
    width: '100%',
    position: 'relative',
    bottom: '0',
    left: '0',
  },
}));

const Music = ({ tabs }) => {
  const classes = useStyles();
  const { getAccessTokenFromCookies, authenticated } = useSpotifyContext();
  const [tabIndex, setTabIndex] = useState(0);
  const [spotifyRefresh, setSpotifyRefresh] = useRecoilState(spotifyState.refresh);

  useEffect(() => {
    const spotifySessionJWT = getCookie(document.cookie, 'spotify_session');
    if (!spotifySessionJWT) return;
    const spotifySession = jwt.decode(spotifySessionJWT);
    if (!spotifySession) return;
    let timeoutDuration = 100; // set to 100 for instance refresh if recoil state is not set
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
          getAccessTokenFromCookies();
        })
        .catch((err) => console.debug(err));
    }, timeoutDuration);

    return () => clearTimeout(timeout);
  }, [spotifyRefresh]);

  if (authenticated !== ENUM_AUTHENTICATION.AUTHENTICATED) {
    return <SpotifySignUpBlocker loading={authenticated === ENUM_AUTHENTICATION.LOADING} />;
  }

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
      {tabs.map((tabObj) => (
        <TabPanel key={tabObj.title + '_PANEL'}>{renderComponent(tabObj.panel)}</TabPanel>
      ))}
      <div className={classes.playerContainer}>
        <Player />
      </div>
    </Tabs>
  );
};

Music.propTypes = {
  tabs: PropTypes.array,
};

Music.defaultProps = {
  tabs: [
    {
      title: 'Home',
      panel: HomeTab,
    },
    {
      title: 'Search',
      panel: SearchSongsTab,
    },
    {
      title: 'Queue',
      panel: QueueTab,
    },
  ],
};

export default Music;
