import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import * as authState from '../../../../atoms/auth';

const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.primary.dark,
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
  },
}));

const ChangePassword = ({ session, editMode, saveChanges, setSaveChanges }) => {
  const classes = useStyles();
  const [serverError, setServerError] = useState(false);
  const [currentPassword, setCurrentPassword] = useRecoilState(authState.password);
  const [newPassword1, setNewPassword1] = useRecoilState(authState.newPassword1);
  const [newPassword2, setNewPassword2] = useRecoilState(authState.newPassword2);
  const validNewPassword = useRecoilValue(authState.validNewPassword);
  const newPasswordsMatch = useRecoilValue(authState.newPasswordsMatch);

  useEffect(() => {
    if (saveChanges) {
      handleUpdatePassword();
      setSaveChanges(false);
    }
  }, [editMode]);

  useEffect(() => {
    if (serverError) {
      setServerError(false);
    }
  }, [currentPassword, newPassword1, newPassword2]);

  const handleUpdatePassword = async () => {
    const jsonData = {
      id: session?.user?._id,
      currentPassword,
      newPassword1,
      newPassword2,
    };

    try {
      const response = await axios.patch('/api/profile/update-password', jsonData, {
        onUploadProgress: (event) => {
          console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
        },
      });
      console.debug(response);
      alert(response?.data.message ?? 'Password updated succesfully 😃');
      setCurrentPassword('');
      setNewPassword1('');
      setNewPassword2('');
    } catch (err) {
      setServerError(true);
      alert(err?.response?.data?.message ?? 'Internal Server Error');
    }
  };

  if (!session?.user.type || session?.user.type !== 'credentials') {
    return (
      <Typography variant="h6" className={classes.title}>
        Cannot change password for users signed up through third party services like Google or Facebook.
      </Typography>
    );
  }

  return (
    <Grid container direction="row" spacing={3}>
      <Typography variant="h6" className={classes.title}>
        Enter your current and new password
      </Typography>
      <Grid item xs={12} md={6}>
        <form>
          <Typography className="capitalize" variant="subtitle1" gutterBottom>
            Current Password
          </Typography>
          <TextField
            disabled={!editMode}
            variant="outlined"
            fullWidth
            type="password"
            value={currentPassword}
            error={serverError}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="mb-2"
          />
          <Typography className="capitalize" variant="subtitle1" gutterBottom>
            New Password
          </Typography>
          <TextField
            disabled={!editMode}
            variant="outlined"
            fullWidth
            type="password"
            value={newPassword1}
            error={(newPassword1 !== '' && !validNewPassword) || serverError}
            helperText={
              !validNewPassword &&
              'Minimum eight characters. At least one letter, one number and one special character is required.'
            }
            onChange={(e) => setNewPassword1(e.target.value)}
            className="mb-2"
          />
          <Typography className="capitalize" variant="subtitle1" gutterBottom>
            Confirm New Password
          </Typography>
          <TextField
            disabled={!editMode}
            variant="outlined"
            fullWidth
            type="password"
            value={newPassword2}
            error={(newPassword2 !== '' && !newPasswordsMatch) || serverError}
            helperText={newPassword2 !== '' && !newPasswordsMatch && 'New passwords must match.'}
            onChange={(e) => setNewPassword2(e.target.value)}
            className="mb-2"
          />
        </form>
      </Grid>
    </Grid>
  );
};

ChangePassword.propTypes = {
  session: PropTypes.shape({
    user: PropTypes.object.isRequired,
  }).isRequired,
  editMode: PropTypes.bool.isRequired,
  saveChanges: PropTypes.bool.isRequired,
  setSaveChanges: PropTypes.func.isRequired,
};

export default ChangePassword;
