import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { uniqueNamesGenerator, colors, animals } from 'unique-names-generator';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Typography from '@mui/material/Typography';

import ROLES from '@/context/spaces/libs/roles';

const Entry = ({ updateUsername, updateRole }) => {
  const [open, setOpen] = useState(true);
  const [username, setUsername] = useState('');
  const [role, setRole] = useState(ROLES.STUDENT.value);
  const [password, setPassword] = useState('');
  const [passwordAPI, setPasswordAPI] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const randomName = uniqueNamesGenerator({
      dictionaries: [colors, animals],
      style: 'capital',
      separator: ' ',
    });
    setUsername(randomName);
  }, []);

  useEffect(() => {
    setPasswordAPI(Object.values(ROLES).find((obj) => obj.value === role && obj.password)?.password ?? '');
    setPassword('');
  }, [role]);

  const handleSubmit = async () => {
    if (passwordAPI) {
      console.debug(password);
      const result = await axios.post(passwordAPI, { password });
      if (!result.data.valid) {
        setError('Invalid Passcode');
        return;
      }
    }

    updateRole(role);
    const validUsername = updateUsername(username);
    if (validUsername) setOpen(false);
  };

  return (
    <Dialog open={open}>
      <DialogTitle>
        Welcome
        {error && <Typography sx={{ color: 'red' }}>{error}</Typography>}
      </DialogTitle>
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
          sx={{ mb: 2.5 }}
        />
        <FormControl component="fieldset">
          <FormLabel component="legend">I am a</FormLabel>
          <RadioGroup row aria-label="Role" value={role} onChange={(e) => setRole(e.target.value)}>
            {Object.entries(ROLES).map(([key, obj]) => (
              <FormControlLabel key={key} value={obj.value} control={<Radio />} label={obj.value} />
            ))}
          </RadioGroup>
        </FormControl>
        <TextField
          margin="dense"
          label="Password"
          type="password"
          fullWidth
          variant="standard"
          value={password}
          sx={{ mt: 0, display: passwordAPI ? 'block' : 'none' }}
          onChange={(e) => setPassword(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit}>Enter</Button>
      </DialogActions>
    </Dialog>
  );
};

Entry.propTypes = {
  updateUsername: PropTypes.func.isRequired,
  updateRole: PropTypes.func.isRequired,
};

export default Entry;
