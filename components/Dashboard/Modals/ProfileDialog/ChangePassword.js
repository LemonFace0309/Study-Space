import { useEffect } from 'react';
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
  const [currentPassword, setCurrentPassword] = useRecoilState(authState.password);
  const [newPassword1, setNewPassword1] = useRecoilState(authState.newPassword1);
  const [newPassword2, setNewPassword2] = useRecoilState(authState.newPassword2);

  useEffect(() => {
    if (saveChanges) {
      // handleUpdatePassword();
      setSaveChanges(false);
    }
  }, [editMode]);

  const handleUpdatePassword = async () => {
    const jsonData = {
      id: session?.user?.id,
      currentPassword,
      newPassword1,
      newPassword2,
    };

    const response = await axios.post('/api/profile/edit-profile', jsonData, {
      headers: { 'content-type': 'multipart/form-data' },
      onUploadProgress: (event) => {
        console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
      },
    });
    console.debug(response);
  };

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
