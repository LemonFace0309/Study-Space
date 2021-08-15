import { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

import { useSpotify } from './SpotifyProvider';

const Player = () => {
  const { accessToken, queueURIs, setQueue } = useSpotify();
  const [play, setPlay] = useState(false);

  useEffect(() => setPlay(true), [queueURIs]);

  if (!accessToken) return null;
  return (
    <SpotifyPlayer
      token={accessToken}
      showSaveIcon
      callback={(state) => {
        if (!state.isPlaying) setPlay(false);
        // const currentTrack = {
        //   artist: state?.track?.artists,
        //   title: state?.track?.name,
        //   uri: state?.track?.uri,
        //   albumUrl: state?.track?.image,
        // };
        // const nextTracks = state.nextTracks.map((track) => ({
        //   artist: track?.artists[0].name,
        //   title: track?.name,
        //   uri: track?.uri,
        //   albumUrl: track?.album?.images[0].url,
        // }));
        // setQueue([currentTrack, ...nextTracks]);
      }}
      play={play}
      uris={queueURIs}
    />
  );
};

export default Player;
