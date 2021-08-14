import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import SpotifyWebApi from 'spotify-web-api-node';
import jwt from 'jsonwebtoken';

import getCookie from 'utils/getCookie';
import getClosestImageSize from 'utils/spotify/getClosestImageSize';

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
      setUserPlaylists(() => {
        const parsedPlaylists = rawPlaylists.map((playlist) => {
          const bestImage = getClosestImageSize(playlist.images, 300);

          return {
            id: playlist.id,
            title: playlist.name,
            uri: playlist.uri,
            trackURL: playlist.tracks.href,
            image: bestImage.url,
          };
        });
        return parsedPlaylists;
      });
    } catch (err) {
      console.debug('Something went wrong fetching your Spotify Information!', err);
    }
  };

  const initRecommendedPlaylists = () => {
    spotifyApi
      .getCategories({
        limit: 50,
        offset: 0,
        country: 'BR',
      })
      .then(
        function (data) {
          console.log(data.body);
        },
        function (err) {
          console.log('Something went wrong!', err);
        }
      );
    spotifyApi.searchPlaylists('study').then(
      function (data) {
        console.log('Found playlists are', data.body);
      },
      function (err) {
        console.log('Something went wrong!', err);
      }
    );
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
