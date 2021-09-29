import { useTranslation } from 'next-i18next';
import { uniqueId } from 'lodash';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Button, Grid, Dialog, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Assignment } from '@mui/icons-material';

const useStyles = makeStyles(() => ({
  paper: {
    borderRadius: '0.375rem',
  },
}));

const People = ({ participants, username }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const router = useRouter();
  const roomId = router.query;
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="p-2">
      {t('LABEL_PEOPLE')}
      <Button variant="contained" color="primary" fullWidth className="mt-1 mb-2" onClick={() => setModalOpen(true)}>
        {t('LABEL_INVITE')}
      </Button>
      {participants.map((p) => (
        <p key={uniqueId(p)}>
          {p} {username == p && '(You)'}
        </p>
      ))}
      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        classes={{ paper: classes.paper }}
        fullWidth
        maxWidth="md">
        <Grid className="p-5 flex flex-col align-items-center justify-items-center">
          <Typography
            variant="h6"
            component="h1"
            style={{ color: '#4E3276', textAlign: 'center' }}
            className="font-bold">
            {roomId.id}
          </Typography>
          <CopyToClipboard text={roomId.id}>
            <Button variant="contained" color="primary" fullWidth startIcon={<Assignment fontSize="large" />}>
              {t('LABEL_COPY_ROOM_ID')}
            </Button>
          </CopyToClipboard>
        </Grid>
      </Dialog>
    </div>
  );
};

People.propTypes = {
  username: PropTypes.string,
  participants: PropTypes.array,
};

export default People;
