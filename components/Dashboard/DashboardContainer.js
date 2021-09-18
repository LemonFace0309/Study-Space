import { React } from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import { Card, Container, Box, Grid, Typography, useTheme } from '@material-ui/core';
import DashboardCard from './Cards/DashboardCard';
import SpacePackage from './Cards/SpacePackage';

const DashboardContainer = ({ spaces }) => {
  const theme = useTheme();

  return (
    <Card className="h-full rounded-none rounded-b-2xl">
      <Container className="py-4">
        {/* Greeting */}
        <Grid container direction="column" spacing={6}>
          <Grid item xs={12}>
            <Box color={theme.palette.primary.dark}>
              <Typography variant="h4">Hey Charles!</Typography>
            </Box>
            <Typography variant="h6" color="textSecondary">
              The key is not to prioritize what&#39;s on your schedule, but to schedule your priorities.
            </Typography>
          </Grid>

          {/* Dashboard Card Section */}

          <Grid item container direction="row" spacing={2}>
            <Grid item sm={12} md={6}>
              {/* <Typography variant="h6" color="textSecondary">
                Need a space to study?
              </Typography> */}
              <DashboardCard
                variant="dark"
                name="LABEL_CREATE_A_SPACE"
                description="insert some sort of tagline or feature description"
              />
            </Grid>
            <Grid item sm={12} md={6}>
              {/* <Typography variant="h6" color="textSecondary">
                Have a space to study?
              </Typography> */}
              <DashboardCard
                variant="light"
                name="LABEL_JOIN_A_SPACE"
                description="insert some sort of tagline or feature description"
              />
            </Grid>
            {/* Space Card Section */}
            {spaces.map(({ name, description, participants, hosts, music, spaceId }) => {
              return (
                <Grid item key={uniqueId(name)} xs={12} sm={6} md={4}>
                  <SpacePackage
                    spaceCardData={{ name, description, headCount: participants?.length, music }}
                    spaceCardModalData={{ friends: [], participants, hosts, spaceId }}
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
