import React from 'react';
import PropTypes from 'prop-types';

import { Paper, Box, Typography, Grid } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

export default function DashboardCard(props) {
  const theme = useTheme();
  const { spaceName, description, variant } = props;
  return (
    <Paper className="rounded-xl" elevate={5}>
      <Grid
        container
        // direction="col"
        // alignContent="center"
        // justify="flex-start"
        style={{
          background:
            variant === 'primary'
              ? theme.palette.primary.mainGradient
              : theme.palette.secondary.mainGradient,
        }}>
        <Grid item>
          <Box className="h-20 w-20 bg-gray-400"></Box>
        </Grid>
        <Grid item>
          <Box className="text-left p-3">
            <Typography color="text" variant="h5" align="left">
              {spaceName}
            </Typography>
            <Typography variant="body1">{description}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
DashboardCard.propTypes = {
  spaceName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
};
