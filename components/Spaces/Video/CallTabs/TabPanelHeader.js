import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';

const TabPanelHeader = ({ children }) => {
  const theme = useTheme();

  return (
    <Box className="w-full p-2" bgcolor={theme.palette.primary.dark} color={theme.palette.primary.contrastText}>
      <Typography className="ml-4" variant="subtitle2">
        {children}
      </Typography>
    </Box>
  );
};

TabPanelHeader.propTypes = {
  children: PropTypes.string.isRequired,
};

export default TabPanelHeader;
