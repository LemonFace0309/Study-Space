import PropTypes from 'prop-types';
import { Box, Typography, Grid, Hidden } from '@material-ui/core';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import Card from '../../Shared/Card';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.primary.dark,
    height: '100%',
    flexWrap: 'nowrap',
  },
  iconButton: {
    color: theme.palette.primary.contrastText,
    marginLeft: 'auto',
  },
  button: {
    width: '100%',
    fontSize: '18px',
    '&:focus': {
      outline: 'none',
    },
    textTransform: 'capitalize',
    color: '#BDACD4',
    '&:hover': {
      backgroundColor: '#977BBF',
      color: '#fff',
    },
  },
  friendsSection: {
    flex: '1',
    flexWrap: 'nowrap',
    overflowY: 'auto',
    overflowX: 'hidden',
    padding: ({ open }) => open && theme.spacing(0, 1.5),
    '& > ul': {
      flexGrow: '1',
    },
    /* Hide scrollbar for Chrome, Safari and Opera */
    '&::-webkit-scrollbar': {
      display: ({ isSmallScreen }) => !isSmallScreen && 'none',
    },
    '-ms-overflow-style': 'none' /* IE and Edge */,
    scrollbarWidth: ({ isSmallScreen }) => !isSmallScreen && 'none' /* Firefox */,
  },
}));
const DashboardCard = ({ spaceName, description, variant }) => {
  const theme = useTheme();
  return (
    <Card>
      <Grid
        spacing={5}
        container
        direction="row"
        className="rounded-lg"
        style={{
          background: variant === 'dark' ? theme.palette.primary.mainGradient : theme.palette.secondary.mainGradient,
        }}>
        <Hidden mdDown>
          <Grid item xs={4}>
            <Box bgcolor="text.disabled" width={1} height={1}></Box>
          </Grid>
        </Hidden>

        <Grid item xs={8}>
          <Box color={variant === 'dark' ? theme.palette.primary.contrastText : theme.palette.primary.dark}>
            <Typography variant="h5" align="left">
              {spaceName}
            </Typography>
            <Typography variant="body2">{description}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

DashboardCard.propTypes = {
  spaceName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
};

export default DashboardCard;
