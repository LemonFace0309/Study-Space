import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const SpotifySignUpBlocker = () => {
  const classes = useStyles();

  return (
    <Backdrop className={classes.backdrop} open>
      <Button variant="outlined" color="primary">
        Sign in to Spotify
      </Button>
    </Backdrop>
  );
};

export default SpotifySignUpBlocker;
