import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';

import Card from '../../Shared/Card';

const ChartCard = ({ title, date, chart }) => {
  return (
    <Card roundedFull>
      <Box className="text-left p-3">
        <Typography variant="h5" className="text-primary-dark font-bold">
          {title}
        </Typography>
        <Typography variant="body1" className="text-primary-text">
          {date}
        </Typography>
      </Box>

      <Box>{chart}</Box>
    </Card>
  );
};

ChartCard.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  chart: PropTypes.node.isRequired,
};

export default ChartCard;
