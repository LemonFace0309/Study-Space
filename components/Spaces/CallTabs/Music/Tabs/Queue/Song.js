import PropTypes from 'prop-types';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  songTitle: {
    color: theme.palette.primary.dark,
  },
  thumbnailImage: {
    height: '90px',
    width: '160px',
    objectFit: 'cover',
    objectPosition: '50% 50%',
  },
}));

const Song = ({ title, channel, thumbnail, className: styles }) => {
  const classes = useStyles();

  return (
    <div className={classNames('w-full flex items-center', styles)}>
      <img src={thumbnail} alt="song thumbnail" className={classes.thumbnailImage} />
      <div className="ml-2 flex-1">
        <Typography variant="subtitle1" className={classes.songTitle}>
          {title}
        </Typography>
        <Typography variant="caption">{channel}</Typography>
      </div>
    </div>
  );
};

Song.propTypes = {
  title: PropTypes.string.isRequired,
  channel: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Song.defaultProps = {
  className: '',
};

export default Song;
