import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import SpotifyWebApi from 'spotify-web-api-node';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { differenceInMilliseconds, addMilliseconds } from 'date-fns';

import * as spotifyState from '@/atoms/spotify';
import getCookie from '@/utils/getCookie';
import parsePlaylists from '@/utils/spotify/parsePlaylists';

const SpotifyContext = React.createContext();

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
});

export const useSpotifyContext = () => {
  return useContext(SpotifyContext);
};

export const ENUM_AUTHENTICATION = {
  LOADING: 'LOADING',
  AUTHENTICATED: 'AUTHENTICATED',
  NOT_AUTHENTICATED: 'NOT_AUTHENTICATED',
};

export const SpotifyProvider = ({ children }) => {
  const [spotifyRefresh, setSpotifyRefresh] = useRecoilState(spotifyState.refresh);
  const [authenticated, setAuthenticated] = useState(ENUM_AUTHENTICATION.LOADING);
  const [accessToken, setAccessToken] = useState('');
  const [user, setUser] = useState(null);
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [focusPlaylists, setFocusPlaylists] = useState([]);
  const [kpopPlaylsits, setKpopPlaylists] = useState([]);
  const [cafePlaylists, setCafePlaylists] = useState([]);
  const [studyPlaylists, setStudyPlaylists] = useState([]);
  const [pianoPlaylists, setPianoPlaylists] = useState([]);
  const [queue, setQueue] = useState([]);
  const [queueURIs, setQueueURIs] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [nextTracks, setNextTracks] = useState([]);

  const getAccessTokenFromCookies = () => {
    const spotifySessionJWT = getCookie(document.cookie, 'spotify_session');
    if (!spotifySessionJWT) return false;
    const spotifySession = jwt.decode(spotifySessionJWT);
    if (!spotifySession?.accessToken) return false;
    setAccessToken(spotifySession.accessToken);
    spotifyApi.setAccessToken(spotifySession.accessToken);
    return true;
  };

  const initUser = async () => {
    try {
      const userData = await spotifyApi.getMe();
      console.debug('Some information about the spotify user:', userData.body);
      const username = userData.body.id;
      const playlistData = await spotifyApi.getUserPlaylists(username);
      setUser(userData.body);
      setAuthenticated(ENUM_AUTHENTICATION.AUTHENTICATED);
      const rawPlaylists = playlistData.body.items;
      setUserPlaylists(() => parsePlaylists(rawPlaylists));
    } catch (err) {
      console.debug('Something went wrong fetching your Spotify Information:', err);
      setAuthenticated(ENUM_AUTHENTICATION.NOT_AUTHENTICATED);
    }
  };

  const fetchPlaylists = [
    { category: 'focus', limit: 7, setState: setFocusPlaylists },
    { category: 'kpop', limit: 7, setState: setKpopPlaylists },
    { search: 'cafe', limit: 7, setState: setCafePlaylists },
    { search: 'study', limit: 7, setState: setStudyPlaylists },
    { search: 'piano', limit: 7, setState: setPianoPlaylists },
  ];

  const initRecommendedPlaylists = () => {
    let promisesArr = [];
    for (const fetchObj of fetchPlaylists) {
      if (fetchObj.category) {
        promisesArr.push(spotifyApi.getPlaylistsForCategory(fetchObj.category, { limit: fetchObj.limit }));
        // spotifyApi
        //   .getPlaylistsForCategory(fetchObj.category, { limit: fetchObj.limit })
        //   .then((data) => {
        //     fetchObj.setState(() => parsePlaylists(data?.body?.playlists?.items));
        //   })
        //   .catch((err) => {
        //     console.debug('Unable to fetch playlists:', err);
        //   });
      } else if (fetchObj.search) {
        promisesArr.push(spotifyApi.searchPlaylists(fetchObj.search, { limit: fetchObj.limit }));
      }
    }
    Promise.all(promisesArr)
      .then((dataArr) => {
        console.debug('Data array:', dataArr);
        dataArr.map((data, index) =>
          fetchPlaylists[index].setState(() => parsePlaylists(data?.body?.playlists?.items))
        );
      })
      .catch((err) => console.debug('Unable to fetch playlists:', err));
  };

  useEffect(() => {
    const hasToken = getAccessTokenFromCookies();
    if (!hasToken) {
      setAuthenticated(ENUM_AUTHENTICATION.NOT_AUTHENTICATED);
      return;
    }
    initUser();
    initRecommendedPlaylists();
  }, []);

  useEffect(() => {
    setQueueURIs(queue.map((track) => track?.uri ?? ''));
  }, [queue]);

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

  const value = {
    authenticated,
    getAccessTokenFromCookies,
    spotifyApi,
    accessToken,
    user,
    userPlaylists,
    focusPlaylists,
    kpopPlaylsits,
    cafePlaylists,
    studyPlaylists,
    pianoPlaylists,
    queue,
    setQueue,
    queueURIs,
    currentTrack,
    setCurrentTrack,
    nextTracks,
    setNextTracks,
  };

  return <SpotifyContext.Provider value={value}>{children}</SpotifyContext.Provider>;
};

SpotifyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
