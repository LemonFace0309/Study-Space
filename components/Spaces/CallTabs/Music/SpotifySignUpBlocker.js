import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useRecoilValue } from 'recoil';

import * as spotifyState from '@/atoms/spotify';
import { PREFIX } from '@/hooks/useLocalStorage';

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

const SpotifySignUpBlocker = () => {
  const classes = useStyles();
  const roomID = useRecoilValue(spotifyState.roomID);
  const spotifyAuthURL = useRecoilValue(spotifyState.spotifyAuthURL);

  const handleClicked = () => {
    localStorage.setItem(PREFIX + ROOM_ID, roomID);
    window.location.replace(spotifyAuthURL);
  };

  return (
    <Backdrop className={classes.backdrop} open>
      <Button variant="outlined" color="secondary" onClick={handleClicked}>
        Sign in to Spotify
      </Button>
    </Backdrop>
  );
};

export default SpotifySignUpBlocker;
