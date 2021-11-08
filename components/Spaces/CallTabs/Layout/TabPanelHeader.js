import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const TabPanelHeader = ({ children }) => {
  return (
    <Box className="w-full p-2" sx={{ bgcolor: 'primary.dark', color: 'primary.contrastText' }}>
      <Typography className="ml-4 font-bold" variant="subtitle2">
        {children}
      </Typography>
    </Box>
  );
};

TabPanelHeader.propTypes = {
  children: PropTypes.string.isRequired,
};

export default TabPanelHeader;
