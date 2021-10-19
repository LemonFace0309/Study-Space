import PropTypes from 'prop-types';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';

import SmallFeature from './SmallFeature';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.primary.light,
    borderRadius: theme.spacing(2),
    overflow: 'hidden',
    marginBottom: theme.spacing(15),
  },
}));

const SmallFeatures = ({ features }) => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h3" align="center" gutterBottom>
        And that&#39;s not all. We have more.
      </Typography>
      <Container className={classes.container}>
        <Grid
          container
          spacing={6}
          className="m-0 w-full py-4 px-12"
          direction="row">
          {features.map((feature, index) => (
            <SmallFeature key={index} feature={feature} />
          ))}
        </Grid>
      </Container>
    </>
  );
};

SmallFeatures.propTypes = {
  features: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SmallFeatures;
