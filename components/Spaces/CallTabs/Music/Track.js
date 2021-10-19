/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import QueueIcon from '@mui/icons-material/Queue';
import DeleteIcon from '@mui/icons-material/Delete';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  songTitle: {
    color: theme.palette.primary.dark,
  },
  thumbnailImage: {
    height: '64px',
    width: '64px',
    objectFit: 'cover',
    objectPosition: '50% 50%',
  },
}));

const Track = ({ track, playTrack, addToQueue, removeFromQueue }) => {
  const classes = useStyles();
  const { artist, title, albumUrl } = track;

  const queueSong = (e) => {
    e.stopPropagation();
    addToQueue(track);
  };

  const removeSong = (e) => {
    e.stopPropagation();
    removeFromQueue(track);
  };

  return (
    <div className="flex m-2 items-center cursor-pointer" role="button" onClick={() => playTrack(track)}>
      {albumUrl && <img src={albumUrl} alt="song thumbnail" className={classes.thumbnailImage} />}
      <div className="ml-2 flex-1">
        <Typography variant="subtitle2" className={classes.songTitle}>
          {title}
        </Typography>
        <Typography variant="caption">{artist}</Typography>
      </div>
      {addToQueue && (
        <IconButton aria-label="add to queue" onClick={queueSong} size="large">
          <QueueIcon />
        </IconButton>
      )}
      {removeFromQueue && (
        <IconButton aria-label="remove from queue" onClick={removeSong} size="large">
          <DeleteIcon />
        </IconButton>
      )}
    </div>
  );
};

Track.propTypes = {
  track: PropTypes.shape({
    artist: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    uri: PropTypes.string.isRequired,
    albumUrl: PropTypes.string.isRequired,
  }).isRequired,
  playTrack: PropTypes.func.isRequired,
  addToQueue: PropTypes.func,
  removeFromQueue: PropTypes.func,
};

Track.defaultProps = {
  addToQueue: null,
  removeFromQueue: null,
};

export default Track;
