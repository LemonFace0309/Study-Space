import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useTranslation } from 'next-i18next';
import { useRecoilState, useRecoilValue } from 'recoil';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import makeStyles from '@mui/styles/makeStyles';

import * as authState from 'atoms/auth';

const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.primary.dark,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imageContainer: {
    width: theme.spacing(32),
    height: theme.spacing(32),
    [theme.breakpoints.down('lg')]: {
      width: theme.spacing(24),
      height: theme.spacing(24),
    },
    [theme.breakpoints.down('md')]: {
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
    overflow: 'hidden',
    borderRadius: '50%',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageOverlay: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.primary.contrastText,
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    transition: 'all 0.2s ease-in-out',
    '& > h6': {
      display: 'none',
      transition: 'all 0.2s ease-in-out',
    },
    '&:hover': {
      background: 'rgba(0,0,0,0.4)',
      '& > h6': {
        display: 'block',
      },
      '& > input': {
        cursor: 'pointer',
      },
    },
  },
  largeAvatar: {
    height: '100%',
    width: '100%',
    display: 'flex',
    '&:hover': {
      backgroundColor: 'rgba(128,128,128,0.75)',
    },
  },
}));

const AccountDetails = ({ user, editMode, saveChanges, setSaveChanges, setEditMode }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [serverError, setServerError] = useState(false);
  const [userImage, setUserImage] = useState(user?.image);
  const [newImage, setNewImage] = useState(null);
  const [username, setUsername] = useRecoilState(authState.username);
  const [email, setEmail] = useRecoilState(authState.email);
  const [phoneNumber, setPhoneNumber] = useRecoilState(authState.phoneNumber);
  const validUsername = useRecoilValue(authState.validUsername);
  const validPhoneNumber = useRecoilValue(authState.validPhoneNumber);
  const validEmail = useRecoilValue(authState.validEmail);

  const fileRef = useRef();

  useEffect(() => {
    setUsername(user?.username ?? '');
    setEmail(user?.email ?? '');
    setPhoneNumber(user?.phoneNumber ?? '');
  }, []);

  useEffect(() => {
    const save = async () => {
      if (saveChanges) {
        const [passed, message] = await handleUpdateProfile();
        if (newImage) await handleUpdateImage();
        setSaveChanges(false);
        if (!passed) {
          alert(message ?? t('LABEL_SUCCESS_CHANGE_PROFILE'));
          setEditMode(true);
        } else {
          alert(message ?? t('LABEL_ERROR_SERVER'));
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

  const handleImagePreview = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setNewImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    fileRef.current = e.target.files[0];
  };

  const handleUpdateImage = async () => {
    const formData = new FormData();

    formData.append('image', fileRef.current);
    formData.append('id', user._id);

    try {
      const response = await axios.patch('/api/profile/update-image', formData, {
        headers: { 'content-type': 'multipart/form-data' },
        onUploadProgress: (event) => {
          console.debug(`Current progress:`, Math.round((event.loaded * 100) / event.total));
        },
      });
      console.debug(response);
      setUserImage(response.data.data.Location);
    } catch (err) {
      console.debug(err);
    }

    console.debug(fileRef.current);
    fileRef.current = null;
    setNewImage(null);
  };

  const handleUpdateProfile = async () => {
    const jsonData = {
      id: user._id,
      username,
      email,
      phoneNumber,
    };

    try {
      const response = await axios.patch('/api/profile/update-profile', jsonData, {
        onUploadProgress: (event) => {
          console.debug(`Current progress:`, Math.round((event.loaded * 100) / event.total));
        },
      });
      console.debug(response);
      return [true, response?.data.message];
    } catch (err) {
      setServerError(true);
      return [false, err?.response?.data?.message];
    }
  };

  return (
    <Grid container direction="row" spacing={3}>
      <Grid container item xs={12} sm={5} alignItems="flex-end">
        <Typography className={classes.title} variant="h5">
          {user?.name}
        </Typography>
      </Grid>
      <Grid item sm={7} />
      <Grid container spacing={3} className="mb-4">
        <Grid container item xs={12} sm={5} justifyContent="center" alignItems="center">
          <div className={classes.imageContainer}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="Your Profile Pic" src={newImage ?? userImage} className={classes.largeAvatar} />
            {editMode && (
              <div className={classes.imageOverlay}>
                <Typography variant="subtitle1" className="uppercase p-2 text-center">
                  {t('LABEL_CHANGE_PROFILE_PICTURE')}
                </Typography>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  className="absolute w-full h-full opacity-0"
                  onChange={handleImagePreview}
                />
              </div>
            )}
          </div>
        </Grid>
        <Grid item xs={12} sm={7} className="pr-4">
          <Typography className="capitalize" variant="subtitle1" gutterBottom>
            {t('LABEL_USERNAME')}
          </Typography>
          <TextField
            disabled={!editMode}
            variant="outlined"
            fullWidth
            value={username}
            error={username !== '' && (!validUsername || serverError)}
            helperText={!validUsername && t('LABEL_VALID_USERNAME')}
            onChange={(e) => setUsername(e.target.value)}
            className="mb-2"
          />
          <Typography className="capitalize" variant="subtitle1" gutterBottom>
            {t('LABEL_EMAIL')}
          </Typography>
          <TextField
            disabled={!editMode}
            variant="outlined"
            fullWidth
            value={email}
            helperText={!validEmail && t('LABEL_VALID_EMAIL')}
            error={!validEmail || serverError}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-2"
          />
          <Typography className="capitalize" variant="subtitle1" gutterBottom>
            {t('LABEL_PHONE')}
          </Typography>
          <TextField
            disabled={!editMode}
            variant="outlined"
            fullWidth
            value={phoneNumber}
            error={phoneNumber !== '' && (!validPhoneNumber || serverError)}
            helperText={!validPhoneNumber && t('LABEL_VALID_PHONE')}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="mb-2"
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

AccountDetails.propTypes = {
  user: PropTypes.object.isRequired,
  editMode: PropTypes.bool.isRequired,
  saveChanges: PropTypes.bool.isRequired,
  setSaveChanges: PropTypes.func.isRequired,
  setEditMode: PropTypes.func.isRequired,
};

export default AccountDetails;
