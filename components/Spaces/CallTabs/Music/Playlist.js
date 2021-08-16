/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/click-events-have-key-events */
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
    height: '112px',
    width: '112px',
    objectFit: 'cover',
    objectPosition: '50% 50%',
  },
}));

const Playlist = ({ playlist, playPlaylist }) => {
  const { image, title } = playlist;
  const classes = useStyles();

  return (
    <div className="flex flex-col m-1 cursor-pointer w-28" role="button" onClick={() => playPlaylist(playlist)}>
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
  playPlaylist: PropTypes.func.isRequired,
};

export default Playlist;
