import React, { useState, useEffect } from 'react';
import { v1 as uuid } from 'uuid';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/client';

import {
  Container,
  Grid,
  Button,
  Paper,
  Typography,
  TextField,
} from '@material-ui/core';

const CreateRoom = () => {
  const router = useRouter();
  const [roomID, setRoomID] = useState('')
  const [session, setSession] = useState();


  useEffect(async () => {
    const userSession = await getSession();
    setSession(userSession);
  });

  function create() {
    const id = uuid();
    router.push(`/room/${id}`);
  }

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
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => router.push(`/room/${roomID}`)}
          >
            Join
          </Button>
          {true && <Button
            fullWidth
            variant="contained"
            color="primary"
            className="my-2"
            onClick={create}>Create room</Button>}
        </div>
      </Paper>
    </>
  );
};

export default CreateRoom;
