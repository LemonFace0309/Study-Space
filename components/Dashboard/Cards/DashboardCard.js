import PropTypes from 'prop-types';
import { Paper, Box, Typography, Grid } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

export default function DashboardCard(props) {
  const theme = useTheme();
  const { spaceName, description, variant } = props;
  return (
    <Paper elevate={5} className="rounded-2xl">
      <Grid
        className="rounded-2xl"
        container
        style={{
          background:
            variant === 'primary'
              ? theme.palette.primary.mainGradient
              : theme.palette.secondary.mainGradient,
        }}>
        <Grid item xs={3}>
          <Box bgcolor="text.disabled" className="h-20 w-20 "></Box>
        </Grid>
        <Grid item>
          <Box
            className="text-left p-3"
            color={
              variant === 'primary'
                ? theme.palette.primary.contrastText
                : theme.palette.primary.dark
            }>
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
