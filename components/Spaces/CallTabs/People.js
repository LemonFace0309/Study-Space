import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Button, Grid, Paper, Dialog, Typography, IconButton } from '@material-ui/core';
import { Assignment, Mic, MicOff, Videocam, VideocamOff } from '@material-ui/icons';

const People = ({ participants, username }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const roomID = router.query;
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {t('LABEL_PEOPLE')}
      <Button variant="contained" color="primary" fullWidth onClick={() => setModalOpen(true)}>
        {t('LABEL_INVITE')}
      </Button>
      {participants.map((p) => (
        <p key={p}>
          {p} {username == p ? '(You)' : ''}
        </p>
      ))}
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} fullWidth maxWidth="lg">
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
              {t('LABEL_COPY_ROOM_ID')}
            </Button>
          </CopyToClipboard>
        </Grid>
      </Dialog>
    </>
  );
};

People.propTypes = {
  username: PropTypes.string,
  participants: PropTypes.array,
};

export default People;
