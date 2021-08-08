import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import SpotifyWebApi from 'spotify-web-api-node';
import jwt from 'jsonwebtoken';

import getCookie from 'utils/getCookie';

const SpotifyContext = React.createContext();

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
});

export function useConversation() {
  return useContext(SpotifyContext);
}

export function SpotifyProvider({ children }) {
  useEffect(() => {
    const spotifySessionJWT = getCookie(document.cookie, 'spotify_session');
    if (!spotifySessionJWT) return;
    const spotifySession = jwt.decode(spotifySessionJWT);
    if (!spotifySession?.accessToken) return;
    spotifyApi.setAccessToken(spotifySession.accessToken);
  }, []);

  const value = {
    spotifyApi,
  };

  return <SpotifyContext.Provider value={value}>{children}</SpotifyContext.Provider>;
}

SpotifyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
