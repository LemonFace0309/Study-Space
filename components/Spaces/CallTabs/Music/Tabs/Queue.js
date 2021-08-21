import { useTranslation } from 'next-i18next';
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
  const { t } = useTranslation();
  const classes = useStyles();
  const { queue, setQueue, currentTrack, nextTracks, setNextTracks } = useSpotify();

  const playTrack = (track) => {
    let found = false;
    // creating a new queue starting at the currently playing song and replacing it with track
    const queueClone = [...queue];
    const newQueue = queueClone.reduce((acc, t) => {
      if (found) return acc.concat([t]);
      if (t.title === track.title && t.artist === track.artist) {
        console.debug(t);
        found = true;
        return [t];
      }
      return [];
    }, []);
    setQueue(newQueue);
  };

  const removeFromQueue = (track) => {
    const newQueue = [...nextTracks];
    console.debug(newQueue);
    newQueue.splice(
      newQueue.findIndex((t) => t.title === track.title && t.artist === track.artist),
      1
    );
    setQueue([currentTrack, ...newQueue]);
    setNextTracks(newQueue);
  };

  return (
    <div className="p-4">
      <Typography variant="subtitle2" className={classes.heading}>
        {t('LABEL_NOW_PLAYING')}
      </Typography>
      {currentTrack && <Track track={currentTrack} playTrack={playTrack} />}
      <Typography variant="subtitle2" className={`${classes.heading} mt-8`}>
        {t('LABEL_NEXT_IN_QUEUE')}
      </Typography>
      {nextTracks.map((track) => (
        <Track key={uniqueId(track.uri)} track={track} playTrack={playTrack} removeFromQueue={removeFromQueue} />
      ))}
    </div>
  );
};

Queue.propTypes = {};

export default Queue;
