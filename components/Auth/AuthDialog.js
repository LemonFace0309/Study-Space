import { useTranslation } from 'next-i18next';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { Box, Button, Dialog, Divider, Grid, Hidden, Typography, IconButton, Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import styles from './Auth.module.css';

const AuthDialog = ({
  open,
  setOpen,
  showSuccessAlert,
  setShowSuccessAlert,
  handleCredentialsSubmit,
  formContent,
  isSignUp,
  setIsSignUp,
  validSignUp,
  btnText,
  oAuthText,
  switchModeText,
  signIn,
  providers,
}) => {
  const { t } = useTranslation();

  return (
    <Dialog
      fullWidth={true}
      maxWidth="lg"
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="Login/Signup Modal"
      className={styles.Dialogue}>
      <Grid container className="my-8" alignItems="center" direction="row">
        <Grid item xs={12}>
          <Snackbar open={showSuccessAlert} autoHideDuration={3000} onClose={() => setShowSuccessAlert(false)}>
            <Alert elevation={6} variant="filled" onClose={() => setShowSuccessAlert(false)} severity="success">
              {t('LABEL_ACCOUNT_CREATION')}
              <span role="img" aria-label="partying face emoji">
                🥳
              </span>
            </Alert>
          </Snackbar>
        </Grid>
        <Grid container item xs={12} md={6} direction="column">
          <form onSubmit={handleCredentialsSubmit}>
            <div className="flex-grow flex flex-col items-center p-8">
              <Typography variant="h4" component="h1" style={{ color: '#4E3276' }} className="font-bold">
                {isSignUp ? t('LABEL_SIGNUP') : t('LABEL_LOGIN')}
              </Typography>
              <div className="w-8/12 mt-8">{formContent}</div>
              <Button
                type="submit"
                className={`${
                  isSignUp && !validSignUp ? 'bg-gray-400' : styles.submitButtonEnabled
                  // 'bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 hover:from-pink-500 hover:to-yellow-400 transition duration-200 ease-in-out'
                } my-12 overflow-hidden text-white font-bold py-2 px-4 rounded-full w-8/12 outline-none`}
                disabled={isSignUp && !validSignUp}>
                {t(btnText)}
              </Button>
              <div className="flex w-full justify-center items-center">
                <Divider className="w-4/12 h-0.5" />
                <Typography variant="caption" component="p" className="mx-3">
                  {t('LABEL_OR')}
                </Typography>
                <Divider className="w-4/12 h-0.5" />
              </div>
              <Typography variant="caption" component="p" className="my-2">
                {t(oAuthText)}
              </Typography>
              <div className="flex w-full justify-center items-center">
                <IconButton
                  className="mr-4 outline-none"
                  onClick={() => signIn(providers?.facebook.id, { callbackUrl: '/dashboard' })}>
                  <Image src="/images/facebook.svg" alt="Facebook Login" height="32" width="32" />
                </IconButton>
                <IconButton
                  className="outline-none"
                  onClick={() => signIn(providers?.google.id, { callbackUrl: '/dashboard' })}>
                  <Image src="/images/google.svg" alt="Facebook Login" height="32" width="32" />
                </IconButton>
              </div>
            </div>
          </form>
          <div className="flex justify-center">
            <Typography variant="subtitle1">
              {t(switchModeText)}
              <Box
                color="#977BBF"
                className="inline cursor-pointer"
                onClick={() => {
                  setIsSignUp((isSignUp) => !isSignUp);
                }}>
                {isSignUp ? t('LABEL_LOGIN') : t('LABEL_SIGNUP')}
              </Box>
            </Typography>
          </div>
        </Grid>
        <Hidden smDown>
          <Grid item md={6} className="overflow-hidden flex flex-col content-center items-start">
            <Typography variant="h6" component="h4" className="mb-2">
              {t('LABEL_ALL_STUDY_NEEDS')}
            </Typography>
            <div className="w-11/12 max-w-lg relative">
              <div style={{ paddingTop: '100%' }}>
                <Image src="/images/placeholder.jpg" alt="login screen picture" layout="fill" objectFit="cover" />
              </div>
            </div>
          </Grid>
        </Hidden>
      </Grid>
    </Dialog>
  );
};

AuthDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  showSuccessAlert: PropTypes.bool.isRequired,
  setShowSuccessAlert: PropTypes.func.isRequired,
  handleCredentialsSubmit: PropTypes.func.isRequired,
  formContent: PropTypes.arrayOf(PropTypes.object).isRequired,
  isSignUp: PropTypes.bool.isRequired,
  setIsSignUp: PropTypes.func.isRequired,
  validSignUp: PropTypes.bool.isRequired,
  btnText: PropTypes.string.isRequired,
  oAuthText: PropTypes.string.isRequired,
  switchModeText: PropTypes.string.isRequired,
  signIn: PropTypes.func.isRequired,
  providers: PropTypes.object.isRequired,
};

export default AuthDialog;
