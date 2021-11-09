import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Dialog, Typography, Switch, FormControl, Radio, RadioGroup, FormControlLabel } from '@mui/material';

import LAYOUT_ENUM from '@/context/spaces/libs/layoutEnum';

const ParticipantsDialog = ({ open, setOpen, layoutOptions, setLayout: setVideoLayout }) => {
  const { t } = useTranslation();
  const [layout, setLayout] = useState(layoutOptions.TILED);
  const [showParticipants, setShowParticipants] = useState(true);

  const toggleParticipants = () => {
    setShowParticipants((participants) => !participants);
  };

  const handleLayoutChange = (e) => {
    setLayout(e.target.value);
    setVideoLayout(e.target.value);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg" className="p-5">
      <Grid className="p-5 flex flex-col align-items-center justify-items-center">
        <Typography variant="h4" component="h1" sx={{ color: 'primary.dark' }} className="font-bold my-4">
          {t('LABEL_CHANGE_LAYOUT')}
        </Typography>
        <div>
          <Typography variant="subtitle1" component="span">
            {t('LABEL_SHOW_PARTICIPANTS')}
          </Typography>
          <Switch checked={showParticipants} onChange={toggleParticipants} color="primary" />
        </div>
        <div className="flex flex-col w-100">
          <FormControl component="fieldset">
            <RadioGroup aria-label="Participant layout options" value={layout} onChange={handleLayoutChange}>
              {Object.entries(layoutOptions).map((option) => (
                <FormControlLabel
                  key={option[0]}
                  disabled={!showParticipants}
                  value={option[1]}
                  control={<Radio />}
                  label={option[1]}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </div>
      </Grid>
    </Dialog>
  );
};

ParticipantsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  layoutOptions: PropTypes.object,
  setLayout: PropTypes.func.isRequired,
};

ParticipantsDialog.defaultProps = {
  layoutOptions: LAYOUT_ENUM,
};

export default ParticipantsDialog;
