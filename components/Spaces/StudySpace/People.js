import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Button, Grid, Paper, Dialog, Typography } from '@material-ui/core';
import { Assignment } from '@material-ui/icons';

function People({ participants, username }) {
  const router = useRouter();
  const roomID = router.query;
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Paper elevation={2} className="w-90 h-full p-5 font-bold bg-white m-4">
        People
        <Button variant="contained" color="primary" fullWidth onClick={() => setModalOpen(true)}>
          Invite
        </Button>
        {participants.map((p) => (
          <p key={p}>
            {p} {username == p ? '(You)' : ''}
          </p>
        ))}
      </Paper>

      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} fullWidth fullHeight maxWidth="lg" maxHeight="lg">
        <Grid className="p-5 flex flex-col align-items-center justify-items-center">
          <Typography
            variant="h6"
            component="h1"
            style={{ color: '#4E3276', textAlign: 'center' }}
            className="font-bold">
            {roomID.id}
          </Typography>
          <CopyToClipboard text={roomID.id}>
            <Button variant="contained" color="primary" fullWidth startIcon={<Assignment fontSize="large" />}>
              Copy Room ID
            </Button>
          </CopyToClipboard>
        </Grid>
      </Dialog>
    </>
  );
}

People.propTypes = {
  username: PropTypes.string,
  participants: PropTypes.array,
};

export default People;
