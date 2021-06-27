import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import * as authState from '../../../atoms/auth';

const useStyles = makeStyles((theme) => ({
  dialogRoot: {
    '& > div:nth-child(3) > div': {
      borderRadius: theme.spacing(3),
    },
  },
  mainForm: {
    backgroundColor: theme.palette.primary.light,
    padding: theme.spacing(2),
  },
}));

const ProfileDialog = ({ session, isOpen, handleClose, tabs }) => {
  const classes = useStyles();
  const [tabIndex, setTabIndex] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [userImage, setUserImage] = useState(session?.user?.image);
  const [username, setUsername] = useRecoilState(authState.username);
  const [phoneNumber, setPhoneNumber] = useRecoilState(authState.phoneNumber);
  const [password, setPassword] = useRecoilState(authState.password);
  const [newPassword, setNewPassword] = useRecoilState(authState.newPassword);

  useEffect(() => {
    setUsername(session?.user?.username ?? '');
    setPhoneNumber(session?.user?.phoneNumber ?? '');
  }, []);

  const fileInputRef = useRef(null);
  const formRef = useRef(null);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (!fileInputRef.current.files?.length) {
      return;
    }

    const formData = new FormData();

    Array.from(fileInputRef.current.files).forEach((file) => {
      formData.append(fileInputRef.current.name, file);
    });

    formData.append('id', session.user._id);

    // for (let key of formData.entries()) {
    //   console.log(key[0] + ', ' + key[1]);
    // }

    const response = await axios.post('/api/profile/edit-profile', formData, {
      headers: { 'content-type': 'multipart/form-data' },
      onUploadProgress: (event) => {
        console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
      },
    });
    console.debug(response);
    setUserImage(response.data.data.Location);

    formRef.current?.reset();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      fullWidth
      maxWidth="lg"
      className={classes.dialogRoot}
      aria-labelledby="Edit Profile Dialog"
      aria-describedby="Dialog to Edit Profile">
      <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <Grid container direction="row">
          <Grid container item xs={12} md={3} className="p-4">
            <TabList>
              {tabs.map((tab) => (
                <Tab key={tab.tabName}>
                  <Button fullWidth className="justify-start pb-2">
                    {tab.tabName}
                  </Button>
                </Tab>
              ))}
            </TabList>
          </Grid>
          <Grid container item direction="row" xs={12} md={9} className={classes.mainForm}>
            {tabs.map((tab, index) => (
              <TabPanel key={index}>
                <Grid container item direction="row" xs={12} className="p-4">
                  <Typography variant="h4" gutterBottom>
                    {tab.title}
                  </Typography>
                  <Grid item xs={12}>
                    {/* <Typography variant="h3" gutterBottom>
                      {session?.user?.name}
                    </Typography> */}
                    {tab.component}
                  </Grid>
                </Grid>
              </TabPanel>
            ))}
            <Grid container item justify="flex-end">
              <Button>{editMode ? 'Edit Profile' : 'Save'}</Button>
            </Grid>
          </Grid>
        </Grid>
      </Tabs>
    </Dialog>
  );
};

ProfileDialog.propTypes = {
  session: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  acceptedFileTypes: PropTypes.string,
  allowMultipleFiles: PropTypes.bool,
  tabs: PropTypes.array,
};

ProfileDialog.defaultProps = {
  acceptedFileTypes: '',
  allowMultipleFiles: false,
  tabs: [
    {
      tabName: 'Account Details',
      title: 'Account Details',
      component: <h1>Account Details</h1>,
    },
    {
      tabName: 'Change Password',
      title: 'Change Your Password',
      component: <h1>Change your Password</h1>,
    },
    {
      tabName: 'Privacy',
      title: 'Edit Privacy Settings',
      component: <h1>Privacy</h1>,
    },
  ],
};

export default ProfileDialog;
