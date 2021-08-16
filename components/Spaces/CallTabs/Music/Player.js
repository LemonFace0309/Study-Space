import { useState, useEffect } from 'react';
import { isEqual } from 'lodash';
import SpotifyPlayer from 'react-spotify-web-playback';

import { useSpotify } from './SpotifyProvider';

const Player = () => {
  const { accessToken, queue, queueURIs, setCurrentTrack, setNextTracks } = useSpotify();
  const [play, setPlay] = useState(false);

  useEffect(() => setPlay(true), [queueURIs]);

  const setCurrentAndNextTracks = (state) => {
    const currentTrack = {
      artist: state?.track?.artists,
      title: state?.track?.name,
      uri: state?.track?.uri,
      albumUrl: state?.track?.image,
    };
    const nextTracks = state.nextTracks.map((track) => ({
      artist: track?.artists[0].name,
      title: track?.name,
      uri: track?.uri,
      albumUrl: track?.album?.images[0].url,
    }));
    // must do since nextTracks only returns a maximum of 2 tracks
    const returnedTracks = [currentTrack, ...nextTracks];
    const queueClone = [...queue];
    let nextTracksExtened = [];
    for (let i = 0; i < queueClone.length; ++i) {
      if (
        queueClone[i]?.uri === returnedTracks[0].uri &&
        (!returnedTracks[1] || queueClone[i + 1]?.uri == returnedTracks[1]?.uri) &&
        (!returnedTracks[2] || queueClone[i + 2]?.uri == returnedTracks[2]?.uri)
      ) {
        nextTracksExtened = queueClone.slice(i + 1);
        break;
      }
    }
    setCurrentTrack(currentTrack);
    setNextTracks(nextTracksExtened);
  };

  if (!accessToken) return null;
  return (
    <SpotifyPlayer
      token={accessToken}
      name="Productify"
      showSaveIcon
      magnifySliderOnHover
      callback={(state) => {
        if (!state.isPlaying) setPlay(false);
        setCurrentAndNextTracks(state);
      }}
      play={play}
      uris={queueURIs}
    />
  );
};

export default Player;
