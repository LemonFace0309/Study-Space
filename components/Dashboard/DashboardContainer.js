import { React, useState } from 'react';
import {
  Container,
  Box,
  Grid,
  Typography,
  Paper,
  useTheme,
} from '@material-ui/core';
import DashboardCard from './Cards/DashboardCard';

import SpaceCardModal from './Cards/SpaceCardModal';
import SpaceCard from './Cards/SpaceCard';
import { spaceCardModalTestData } from '../../data/spaceCardModalTestData';
import { spaceCardTestData } from '../../data/spaceCardTestData';

const DashboardContainer = () => {
  const { friends, participants, hosts } = spaceCardModalTestData;
  const { cardData } = spaceCardTestData;

  const [open, setOpen] = useState(false);
  const theme = useTheme();
  return (
    <Container disableGutters>
      <Paper elevatation={6} className="rounded-3xl">
        <Grid
          container
          direction="column"
          alignContent="center"
          alignItems="center"
          justify="center"
          spacing={6}>
          <Grid container item xs={12}>
            <Grid item xs={12}>
              <Box color={theme.palette.primary.dark}>
                <Typography variant="h4">Hey Charles!</Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box color={theme.palette.text.secondary}>
                <Typography variant="h6">
                  The key is not to prioritize what's on your schedule, but to
                  schedule your priorities.
                </Typography>
              </Box>
            </Grid>
          </Grid>

          {/* Dashboard Card Section */}

          <Grid
            container
            direction="row"
            item
            alignContent="center"
            alignItems="center"
            justify="space-between"
            spacing={3}
            xs={12}>
            <Grid item xs={6} container direction="column" spacing={3}>
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
            <Grid item xs={6} container direction="column" spacing={3}>
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
          <Grid container item xs={12} spacing={2} justify="space-between">
            {cardData.map(({ spaceName, description, headCount, music }) => {
              return (
                <Grid item xs={4}>
                  <div
                    onClick={() => {
                      setOpen(true);
                    }}
                    className="cursor-pointer transform hover:scale-110 transition ease-out duration-200">
                    <SpaceCard
                      spaceName={spaceName}
                      description={description}
                      headCount={headCount}
                      music={music}
                    />
                  </div>

                  <SpaceCardModal
                    open={open}
                    handleClose={() => {
                      setOpen(false);
                    }}
                    friends={friends}
                    participants={participants}
                    hosts={hosts}>
                    <SpaceCard
                      spaceName={spaceName}
                      description={description}
                      headCount={headCount}
                      music={music}
                    />
                  </SpaceCardModal>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};
export default DashboardContainer;
