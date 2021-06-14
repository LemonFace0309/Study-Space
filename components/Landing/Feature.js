import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

export const DIRECTIONS = {
  FORWARDS: 'row',
  BACKWARDS: 'row-reverse',
};

const Feature = ({ title, body, img, direction }) => {
  return (
    <Grid
      container
      spacing={4}
      alignItems="center"
      direction={direction}
      className="m-0 w-full p-12">
      <Grid item xs={12} md={6}>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="body1" color="textPrimary">{body}</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <img src={img} alt={title} className="max-h-72" />
      </Grid>
    </Grid>
  );
};

Feature.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  direction: PropTypes.string.isRequired,
};

export default Feature;
