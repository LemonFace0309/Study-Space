import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import addMilliseconds from 'date-fns/addMilliseconds';
import { useSetRecoilState } from 'recoil';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Grid from '@mui/material/Grid';

import { SpaceProvider } from '@/context/spaces';
import VideoStreams from '@/components/Spaces/VideoStreams';
import CallTabs from '@/components/Spaces/CallTabs';
import * as spotifyState from '@/atoms/spotify';

const CallOptions = dynamic(() => import('@/components/Spaces/VideoOptions/CallOptions'));

const Room = ({ roomId, spotifyAuthURL }) => {
  const router = useRouter();
  const [showTabs, setShowTabs] = useState(false);
  const setRoomId = useSetRecoilState(spotifyState.roomId);
  const setSpotifyAuthURL = useSetRecoilState(spotifyState.spotifyAuthURL);
  const setSpotifyRefresh = useSetRecoilState(spotifyState.refresh);

  const initRecoilState = () => {
    setRoomId(roomId);
    setSpotifyAuthURL(spotifyAuthURL);
    if (router.query && router.query.data) {
      const spotifyData = JSON.parse(router.query.data);

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
    <SpaceProvider>
      <Grid container className="p-10 relative flex-row justify-between min-h-screen md:h-screen bg-gray-50">
        {/* <VideoStreams showTabs={showTabs} />
        <CallOptions />
        <CallTabs showTabs={showTabs} setShowTabs={setShowTabs} spotifyAuthURL={spotifyAuthURL} /> */}
      </Grid>
    </SpaceProvider>
  );
};

export const getStaticPaths = () => {
  return {
    paths: [{ params: { id: ['1'] } }],
    fallback: true,
  };
};

export const getStaticProps = async ({ locale, params }) => {
  return {
    props: {
      roomId: params.id[0],
      spotifyAuthURL: `https://accounts.spotify.com/authorize?client_id=${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${process.env.SPOTIFY_REDIRECT_URI}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`,
      ...(await serverSideTranslations(locale, [])),
    },
  };
};

Room.propTypes = {
  roomId: PropTypes.string.isRequired,
  spotifyAuthURL: PropTypes.string.isRequired,
};

export default Room;
