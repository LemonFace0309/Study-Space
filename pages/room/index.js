import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v1 as uuid } from 'uuid';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/client';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Button, Paper, Typography, TextField, CircularProgress } from '@material-ui/core';

const CreateRoom = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [roomID, setRoomID] = useState('');
  const [session, setSession] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initSession = async () => {
      const userSession = getSession();
      setSession(userSession);
    };
    initSession();
  }, []);

  const createNewSpace = async () => {
    setLoading(true);

    const id = uuid();

    // TODO: Use session to get current user
    const currentUser = await axios.get('/api/user/get-user', {
      params: {
        name: 'Eden Chan',
        email: 'edenchan717@gmail.com',
      },
    });

    const currentUserId = currentUser.data.user._id;

    const result = await axios.post('/api/spaces/create-new-space', {
      name: 'TA Session',
      description: 'finals grind, upper years available in chat for help with past exams',
      music: 'none',
      isActive: true,
      participants: [{ currentUserId }],
      spaceId: id,
    });

    router.push(`/room/${id}`);
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
          {session && (
            <Button fullWidth variant="contained" color="primary" className="my-2" onClick={createNewSpace}>
              {t('LABEL_CREATE_SPACE')}
            </Button>
          )}
          {loading && <CircularProgress />}
        </div>
      </Paper>
    </div>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default CreateRoom;
