import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import MainActionButton from './Cards/MainActionButton';
import SpacePackage from './Cards/SpacePackage';

const useStyles = makeStyles((theme) => ({
  fitContent: {
    height: 'fit-content',
  },
  subHeader: {
    color: theme.palette.text.tertiary,
    textTransform: 'uppercase',
    paddingBottom: theme.spacing(1),
  },
  subHeader2: {
    color: theme.palette.text.tertiary,
    textTransform: 'uppercase',
  },
}));

const DashboardContainer = ({ spaces }) => {
  const classes = useStyles();

  return (
    <div className="h-full rounded-none rounded-b-2xl bg-white p-4 pl-12">
      {/* Greeting */}
      <Grid container direction="row">
        <div item xs={12} className="mb-8">
          <Typography variant="h4">Hey Charles!</Typography>
          <Typography variant="h6" color="textSecondary">
            The key is not to prioritize what&#39;s on your schedule, but to schedule your priorities.
          </Typography>
        </div>

        {/* Dashboard Card Section */}
        <Grid item container direction="row" spacing={4} className="mb-8">
          <Grid item sm={12} md={6} className={classes.fitContent}>
            <Typography variant="h6" className={classes.subHeader}>
              Need a space to study?
            </Typography>
            <MainActionButton
              variant="dark"
              img="/images/dashboard/craft.svg"
              name="LABEL_CREATE_A_SPACE"
              description="insert some sort of tagline or feature description"
            />
          </Grid>
          <Grid item sm={12} md={6} className={classes.fitContent}>
            <Typography variant="h6" className={classes.subHeader}>
              Have a space to study?
            </Typography>
            <MainActionButton
              variant="light"
              img="/images/dashboard/join.svg"
              name="LABEL_JOIN_A_SPACE"
              description="insert some sort of tagline or feature description"
            />
          </Grid>
        </Grid>

        {/* Space Card Section */}
        <Grid container direction="row" spacing={4} className="mb-4">
          <Grid item xs={12} className="pb-0">
            <Typography variant="h6" className={classes.subHeader2}>
              Want to find a new space? <span className="font-thin">You might like these</span>
            </Typography>
          </Grid>
          {spaces.map(({ name, description, participants, music, spaceId }) => {
            return (
              <Grid item key={spaceId} xs={12} sm={6} md={4} xl={3}>
                <SpacePackage
                  spaceCardData={{ name, description, headCount: participants?.length, music }}
                  spaceCardModalData={{ friends: [], participants, spaceId }}
                />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </div>
  );
};

DashboardContainer.propTypes = {
  spaces: PropTypes.array.isRequired,
};
export default DashboardContainer;
