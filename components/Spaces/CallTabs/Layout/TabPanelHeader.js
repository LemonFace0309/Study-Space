import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

const TabPanelHeader = ({ children }) => {
  const theme = useTheme();

  return (
    <Box className="w-full p-2" bgcolor={theme.palette.primary.dark} color={theme.palette.primary.contrastText}>
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
