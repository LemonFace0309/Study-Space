import { useState } from 'react';

import PropTypes from 'prop-types';
import {
  Grid,
  Dialog,
  Typography,
  Switch,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@material-ui/core';
import { useTheme } from '@material-ui/core';

const ParticipantsDialog = ({ open, setOpen, leaveCall }) => {
  const theme = useTheme();
  const [showParticipants, setShowParticipants] = useState(true);

  const toggleParticipants = () => {
    setShowParticipants((participants) => !participants);
  };

  const [layout, setLayout] = useState('tiled');

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
          Show Participants
          <Switch checked={showParticipants} onChange={toggleParticipants} color="primary" />
        </div>
        <div className="flex flex-col w-100">
          <FormControl component="fieldset">
            <RadioGroup aria-label="gender" name="gender1" value={layout} onChange={handleLayoutChange}>
              <FormControlLabel
                disabled={showParticipants ? false : true}
                value="tiled"
                control={<Radio />}
                label="Tiled"
              />
              <FormControlLabel
                disabled={showParticipants ? false : true}
                value="list"
                control={<Radio />}
                label="List"
              />
              <FormControlLabel
                disabled={showParticipants ? false : true}
                value="main"
                control={<Radio />}
                label="Main Speaker"
              />
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
  leaveCall: PropTypes.func.isRequired,
};

export default ParticipantsDialog;
