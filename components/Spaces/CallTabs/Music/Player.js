import { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

import { useSpotify } from './SpotifyProvider';

const Player = () => {
  const { accessToken, trackUri, setCurrentTrack, setNextTracks } = useSpotify();
  const [play, setPlay] = useState(false);

  useEffect(() => setPlay(true), [trackUri]);

  if (!accessToken) return null;
  return (
    <SpotifyPlayer
      token={accessToken}
      showSaveIcon
      callback={(state) => {
        if (!state.isPlaying) setPlay(false);
        setCurrentTrack({
          artist: state?.track?.artists,
          title: state?.track?.name,
          uri: state?.track?.uri,
          albumUrl: state?.track?.image,
        });
        setNextTracks(state.nextTracks ?? []);
      }}
      play={play}
      uris={trackUri ? [trackUri] : []}
    />
  );
};

export default Player;
