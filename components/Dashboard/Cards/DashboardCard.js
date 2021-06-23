import React from 'react';
import PropTypes from 'prop-types';

import { Paper, Box, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

export default function DashboardCard(props) {
  const theme = useTheme();
  const { spaceName, description, variant } = props;
  return (
    <Paper className="rounded-xl " elevate={5}>
      <Box
        style={{
          background:
            variant === 'primary'
              ? theme.palette.primary.mainGradient
              : theme.palette.secondary.mainGradient,
        }}
        className="flex flex-grow justify-between rounded-r-xl rounded-bl-xl ">
        <div className="h-32 w-80 grid grid-cols-3">
          <div className="p-6">
            {/* spaceholder */}
            <Box class="h-20 w-20 bg-purple-200"></Box>
          </div>
          <div className="col-span-2 pt-2">
            <Box className="text-left p-3">
              <Typography color="text" variant="h5" align="left">
                {spaceName}
              </Typography>
              <Typography variant="body1" className="text-sm pt-1">
                {description}
              </Typography>
            </Box>
          </div>
        </div>
      </Box>
    </Paper>
  );
}
DashboardCard.propTypes = {
  spaceName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
};
