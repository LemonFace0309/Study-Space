import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Track from '../Track';
import { useSpotify } from '../SpotifyProvider';

const useStyles = makeStyles((theme) => ({
  heading: {
    color: theme.palette.primary.dark,
  },
}));

const Queue = () => {
  const classes = useStyles();
  const { currentTrack, nextTracks, setTrackUri } = useSpotify();

  const playTrack = (track) => {
    setTrackUri(track?.uri);
  };

  return (
    <div className="p-4">
      <Typography variant="subtitle2" className={classes.heading}>
        Now Playing
      </Typography>
      {currentTrack && <Track track={currentTrack} playTrack={playTrack} />}
      <Typography variant="subtitle2" className={`${classes.heading} mt-8`}>
        Next in Queue
      </Typography>
      {/* {songs.map((song, index) => {
        if (index !== 0) {
          return <Song key={uniqueId()} {...song} className="mb-2" />;
        }
      })} */}
    </div>
  );
};

Queue.propTypes = {};

export default Queue;
