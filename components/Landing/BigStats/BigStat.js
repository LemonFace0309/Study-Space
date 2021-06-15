import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const BigStat = ({ stat }) => {
  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      className="flex flex-col items-center justify-around">
      <Typography variant="h2" gutterBottom>
        {stat.number}
        {stat.isPercentage && '%'}
      </Typography>
      <Typography variant="body1">{stat.description}</Typography>
    </Grid>
  );
};

BigStat.propTypes = {
  stat: PropTypes.exact({
    isPercentage: PropTypes.bool.isRequired,
    number: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }),
};

export default BigStat;
