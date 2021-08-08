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

const Track = ({ track }) => {
  const classes = useStyles();
  const { artist, title, uri, albumUrl } = track;

  return (
    <div className="flex m-2 item-center cursor-pointer">
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
};
export default Track;
