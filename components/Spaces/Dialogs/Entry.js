import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { uniqueNamesGenerator, colors, animals } from 'unique-names-generator';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Entry = ({ updateUsername }) => {
  const [open, setOpen] = useState(true);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const randomName = uniqueNamesGenerator({
      dictionaries: [colors, animals],
      style: 'capital',
      separator: ' ',
    });
    setUsername(randomName);
  }, []);

  const handleSubmit = () => {
    const validUsername = updateUsername(username);
    if (validUsername) setOpen(false);
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>Please enter the name you&#39;d like to be displayed.</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          type="text"
          fullWidth
          variant="standard"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit}>Enter</Button>
      </DialogActions>
    </Dialog>
  );
};

Entry.propTypes = {
  updateUsername: PropTypes.function,
};

Entry.defaultProps = {
  updateUsername: () => false,
};

export default Entry;
