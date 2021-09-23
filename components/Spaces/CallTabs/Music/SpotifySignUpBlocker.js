import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { useRecoilValue } from 'recoil';

import * as spotifyState from '@/atoms/spotify';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    width: '100%',
    height: '100%',
    position: 'relative',
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export const ROOM_ID = 'ROOM_ID';

const SpotifySignUpBlocker = ({ loading }) => {
  const classes = useStyles();
  const roomId = useRecoilValue(spotifyState.roomId);
  const spotifyAuthURL = useRecoilValue(spotifyState.spotifyAuthURL);
  const router = useRouter();

  const handleClicked = () => {
    document.cookie = `productify_roomID=${roomId}; path=/`;
    router.push(spotifyAuthURL);
  };

  return (
    <Backdrop className={classes.backdrop} open>
      {loading ? (
        <CircularProgress color="secondary" />
      ) : (
        <Button variant="outlined" color="secondary" onClick={handleClicked}>
          Sign in to Spotify
        </Button>
      )}
    </Backdrop>
  );
};

SpotifySignUpBlocker.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default SpotifySignUpBlocker;
