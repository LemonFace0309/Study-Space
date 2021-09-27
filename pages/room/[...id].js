import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import addMilliseconds from 'date-fns/addMilliseconds';
import { useSetRecoilState } from 'recoil';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Grid } from '@material-ui/core';

import { RoomProvider } from '@/context/spaces';
import CallOptions from '@/components/Spaces/VideoOptions/CallOptions';
import VideoStreams, { LAYOUT_OPTIONS } from '@/components/Spaces/VideoStreams';
import CallTabs from '@/components/Spaces/CallTabs';

import * as spotifyState from '@/atoms/spotify';

const Room = ({ roomId, spotifyAuthURL, spotifyData }) => {
  const router = useRouter();
  const [showTabs, setShowTabs] = useState(false);
  const [layout, setLayout] = useState(LAYOUT_OPTIONS.TILED);
  const setRoomID = useSetRecoilState(spotifyState.roomId);
  const setSpotifyAuthURL = useSetRecoilState(spotifyState.spotifyAuthURL);
  const setSpotifyRefresh = useSetRecoilState(spotifyState.refresh);

  const initRecoilState = () => {
    setRoomID(roomId);
    setSpotifyAuthURL(spotifyAuthURL);
    if (spotifyData) {
      // redirected back to room and user clicked signed into Spotify in call tab.
      const expiresIn = spotifyData.expiresIn * 1000;
      const date = new Date();
      const expireDate = addMilliseconds(date, expiresIn);
      const refreshDate = addMilliseconds(date, expiresIn / 4);
      setSpotifyRefresh({ expiresIn, expireDate, refreshDate });
      console.debug('Successfully authenticated with shopify:', spotifyData);
      // replaces url query to prevent user from copying/pasting space url to friends with unnecessary data
      router.replace('/room/[...id]', `/room/${roomId}`);
    }
  };

  useEffect(() => {
    initRecoilState();
  }, []);

  return (
    <RoomProvider>
      <Grid container className="p-10 relative flex-row justify-between h-screen bg-gray-50">
        <CallOptions setLayout={setLayout} />
        <VideoStreams layout={layout} showTabs={showTabs} />
        <CallTabs roomId={roomId} showTabs={showTabs} setShowTabs={setShowTabs} spotifyAuthURL={spotifyAuthURL} />
      </Grid>
    </RoomProvider>
  );
};

export async function getServerSideProps({ locale, params, query }) {
  let spotifyData = null;
  if (query && query.data) {
    try {
      spotifyData = JSON.parse(query.data);
    } catch (err) {
      console.debug('Error occured while trying to parse spotify data from url query:', err);
    }
  }

  return {
    props: {
      roomId: params.id[0],
      spotifyAuthURL: `https://accounts.spotify.com/authorize?client_id=${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${process.env.SPOTIFY_REDIRECT_URI}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`,
      ...(await serverSideTranslations(locale, ['common'])),
      spotifyData,
    },
  };
}

Room.propTypes = {
  roomId: PropTypes.string.isRequired,
  spotifyAuthURL: PropTypes.string.isRequired,
  spotifyData: PropTypes.object,
};

export default Room;
