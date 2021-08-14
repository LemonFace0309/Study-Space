import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import SpotifyWebApi from 'spotify-web-api-node';
import jwt from 'jsonwebtoken';

import getCookie from 'utils/getCookie';
import parsePlaylists from 'utils/spotify/parsePlaylists';

const SpotifyContext = React.createContext();

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
});

export function useSpotify() {
  return useContext(SpotifyContext);
}

export function SpotifyProvider({ children }) {
  const [accessToken, setAccessToken] = useState('');
  const [user, setUser] = useState(null);
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [focusPlaylists, setFocusPlaylists] = useState([]);
  const [kpopPlaylsits, setKpopPlaylists] = useState([]);
  const [cafePlaylists, setCafePlaylists] = useState([]);
  const [studyPlaylists, setStudyPlaylists] = useState([]);
  const [pianoPlaylists, setPianoPlaylists] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [trackUri, setTrackUri] = useState(null);
  const [nextTracks, setNextTracks] = useState([]);

  const getAccessTokenFromCookies = () => {
    const spotifySessionJWT = getCookie(document.cookie, 'spotify_session');
    if (!spotifySessionJWT) return;
    const spotifySession = jwt.decode(spotifySessionJWT);
    if (!spotifySession?.accessToken) return;
    setAccessToken(spotifySession.accessToken);
    spotifyApi.setAccessToken(spotifySession.accessToken);
  };

  const initUser = async () => {
    try {
      const userData = await spotifyApi.getMe();
      console.debug('Some information about the authenticated user', userData.body);
      const username = userData.body.id;
      const playlistData = await spotifyApi.getUserPlaylists(username);
      console.debug("Some information about the user's playlists", playlistData.body.items);
      setUser(userData.body);
      const rawPlaylists = playlistData.body.items;
      setUserPlaylists(() => parsePlaylists(rawPlaylists));
    } catch (err) {
      console.debug('Something went wrong fetching your Spotify Information!', err);
    }
  };

  const initRecommendedPlaylists = () => {
    spotifyApi
      .getPlaylistsForCategory('focus', { limit: 7 })
      .then((data) => {
        setFocusPlaylists(() => parsePlaylists(data?.body?.playlists?.items));
      })
      .catch((err) => {
        console.log('Something went wrong!', err);
      });

    spotifyApi
      .getPlaylistsForCategory('kpop', { limit: 7 })
      .then((data) => {
        setKpopPlaylists(() => parsePlaylists(data?.body?.playlists?.items));
      })
      .catch((err) => {
        console.log('Something went wrong!', err);
      });

    spotifyApi
      .searchPlaylists('cafe', { limit: 7 })
      .then((data) => {
        setCafePlaylists(() => parsePlaylists(data?.body?.playlists?.items));
      })
      .catch((err) => {
        console.log('Something went wrong!', err);
      });

    spotifyApi
      .searchPlaylists('study', { limit: 7 })
      .then((data) => {
        setStudyPlaylists(() => parsePlaylists(data?.body?.playlists?.items));
      })
      .catch((err) => {
        console.log('Something went wrong!', err);
      });

    spotifyApi
      .searchPlaylists('piano', { limit: 7 })
      .then((data) => {
        setPianoPlaylists(() => parsePlaylists(data?.body?.playlists?.items));
      })
      .catch((err) => {
        console.log('Something went wrong!', err);
      });
  };

  useEffect(() => {
    getAccessTokenFromCookies();
    initUser();
    initRecommendedPlaylists();
  }, []);

  const value = {
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
    currentTrack,
    setCurrentTrack,
    trackUri,
    setTrackUri,
    nextTracks,
    setNextTracks,
  };

  return <SpotifyContext.Provider value={value}>{children}</SpotifyContext.Provider>;
}

SpotifyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
