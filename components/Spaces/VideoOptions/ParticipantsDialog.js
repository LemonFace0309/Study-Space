import { useState } from 'react';

import PropTypes from 'prop-types';
import { Grid, Dialog, Typography, Switch, FormControl, Radio, RadioGroup, FormControlLabel } from '@material-ui/core';
import { useTheme } from '@material-ui/core';

const ParticipantsDialog = ({ open, setOpen, layoutOptions }) => {
  const theme = useTheme();
  const [layout, setLayout] = useState(layoutOptions[0]?.value ?? 'tiled');
  const [showParticipants, setShowParticipants] = useState(true);

  const toggleParticipants = () => {
    setShowParticipants((participants) => !participants);
  };

  const handleLayoutChange = (event) => {
    setLayout(event.target.value);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} maxWidth="lg" className="p-5">
      <Grid className="p-5 flex flex-col align-items-center justify-items-center">
        <Typography
          variant="h4"
          component="h1"
          style={{ color: theme.palette.primary.dark }}
          className="font-bold my-4">
          Change Layout
        </Typography>
        <div>
          <Typography variant="subtitle1" component="span">
            Show Participants
          </Typography>
          <Switch checked={showParticipants} onChange={toggleParticipants} color="primary" />
        </div>
        <div className="flex flex-col w-100">
          <FormControl component="fieldset">
            <RadioGroup aria-label="Participant layout options" value={layout} onChange={handleLayoutChange}>
              {layoutOptions.map((option) => (
                <FormControlLabel
                  key={option.value}
                  disabled={!showParticipants}
                  value={option.value}
                  control={<Radio />}
                  label={option.label}
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
  layoutOptions: PropTypes.array.isRequired,
};

ParticipantsDialog.defaultProps = {
  layoutOptions: [
    { value: 'tiled', label: 'Tiled' },
    { value: 'list', label: 'List' },
    { value: 'main', label: 'Main Speaker' },
  ],
};

export default ParticipantsDialog;
