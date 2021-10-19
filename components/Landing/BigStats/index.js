import PropTypes from 'prop-types';
import { Grid } from '@mui/material';

import BigStat from './BigStat';

const BigStats = ({ stats }) => {
  return (
    <Grid
      container
      direciton="row"
      spacing={10}
      className="mx-0 my-12 w-full py-4 px-8">
      {stats.map((stat, index) => (
        <BigStat key={index} stat={stat} />
      ))}
    </Grid>
  );
};

BigStats.propTypes = {
  stats: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default BigStats;
