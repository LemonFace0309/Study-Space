/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { React } from 'react';
import uniqueId from 'lodash/uniqueId';
import { Container, Box, Grid, Typography, Paper, useTheme } from '@material-ui/core';

import DashboardCard from './Cards/DashboardCard';
import SpacePackage from './Cards/SpacePackage';
import { spaceCardModalTestData } from '../../data/spaceCardModalTestData';
import { spaceCardTestData } from '../../data/spaceCardTestData';
import Card from '../Shared/Card';
const DashboardContainer = () => {
  const { friends, participants, hosts } = spaceCardModalTestData;
  const { cardData } = spaceCardTestData;
  const theme = useTheme();
  return (
    <Card>
      <Container>
        {/* Dashboard Join and Create Card Section */}
        <Grid container direction="column" alignContent="center" alignItems="center" justify="center" spacing={6}>
          <Grid container item xs={12}>
            <Grid item xs={12}>
              <Box color={theme.palette.primary.dark}>
                <Typography variant="h4">Hey Charles!</Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box color={theme.palette.text.secondary}>
                <Typography variant="h6">
                  The key is not to prioritize what&#39;s on your schedule, but to schedule your priorities.
                </Typography>
              </Box>
            </Grid>
          </Grid>

          {/* Dashboard Card Section */}

          <Grid container direction="row" item alignContent="center" justify="space-between" spacing={2} xs={12}>
            <Grid item xs={12} md={6} container direction="column">
              <Grid item xs={12}>
                <Typography variant="h6" color="textSecondary">
                  Need a space to study?
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <DashboardCard
                  variant="dark"
                  spaceName="Create a Space"
                  description="insert some sort of tagline or feature description "
                />
              </Grid>
            </Grid>
            <Grid item xs={12} md={6} container direction="column">
              <Grid item xs={12}>
                <Typography variant="h6" color="textSecondary">
                  Have a space to study?
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <DashboardCard
                  variant="light"
                  spaceName="Join a Space"
                  description="insert some sort of tagline or feature description "
                />
              </Grid>
            </Grid>
          </Grid>

          {/* Space Card Section */}
          <Grid item container direction="row" justify="center" alignItems="stretch" spacing={2}>
            {cardData.map(({ spaceName, description, headCount, music }) => {
              return (
                <Grid key={uniqueId(spaceName)} item xs={12} md={4}>
                  <SpacePackage data={{ spaceName, description, headCount, music, friends, participants, hosts }} />
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
