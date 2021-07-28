import { React } from 'react';
import uniqueId from 'lodash/uniqueId';
import { Card, Container, Box, Grid, Typography, useTheme } from '@material-ui/core';

import DashboardCard from './Cards/DashboardCard';
import SpacePackage from './Cards/SpacePackage';
import { spaceCardModalTestData } from '../../data/spaceCardModalTestData';
import { spaceCardTestData } from '../../data/spaceCardTestData';

const DashboardContainer = ({}) => {
  const { friends, participants, hosts } = spaceCardModalTestData;
  const { cardData } = spaceCardTestData;
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
                spaceName="Create a Space"
                description="insert some sort of tagline or feature description "
              />
            </Grid>
            <Grid item sm={12} md={6}>
              {/* <Typography variant="h6" color="textSecondary">
                Have a space to study?
              </Typography> */}
              <DashboardCard
                variant="light"
                spaceName="Join a Space"
                description="insert some sort of tagline or feature description "
              />
            </Grid>
            {/* Space Card Section */}
            {cardData.map(({ spaceName, description, headCount, music }) => {
              return (
                <Grid item key={uniqueId(spaceName)} xs={12} sm={6} md={4}>
                  <SpacePackage
                    spaceCardData={{ spaceName, description, headCount, music }}
                    spaceCardModalData={{ friends, participants, hosts }}
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

export default DashboardContainer;
