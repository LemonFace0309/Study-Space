import { uniqueId } from 'lodash';
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
  const { queue, setQueue, currentTrack, nextTracks } = useSpotify();

  const playTrack = (track) => {
    let found = false;
    const queueClone = [...queue];
    const newQueue = queueClone.reduce((acc, t) => {
      if (found) return acc.concat([t]);
      if (t.uri === track.uri) {
        console.debug(t);
        found = true;
        return [t];
      }
      return [];
    }, []);
    setQueue(newQueue);
  };

  const removeFromQueue = (track) => {
    return;
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
      {nextTracks.map((track) => (
        <Track key={uniqueId(track.uri)} track={track} playTrack={playTrack} removeFromQueue={removeFromQueue} />
      ))}
    </div>
  );
};

Queue.propTypes = {};

export default Queue;
