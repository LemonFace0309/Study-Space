import { Paper, Box, Typography, Avatar } from '@mui/material';

import PersonIcon from '@mui/icons-material/Person';

const User = () => {
  return (
    <Paper elevate={10} className="rounded-lg">
      <Box
        sx={{ bgcolor: 'primary.light', color: 'primary.dark' }}
        className="flex flex-col justify-center items-center p-5 rounded-lg w-full h-full">
        <Avatar>
          <PersonIcon />
        </Avatar>
        <Typography variant="body2" color="primary">
          Jimmy &#40;Host&#41;
        </Typography>
      </Box>
    </Paper>
  );
};

export default User;
