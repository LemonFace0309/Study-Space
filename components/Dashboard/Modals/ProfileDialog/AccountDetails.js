import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import * as authState from '../../../../atoms/auth';

const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.primary.dark,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  largeAvatar: {
    width: theme.spacing(32),
    height: theme.spacing(32),
    [theme.breakpoints.down('md')]: {
      width: theme.spacing(24),
      height: theme.spacing(24),
    },
    [theme.breakpoints.down('sm')]: {
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
}));

const AccountDetails = ({ session, editMode, saveChanges, setSaveChanges, setEditMode }) => {
  const classes = useStyles();
  const [serverError, setServerError] = useState(false);
  const [userImage, setUserImage] = useState(session?.user?.image);
  const [username, setUsername] = useRecoilState(authState.username);
  const [email, setEmail] = useRecoilState(authState.email);
  const [phoneNumber, setPhoneNumber] = useRecoilState(authState.phoneNumber);
  const validUsername = useRecoilValue(authState.validUsername);
  const validPhoneNumber = useRecoilValue(authState.validPhoneNumber);
  const validEmail = useRecoilValue(authState.validEmail);

  const fileInputRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    setUsername(session?.user?.username ?? '');
    setEmail(session?.user?.email ?? '');
    setPhoneNumber(session?.user?.phoneNumber ?? '');
  }, []);

  useEffect(() => {
    const save = async () => {
      if (saveChanges) {
        const passed = await handleUpdateProfile();
        setSaveChanges(false);
        if (!passed) {
          setEditMode(true);
        }
      }
    };
    save();
  }, [editMode]);

  useEffect(() => {
    if (serverError) {
      setServerError(false);
    }
  }, [username, email, phoneNumber]);

  const handleUpdateImage = async () => {
    if (!fileInputRef.current.files?.length) {
      return;
    }

    const formData = new FormData();

    Array.from(fileInputRef.current.files).forEach((file) => {
      formData.append(fileInputRef.current.name, file);
    });

    formData.append('id', session?.user._id);

    // for (let key of formData.entries()) {
    //   console.log(key[0] + ', ' + key[1]);
    // }

    try {
      const response = await axios.patch('/api/profile/update-image', formData, {
        headers: { 'content-type': 'multipart/form-data' },
        onUploadProgress: (event) => {
          console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
        },
      });
      console.debug(response);
      setUserImage(response.data.data.Location);
    } catch (err) {
      console.debug(err);
    }

    formRef.current?.reset();
  };

  const handleUpdateProfile = async () => {
    const jsonData = {
      id: session?.user._id,
      username,
      email,
      phoneNumber,
    };

    try {
      const response = await axios.patch('/api/profile/update-profile', jsonData, {
        onUploadProgress: (event) => {
          console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
        },
      });
      console.debug(response);
      alert(response?.data.message ?? 'You account info has been updated sucessfully 😃');
      return true;
    } catch (err) {
      setServerError(true);
      alert(err?.response?.data?.message ?? 'Internal Server Error');
      return false;
    }
  };

  return (
    <Grid container direction="row" spacing={3}>
      <Grid container item xs={12} sm={5} justify="center" alignItems="flex-end">
        <Typography className={classes.title} variant="h4">
          {session?.user?.name}
        </Typography>
      </Grid>
      <Grid item sm={7} />
      <Grid container spacing={3} className="mb-4">
        <Grid container item xs={12} sm={5} justify="center" alignItems="center">
          <Avatar alt="Your Profile Picture" src={userImage} className={classes.largeAvatar} />
        </Grid>
        <Grid item xs={12} sm={7} className="pr-4">
          <Typography className="capitalize" variant="subtitle1" gutterBottom>
            Username
          </Typography>
          <TextField
            disabled={!editMode}
            variant="outlined"
            fullWidth
            value={username}
            error={username !== '' && (!validUsername || serverError)}
            helperText={
              !validUsername &&
              'Must be between 8-12 alphanumeric, underscore, and dot characters. Underscore and dot cannot be adjacent.'
            }
            onChange={(e) => setUsername(e.target.value)}
            className="mb-2"
          />
          <Typography className="capitalize" variant="subtitle1" gutterBottom>
            Email
          </Typography>
          <TextField
            disabled={!editMode}
            variant="outlined"
            fullWidth
            value={email}
            helperText={!validEmail && 'Must be a valid email.'}
            error={!validEmail || serverError}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-2"
          />
          <Typography className="capitalize" variant="subtitle1" gutterBottom>
            Phone Number
          </Typography>
          <TextField
            disabled={!editMode}
            variant="outlined"
            fullWidth
            value={phoneNumber}
            error={phoneNumber !== '' && (!validPhoneNumber || serverError)}
            helperText={!validPhoneNumber && 'Must be a valid phone number.'}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="mb-2"
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

AccountDetails.propTypes = {
  session: PropTypes.shape({
    user: PropTypes.object.isRequired,
  }).isRequired,
  editMode: PropTypes.bool.isRequired,
  saveChanges: PropTypes.bool.isRequired,
  setSaveChanges: PropTypes.func.isRequired,
  setEditMode: PropTypes.func.isRequired,
};

export default AccountDetails;
