import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  playlistTitle: {
    color: theme.palette.primary.dark,
    marginTop: theme.spacing(1),
    textAlign: 'center',
  },
  thumbnailImage: {
    margin: 'auto',
    height: '100px',
    width: '100px',
    objectFit: 'cover',
    objectPosition: '50% 50%',
  },
}));

const Playlist = ({ playlist }) => {
  const { image, title } = playlist;
  const classes = useStyles();

  return (
    <div className="flex flex-col m-2 cursor-pointer">
      <img src={image} alt="song thumbnail" className={classes.thumbnailImage} />
      <Typography variant="caption" className={classes.playlistTitle}>
        {title}
      </Typography>
    </div>
  );
};

Playlist.propTypes = {
  playlist: PropTypes.exact({
    id: PropTypes.string,
    title: PropTypes.string,
    uri: PropTypes.string,
    trackURL: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
};

export default Playlist;
