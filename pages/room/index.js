import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import addMilliseconds from 'date-fns/addMilliseconds';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { v1 as uuid } from 'uuid';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/client';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Button, Paper, Typography, TextField, CircularProgress } from '@material-ui/core';
import { useQuery, gql } from '@apollo/client';

import { initializeApollo } from '@/utils/apollo/client';
import * as clientState from 'atoms/client';
import * as spotifyState from 'atoms/spotify';

const GET_USERS = gql`
  query ($usersName: String, $usersEmail: String) {
    users(name: $usersName, email: $usersEmail) {
      _id
    }
  }
`;

const CreateRoom = ({ spotifyAuthURL, spotifyCode, newSession }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [roomID, setRoomID] = useState('');
  const [roomIsLoading, setRoomIsLoading] = useState(false);
  const [client, setClient] = useRecoilState(clientState.client);
  const setSpotifyRefresh = useSetRecoilState(spotifyState.refresh);

  useEffect(() => {
    if (spotifyCode) {
      axios
        .post('/api/spotify/login', { code: spotifyCode })
        .then((res) => {
          console.debug(res);
          const expiresIn = res.data.data.expiresIn * 1000;
          const date = new Date();
          const expireDate = addMilliseconds(date, expiresIn);
          const refreshDate = addMilliseconds(date, expiresIn / 4);
          setSpotifyRefresh({ expiresIn, expireDate, refreshDate });
          console.debug('Successfully authenticated with shopify:', res.data);
        })
        .catch((err) => console.debug(err))
        .finally(() => router.push('/room'));
    }
  }, [spotifyCode]);

  const createNewSpace = async () => {
    setRoomIsLoading(true);
    const id = uuid();

    setClient(newSession);
    const clientId = client._id;
    const data = {
      name: 'Pair Programming Session',
      description: '16X 🚀🚀🚀🚀',
      music: 'none',
      isActive: true,

      // Sample data
      participants: [{ clientId }, { clientId }, { clientId }, { clientId }, { clientId }],
      spaceId: id,
    };
    const result = await axios.post('/api/spaces/create-new-space', data);

    router.push(`/room/${id}`);
    setRoomIsLoading(false);
  };

  return (
    <div className="h-screen w-screen grid place-items-center">
      <Paper className="w-80">
        <Typography component="h1" variant="h5">
          {t('LABEL_JOIN_A_SPACE')}
        </Typography>
        <div>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Room ID"
            value={roomID}
            onChange={(e) => setRoomID(e.target.value)}
          />
          <Button fullWidth variant="contained" color="primary" onClick={() => router.push(`/room/${roomID}`)}>
            {t('LABEL_JOIN_SPACE')}
          </Button>
          <Button fullWidth variant="contained" color="primary" className="my-2" onClick={createNewSpace}>
            {t('LABEL_CREATE_SPACE')}
          </Button>
          {roomIsLoading && <CircularProgress />}
        </div>
      </Paper>
      <Button className="mt-2" href={spotifyAuthURL}>
        Login to Spotify
      </Button>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const { query, locale } = context;
  const session = await getSession(context);
  const { name, email } = session.user;

  const apolloClient = initializeApollo();
  const {
    data: { users },
  } = await apolloClient.query({
    query: GET_USERS,
    variables: { usersName: name, usersEmail: email },
  });

  const sessionUser = users[0];

  const newSession = { ...session, ...sessionUser };
  console.debug('newSession', newSession);

  return {
    props: {
      spotifyAuthURL: `https://accounts.spotify.com/authorize?client_id=${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${process.env.SPOTIFY_REDIRECT_URI}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`,
      spotifyCode: query?.code ?? '',
      ...(await serverSideTranslations(locale, ['common'])),
      newSession: JSON.parse(JSON.stringify(newSession)),
    },
  };
};

CreateRoom.propTypes = {
  spotifyAuthURL: PropTypes.string.isRequired,
  spotifyCode: PropTypes.string.isRequired,
  newSession: PropTypes.object.isRequired,
};

export default CreateRoom;
