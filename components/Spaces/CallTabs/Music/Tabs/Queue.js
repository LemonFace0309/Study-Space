import { useState, useEffect } from 'react';
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
  const { queue, setQueue } = useSpotify();
  const [nextTracks, setNextTracks] = useState([]);

  const playTrack = (track) => {
    setQueue([track]);
  };

  useEffect(() => {
    const queueClone = [...queue];
    if (!queueClone[1]) return;
    setNextTracks(queueClone.shift());
  }, [queue]);

  return (
    <div className="p-4">
      <Typography variant="subtitle2" className={classes.heading}>
        Now Playing
      </Typography>
      {queue[0] && <Track track={queue[0]} playTrack={playTrack} />}
      <Typography variant="subtitle2" className={`${classes.heading} mt-8`}>
        Next in Queue
      </Typography>
      {nextTracks[0] &&
        nextTracks.map((track) => <Track key={uniqueId(track.uri)} track={track} playTrack={playTrack} />)}
    </div>
  );
};

Queue.propTypes = {};

export default Queue;
