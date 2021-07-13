import PropTypes from 'prop-types';
import { Box, Typography, Grid, Hidden } from '@material-ui/core';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import Card from '../../Shared/Card';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.primary.dark,
    height: '100%',
    flexWrap: 'nowrap',
    padding: '1rem',
    paddingLeft: '1.5rem',
    paddingRight: '1.5rem',
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
  const classes = useStyles();

  return (
    <Card>
      <Grid
        container
        direction="row"
        style={{
          background: variant === 'dark' ? theme.palette.primary.mainGradient : theme.palette.secondary.mainGradient,
        }}
        className={classes.container}>
        <Hidden smDown>
          <Grid item sm={4}>
            <Box display="flex" alignItems="center" justifyContent="center" height={1} width={1}>
              <Box display="flex" bgcolor="text.disabled" height={0.8} width={0.8}></Box>
            </Box>
          </Grid>
        </Hidden>

        <Grid item xs={12} sm={12}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="flex-start"
            height={1}
            width={1}
            paddingLeft="1rem"
            color={variant === 'dark' ? theme.palette.primary.contrastText : theme.palette.primary.dark}>
            <Box>
              <Typography variant="h5">{spaceName}</Typography>
            </Box>
            <Box>
              <Typography variant="body2">{description}</Typography>
            </Box>
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
