/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

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

const Track = ({ track, playTrack }) => {
  const classes = useStyles();
  const { artist, title, albumUrl } = track;

  return (
    <div className="flex m-2 item-center cursor-pointer" role="button" onClick={() => playTrack(track)}>
      <img src={albumUrl} alt="song thumbnail" className={classes.thumbnailImage} />
      <div className="ml-2 flex-1">
        <Typography variant="subtitle1" className={classes.songTitle}>
          {title}
        </Typography>
        <Typography variant="caption">{artist}</Typography>
      </div>
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
};
export default Track;
