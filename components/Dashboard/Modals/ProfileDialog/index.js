import { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import SettingsIcon from '@material-ui/icons/Settings';
import { makeStyles } from '@material-ui/core/styles';

import AccountDetails from './AccountDetails';
import ChangePassword from './ChangePassword';

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
  mainFormBody: {
    backgroundColor: '#FFFFFF',
    padding: theme.spacing(3),
    borderRadius: '16px',
    position: 'relative',
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
  settingsIcon: {
    fontSize: '70px',
    position: 'absolute',
    top: '12px',
    right: '12px',
    color: theme.palette.primary.dark,
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

  const renderTabComponent = (component) => {
    switch (component) {
      case tabComponents.ACCOUNT_DETAILS:
        return (
          <AccountDetails
            session={session}
            editMode={editMode}
            saveChanges={saveChanges}
            setSaveChanges={setSaveChanges}
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
            <TabList className="w-full">
              {tabs.map((tab, index) => (
                <Tab key={tab.tabName}>
                  <Button
                    fullWidth
                    disableRipple
                    className={classNames(['justify-start', 'pb-2', index === tabIndex && classes.activeTab])}>
                    {tab.tabName}
                  </Button>
                </Tab>
              ))}
            </TabList>
          </Grid>
          <Grid container item direction="row" xs={12} md={9} className={classes.mainForm}>
            {tabs.map((tab, index) => (
              <TabPanel key={index} className="w-full">
                <Grid container item direction="row" xs={12} className="p-4">
                  <Typography variant="h6" gutterBottom className={classes.tabTitle}>
                    {tab.title}
                  </Typography>
                  <Grid item xs={12} className={classes.mainFormBody}>
                    {renderTabComponent(tab.component)}
                    <Hidden smDown>
                      <SettingsIcon className={classes.settingsIcon} />
                    </Hidden>
                  </Grid>
                </Grid>
              </TabPanel>
            ))}
            <Grid container item justify="flex-end">
              <Button onClick={toggleSaveMode}>{editMode ? 'Save' : 'Edit Profile'}</Button>
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
      component: tabComponents.ACCOUNT_DETAILS,
    },
    {
      tabName: 'Change Password',
      title: 'Change Your Password',
      component: tabComponents.CHANGE_PASSWORD,
    },
    {
      tabName: 'Privacy',
      title: 'Edit Privacy Settings',
      component: tabComponents.PRIVACY,
    },
  ],
};

export default ProfileDialog;