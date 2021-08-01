import { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useRecoilValue } from 'recoil';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import AccountDetails from './AccountDetails';
import ChangePassword from './ChangePassword';
import * as authState from '../../../../atoms/auth';

const useStyles = makeStyles((theme) => ({
  dialogRoot: {
    '& > div:nth-child(3) > div': {
      borderRadius: theme.spacing(3),
    },
  },
  mainForm: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    padding: theme.spacing(2),
  },
  mainFormBody: {
    backgroundColor: theme.palette.primary.extraLight,
    padding: theme.spacing(3),
    borderRadius: '16px',
    position: 'relative',
  },
  tab: {
    textTransform: 'none',
  },
  activeTab: {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      background: theme.palette.primary.dark,
    },
  },
  tabTitle: {
    color: theme.palette.primary.dark,
  },
  closeIcon: {
    position: 'absolute',
    top: '25px',
    right: '25px',
    color: theme.palette.primary.dark,
  },
  containedPrimary: {
    background: theme.palette.primary.dark,
    borderRadius: '2rem',
  },
}));

const tabComponents = {
  ACCOUNT_DETAILS: 'Account Details',
  CHANGE_PASSWORD: 'Change Password',
  PRIVACY: 'PRIVACY',
};

const ProfileDialog = ({ session, isOpen, handleClose, tabs }) => {
  const classes = useStyles();
  const [tabIndex, setTabIndex] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [saveChanges, setSaveChanges] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const username = useRecoilValue(authState.username);
  const phoneNumber = useRecoilValue(authState.phoneNumber);
  const validUsername = useRecoilValue(authState.validUsername);
  const validPhoneNumber = useRecoilValue(authState.validPhoneNumber);
  const validEmail = useRecoilValue(authState.validEmail);
  const validNewPassword = useRecoilValue(authState.validNewPassword);
  const newPasswordsMatch = useRecoilValue(authState.newPasswordsMatch);

  const renderTabComponent = (component) => {
    switch (component) {
      case tabComponents.ACCOUNT_DETAILS:
        return (
          <AccountDetails
            session={session}
            editMode={editMode}
            saveChanges={saveChanges}
            setSaveChanges={setSaveChanges}
            setEditMode={setEditMode}
          />
        );
      case tabComponents.CHANGE_PASSWORD:
        return (
          <ChangePassword
            session={session}
            editMode={editMode}
            saveChanges={saveChanges}
            setSaveChanges={setSaveChanges}
          />
        );
      case tabComponents.PRIVACY:
        return <h1>Privacy</h1>;
      default:
        return <h1>Account Details</h1>;
    }
  };

  const toggleSaveMode = () => {
    if (editMode) {
      setSaveChanges(true);
    }
    setEditMode((prev) => !prev);
  };

  const isEditButtonDisabled = () => {
    if (
      tabIndex === 0 &&
      editMode &&
      (!validEmail || (!validUsername && username !== '') || (!validPhoneNumber && phoneNumber !== ''))
    ) {
      return true;
    }
    if (tabIndex === 1 && editMode && !validNewPassword && !newPasswordsMatch) {
      return true;
    }
    return false;
  };

  const toggleSettings = () => {
    setShowSettings(prev => !prev)
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
        <Grid container direction="row" className="pt-4">
          {/* Left sidebar for md+ */}
          <Hidden smDown>
            <Grid container item xs={12} md={3} className="p-4">
              <TabList className="w-full">
                {tabs.map((tab, index) => (
                  <Tab key={tab.tabName} className="pl-2">
                    <Button
                      fullWidth
                      disableRipple
                      className={classNames([
                        'justify-start',
                        'pb-2',
                        'pl-4',
                        classes.tab,
                        index === tabIndex && classes.activeTab,
                      ])}>
                      {tab.tabName}
                    </Button>
                  </Tab>
                ))}
              </TabList>
              <Grid container direction="column" alignItems="baseline" justify="flex-end">
                <Button>Privacy</Button>
                <Button>Logout</Button>
              </Grid>
            </Grid>
          </Hidden>

          {/* TITLE */}
          <Grid container item direction="row" xs={12} md={9} className={classes.mainForm}>
            {tabs.map((tab, index) => (
              <TabPanel key={index} className="w-full">
                {/* Settings Nav for Small Screens */}
                {showSettings ? (
                  <Hidden mdUp>
                    <Grid container item xs={12} md={3} className="p-4">
                      <TabList className="w-full">
                        {tabs.map((tab, index) => (
                          <Tab key={tab.tabName} className="pl-2">
                            <Button
                              fullWidth
                              disableRipple
                              onClick={toggleSettings}
                              className={classNames([
                                'justify-start',
                                'pb-2',
                                'pl-4',
                                classes.tab,
                                index === tabIndex && classes.activeTab,
                              ])}>
                              {tab.tabName}
                            </Button>
                          </Tab>
                        ))}
                      </TabList>
                      <Grid container direction="column" alignItems="baseline" justify="flex-end">
                        <Button>Privacy</Button>
                        <Button>Logout</Button>
                      </Grid>
                    </Grid>
                  </Hidden>
                ) : (
                  /* GREY AREA */
                  <Grid container item direction="row" xs={12} className="p-4">
                    <Hidden mdUp>
                      <ArrowBackIosIcon onClick={toggleSettings}></ArrowBackIosIcon>
                    </Hidden>
                    <Typography variant="h3" gutterBottom className={classes.tabTitle}>
                      {tab.title}
                    </Typography>
                    <Hidden smDown>
                      <CloseIcon className={classes.closeIcon} />
                    </Hidden>
                    <Grid item xs={12} className={classes.mainFormBody}>
                      {renderTabComponent(tab.component)}
                    </Grid>
                  </Grid>
                )}
              </TabPanel>
            ))}
            {!showSettings &&
              <Grid container item justify="flex-end" className="p-4">
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.containedPrimary}
                  startIcon={editMode ? <CheckIcon /> : <EditIcon />}
                  onClick={toggleSaveMode}
                  disabled={isEditButtonDisabled()}>
                  {editMode ? 'Save' : 'Edit Profile'}
                </Button>
              </Grid>
            }
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
      component: tabComponents.ACCOUNT_DETAILS,
    },
    {
      tabName: 'Change Password',
      title: 'Change Your Password',
      component: tabComponents.CHANGE_PASSWORD,
    },
    /*
    {
      tabName: 'Privacy',
      title: 'Edit Privacy Settings',
      component: tabComponents.PRIVACY,
    },
    */
  ],
};

export default ProfileDialog;
