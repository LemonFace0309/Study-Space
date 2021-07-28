import React, { useState, useEffect } from 'react';
import { v1 as uuid } from 'uuid';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/client';
import axios from 'axios';

import { Button, Paper, Typography, TextField, CircularProgress } from '@material-ui/core';

const CreateRoom = () => {
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
    const currentUser = await axios.get('/api/get-user', {
      params: {
        name: 'Eden Chan',
        email: 'edenchan717@gmail.com',
      },
    });

    const currentUserId = currentUser.data.user._id;

    const result = await axios.post('/api/spaces/create-new-space', {
      name: 'test name',
      description: 'test descritpion',
      isActive: true,
      participants: [{ currentUserId }],
      spaceId: id,
    });
    router.push(`/room/${id}`);
  };

  return (
    <>
      <Paper className="w-80">
        <Typography component="h1" variant="h5">
          Join A Space
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
            Join
          </Button>
          {session && (
            <Button fullWidth variant="contained" color="primary" className="my-2" onClick={createNewSpace}>
              Create room
            </Button>
          )}
          {loading && <CircularProgress />}
        </div>
      </Paper>
    </>
  );
};

export default CreateRoom;
