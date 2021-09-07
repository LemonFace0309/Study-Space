import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import SpotifyWebApi from 'spotify-web-api-node';
import jwt from 'jsonwebtoken';

import getCookie from '@/utils/getCookie';
import parsePlaylists from '@/utils/spotify/parsePlaylists';
import Player from '@/components/Spaces/CallTabs/Music/Player';

const SpotifyContext = React.createContext();

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
});

export function useSpotifyContext() {
  return useContext(SpotifyContext);
}

export const ENUM_AUTHENTICATION = {
  LOADING: 'LOADING',
  AUTHENTICATED: 'AUTHENTICATED',
  NOT_AUTHENTICATED: 'NOT_AUTHENTICATED',
};

export const SpotifyProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(ENUM_AUTHENTICATION.LOADING);
  const [accessToken, setAccessToken] = useState('');
  const [user, setUser] = useState(null);
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [focusPlaylists, setFocusPlaylists] = useState([]);
  const [kpopPlaylsits, setKpopPlaylists] = useState([]);
  const [cafePlaylists, setCafePlaylists] = useState([]);
  const [studyPlaylists, setStudyPlaylists] = useState([]);
  const [pianoPlaylists, setPianoPlaylists] = useState([]);
  const [play, setPlay] = useState(false);
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
      console.debug('Some information about the spotify user', userData.body);
      const username = userData.body.id;
      const playlistData = await spotifyApi.getUserPlaylists(username);
      setUser(userData.body);
      setAuthenticated(ENUM_AUTHENTICATION.AUTHENTICATED);
      const rawPlaylists = playlistData.body.items;
      setUserPlaylists(() => parsePlaylists(rawPlaylists));
    } catch (err) {
      console.debug('Something went wrong fetching your Spotify Information!', err);
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
    for (const fetchObj of fetchPlaylists) {
      if (fetchObj.category) {
        spotifyApi
          .getPlaylistsForCategory(fetchObj.category, { limit: fetchObj.limit })
          .then((data) => {
            fetchObj.setState(() => parsePlaylists(data?.body?.playlists?.items));
          })
          .catch((err) => {
            console.debug('Something went wrong!', err);
          });
      } else if (fetchObj.search) {
        spotifyApi
          .searchPlaylists(fetchObj.search, { limit: fetchObj.limit })
          .then((data) => {
            fetchObj.setState(() => parsePlaylists(data?.body?.playlists?.items));
          })
          .catch((err) => {
            console.debug('Something went wrong!', err);
          });
      }
    }
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
    play,
    setPlay,
    queue,
    setQueue,
    queueURIs,
    currentTrack,
    setCurrentTrack,
    nextTracks,
    setNextTracks,
  };

  return (
    <SpotifyContext.Provider value={value}>
      <div>
        <Player />
      </div>
      {children}
    </SpotifyContext.Provider>
  );
};

SpotifyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
