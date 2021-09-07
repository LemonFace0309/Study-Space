import { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

import { useSpotifyContext } from '@/context/spaces/SpotifyContext';

const Player = () => {
  const { accessToken, queue, queueURIs, setCurrentTrack, setNextTracks } = useSpotifyContext();
  const [play, setPlay] = useState(false);

  useEffect(() => setPlay(true), [queueURIs]);

  const setCurrentAndNextTracks = (state) => {
    const currentTrack = {
      artist: state?.track?.artists,
      title: state?.track?.name,
      uri: state?.track?.uri,
      albumUrl: state?.track?.image,
    };
    const nextTracks = state.nextTracks.map((track) => {
      const artists = track?.artists.map((artist) => artist.name);

      return {
        artist: artists.join(', '),
        title: track?.name,
        uri: track?.uri,
        albumUrl: track?.album?.images[0].url,
      };
    });
    // must do since nextTracks only returns a maximum of 2 tracks
    const returnedTracks = [currentTrack, ...nextTracks];
    const queueClone = [...queue];
    let nextTracksExtened = [];
    // finding place in queue and setting next tracks and current track to match the proper tracks.
    for (let i = 0; i < queueClone.length; ++i) {
      if (
        queueClone[i]?.title === returnedTracks[0].title &&
        (!returnedTracks[1] || queueClone[i + 1]?.title == returnedTracks[1]?.title) &&
        (!returnedTracks[2] || queueClone[i + 2]?.title == returnedTracks[2]?.title)
      ) {
        nextTracksExtened = queueClone.slice(i + 1);
        break;
      }
    }
    setCurrentTrack(currentTrack);
    setNextTracks(nextTracksExtened.length > 0 ? nextTracksExtened : nextTracks);
  };

  if (!accessToken) return null;
  return (
    <SpotifyPlayer
      token={accessToken}
      name="Productify"
      initialVolume={0.5}
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
