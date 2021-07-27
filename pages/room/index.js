import React, { useState, useEffect } from 'react';
import { v1 as uuid } from 'uuid';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/client';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Button, Paper, Typography, TextField } from '@material-ui/core';

const CreateRoom = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [roomID, setRoomID] = useState('');
  const [session, setSession] = useState();

  useEffect(() => {
    const initSession = async () => {
      const userSession = getSession();
      setSession(userSession);
    };
    initSession();
  }, []);

  function create() {
    const id = uuid();
    router.push(`/room/${id}`);
  }

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
            <Button fullWidth variant="contained" color="primary" className="my-2" onClick={create}>
              {t('LABEL_CREATE_SPACE')}
            </Button>
          )}
        </div>
      </Paper>
    </div>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'spaces'])),
  },
});

export default CreateRoom;
