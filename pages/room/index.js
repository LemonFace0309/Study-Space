import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSetRecoilState } from 'recoil';
import { v1 as uuid } from 'uuid';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/client';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Button, Paper, Typography, TextField, CircularProgress } from '@material-ui/core';
import { useMutation, gql } from '@apollo/client';

import { initializeApollo } from '@/utils/apollo/client';
import * as clientState from 'atoms/client';

const GET_USER = gql`
  query ($name: String!, $email: String!) {
    user(name: $name, email: $email) {
      _id
      friends
      todos
    }
  }
`;

const CREATE_SPACE = gql`
  mutation CreateSpaceMutation($spaceInput: CreateSpaceInput!) {
    createSpace(input: $spaceInput) {
      name
      description
    }
  }
`;

const CreateRoom = ({ newSession }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [roomID, setRoomID] = useState('');
  const [roomIsLoading, setRoomIsLoading] = useState(false);
  const setClient = useSetRecoilState(clientState.client);

  const [createSpace] = useMutation(CREATE_SPACE);

  const createNewSpace = async () => {
    setRoomIsLoading(true);
    const spaceId = uuid();
    setClient(newSession);

    const clientId = newSession?._id;

    const spaceInput = {
      name: 'Pair Programming Session',
      description: '16X 🚀🚀🚀🚀',
      // Sample data
      userId: clientId,
      spaceId,
    };
    try {
      const result = await createSpace({ variables: { spaceInput } });

      console.debug('Joining Space:', result);
      router.push(`/room/${spaceId}`);
    } catch (err) {
      console.warn('Unable to join space:', err);
    }
    router.push(`/room/${spaceId}`);
  };

  return (
    <div className="h-screen w-screen grid place-items-center">
      <Paper className="w-96 p-4">
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
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const { locale } = context;
  const session = await getSession(context);
  const { name, email } = session.user;

  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: GET_USER,
    variables: { name, email },
  });

  const newSession = { ...session, ...data.user };
  console.debug('Session:', newSession);

  return {
    props: {
      newSession: JSON.parse(JSON.stringify(newSession)),
      ...(await serverSideTranslations(locale, ['common'])),
      initialApolloState: apolloClient.cache.extract(),
    },
  };
};

CreateRoom.propTypes = {
  newSession: PropTypes.object.isRequired,
};

export default CreateRoom;
