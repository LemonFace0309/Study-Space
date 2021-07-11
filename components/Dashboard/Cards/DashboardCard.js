import PropTypes from 'prop-types';
import { Box, Typography, Grid, Hidden } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import Card from '../../Shared/Card';
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
