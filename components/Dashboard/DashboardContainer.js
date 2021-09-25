import PropTypes from 'prop-types';
import { Card, Container, Grid, Typography } from '@material-ui/core';

import MainActionButton from './Cards/MainActionButton';
import SpacePackage from './Cards/SpacePackage';

const DashboardContainer = ({ spaces }) => {
  return (
    <Card className="h-full rounded-none rounded-b-2xl">
      <Container className="py-4">
        {/* Greeting */}
        <Grid container direction="column" spacing={6}>
          <Grid item xs={12}>
            <Typography variant="h4">Hey Charles!</Typography>
            <Typography variant="h6" color="textSecondary">
              The key is not to prioritize what&#39;s on your schedule, but to schedule your priorities.
            </Typography>
          </Grid>

          {/* Dashboard Card Section */}
          <Grid item container direction="row" spacing={2}>
            <Grid item sm={12} md={6}>
              <MainActionButton
                variant="dark"
                img="/images/dashboard/craft.svg"
                name="LABEL_CREATE_A_SPACE"
                description="insert some sort of tagline or feature description"
              />
            </Grid>
            <Grid item sm={12} md={6}>
              <MainActionButton
                variant="light"
                img="/images/dashboard/join.svg"
                name="LABEL_JOIN_A_SPACE"
                description="insert some sort of tagline or feature description"
              />
            </Grid>
            {/* Space Card Section */}
            {spaces.map(({ name, description, participants, music, spaceId }) => {
              return (
                <Grid item key={spaceId} xs={12} sm={6} md={4}>
                  <SpacePackage
                    spaceCardData={{ name, description, headCount: participants?.length, music }}
                    spaceCardModalData={{ friends: [], participants, spaceId }}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Container>
    </Card>
  );
};

DashboardContainer.propTypes = {
  spaces: PropTypes.array.isRequired,
};
export default DashboardContainer;
