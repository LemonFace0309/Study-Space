import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { v1 as uuid } from 'uuid';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/client';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Button, Paper, Typography, TextField, CircularProgress } from '@material-ui/core';

import * as clientState from 'atoms/client';

const CreateRoom = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [roomID, setRoomID] = useState('');
  const [loading, setLoading] = useState(false);
  const [client, setClient] = useRecoilState(clientState.client);

  const initSession = async () => {
    if (client) return;

    const session = await getSession();
    const { name, email } = session.user;
    const result = await axios.get('/api/user/get-user', { params: { name, email } });
    const user = result.data.user;

    const newClient = { ...session, user };
    setClient(newClient);
  };

  useEffect(() => {
    initSession();
  }, []);

  const createNewSpace = async () => {
    setLoading(true);
    const id = uuid();
    const clientId = client._id;
    const data = {
      name: 'Pair Programming Session',
      description: '16X 🚀🚀🚀🚀',
      music: 'none',
      isActive: true,
      participants: [{ clientId }],
      spaceId: id,
    };
    const result = await axios.post('/api/spaces/create-new-space', data);

    setLoading(false);
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
          <Button fullWidth variant="contained" color="primary" className="my-2" onClick={createNewSpace}>
            {t('LABEL_CREATE_SPACE')}
          </Button>
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
