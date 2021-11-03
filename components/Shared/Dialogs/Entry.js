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
import CircularProgress from '@mui/material/CircularProgress';

const Entry = ({ roles, updateUsername, updateRole }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(true);
  const [username, setUsername] = useState('');
  const [role, setRole] = useState(roles[0].value);
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
    console.debug(roles.some((obj) => obj.value == role));
    setPasswordAPI(roles.find((obj) => obj.value == role && obj.password)?.password ?? '');
    setPassword('');
  }, [role]);

  const handleSubmit = async () => {
    setIsLoading(true);
    if (passwordAPI) {
      const result = await axios.post(passwordAPI, { password });
      if (!result.data.valid) {
        setError('Invalid Passcode');
        setIsLoading(false);
        return;
      }
    }

    updateRole(role);
    const validUsername = updateUsername(username, role);
    if (validUsername) setOpen(false);
    setIsLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.keyCode == 13) {
      handleSubmit();
    }
  };

  return (
    <Dialog open={open}>
      <DialogTitle>
        Welcome
        {error && <Typography sx={{ color: 'red' }}>{error}</Typography>}
      </DialogTitle>
      <form>
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
            onKeyDown={handleKeyPress}
          />
          {roles.length > 1 && (
            <FormControl component="fieldset">
              <FormLabel component="legend">I am a</FormLabel>
              <RadioGroup row aria-label="Role" value={role} onChange={(e) => setRole(e.target.value)}>
                {roles.map((role) => (
                  <FormControlLabel key={role.value} value={role.value} control={<Radio />} label={role.value} />
                ))}
              </RadioGroup>
            </FormControl>
          )}
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            value={password}
            sx={{ mt: 0, display: passwordAPI ? 'block' : 'none' }}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyPress}
          />
        </DialogContent>
      </form>
      <DialogActions>
        {isLoading && <CircularProgress sx={{ mr: 1 }} />}
        <Button onClick={handleSubmit}>Enter</Button>
      </DialogActions>
    </Dialog>
  );
};

Entry.propTypes = {
  roles: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  updateUsername: PropTypes.func.isRequired,
  updateRole: PropTypes.func.isRequired,
};

export default Entry;
