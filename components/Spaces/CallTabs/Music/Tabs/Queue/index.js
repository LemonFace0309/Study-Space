import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Song from './Song';

const useStyles = makeStyles((theme) => ({
  heading: {
    color: theme.palette.primary.dark,
  },
}));

const Queue = ({ songs }) => {
  const classes = useStyles();

  return (
    <div className="p-4">
      <Typography variant="subtitle2" className={classes.heading}>
        Now Playing
      </Typography>
      {songs[0] && <Song {...songs[0]} />}
      <Typography variant="subtitle2" className={`${classes.heading} mt-8`}>
        Next in Queue
      </Typography>
      {songs.map((song, index) => {
        if (index !== 0) {
          return <Song key={uniqueId()} {...song} className="mb-2" />;
        }
      })}
    </div>
  );
};

Queue.propTypes = {
  songs: PropTypes.arrayOf(
    PropTypes.exact({
      title: PropTypes.string,
      channel: PropTypes.string,
      thumbnail: PropTypes.string,
    })
  ).isRequired,
};

Queue.defaultProps = {
  songs: [
    {
      title: '[Acoustic Ver] Perfect - One Direction',
      channel: 'One Direction VEVO',
      thumbnail:
        'https://vignette.wikia.nocookie.net/twicenation/images/e/e4/More_%26_More_Jihyo_Promo_2.jpg/revision/latest?cb=20200602204820',
    },
    {
      title: '[Acoustic Ver] Perfect - One Direction',
      channel: 'One Direction VEVO',
      thumbnail:
        'https://vignette.wikia.nocookie.net/twicenation/images/e/e4/More_%26_More_Jihyo_Promo_2.jpg/revision/latest?cb=20200602204820',
    },
    {
      title: '[Acoustic Ver] Perfect - One Direction',
      channel: 'One Direction VEVO',
      thumbnail:
        'https://vignette.wikia.nocookie.net/twicenation/images/e/e4/More_%26_More_Jihyo_Promo_2.jpg/revision/latest?cb=20200602204820',
    },
    {
      title: '[Acoustic Ver] Perfect - One Direction',
      channel: 'One Direction VEVO',
      thumbnail:
        'https://vignette.wikia.nocookie.net/twicenation/images/e/e4/More_%26_More_Jihyo_Promo_2.jpg/revision/latest?cb=20200602204820',
    },
    {
      title: '[Acoustic Ver] Perfect - One Direction',
      channel: 'One Direction VEVO',
      thumbnail:
        'https://vignette.wikia.nocookie.net/twicenation/images/e/e4/More_%26_More_Jihyo_Promo_2.jpg/revision/latest?cb=20200602204820',
    },
    {
      title: '[Acoustic Ver] Perfect - One Direction',
      channel: 'One Direction VEVO',
      thumbnail:
        'https://vignette.wikia.nocookie.net/twicenation/images/e/e4/More_%26_More_Jihyo_Promo_2.jpg/revision/latest?cb=20200602204820',
    },
  ],
};

export default Queue;
