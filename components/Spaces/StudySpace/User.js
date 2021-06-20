import React from 'react';

import { Paper, Box, Typography, Avatar } from '@material-ui/core';

import PersonIcon from '@material-ui/icons/Person';

export default function User() {
  return (
    <Paper elevate={10} className="rounded-lg">
      <Box className="flex flex-col justify-center items-center p-5 rounded-lg w-full h-full bg-primary-light text-primary-dark">
        <Avatar>
          <PersonIcon />
        </Avatar>
        <Typography variant="body2" className="text-primary-main">
          Jimmy &#40;Host&#41;
        </Typography>
      </Box>
    </Paper>
  );
}
