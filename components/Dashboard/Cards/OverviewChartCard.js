import React from 'react';
import { Box, Typography } from '@mui/material';
import Card from '../../Shared/Card';

const OverviewChartCard = () => {
  return (
    <Card>
      <Box className="text-left p-3">
        <Typography
          variant="h5"
          align="center"
          className="text-primary-dark "></Typography>
        <Typography variant="body1" className="text-primary-text">
          hello
        </Typography>
      </Box>
    </Card>
  );
};

export default OverviewChartCard;
