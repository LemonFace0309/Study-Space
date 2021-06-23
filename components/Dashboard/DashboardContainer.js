import { React, useState } from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import DashboardCard from './Cards/DashboardCard';

import SpaceCardModal from './Cards/SpaceCardModal';
import SpaceCard from './Cards/SpaceCard';
import { spaceCardModalTestData } from '../../data/spaceCardModalTestData';
import { spaceCardTestData } from '../../data/spaceCardTestData';

const DashboardContainer = () => {
  const { friends, participants, hosts } = spaceCardModalTestData;
  const { cardData } = spaceCardTestData;

  const [open, setOpen] = useState(false);

  return (
    <Container>
      <Grid container>
        <Grid container item xs={12}>
          <Grid item xs={12}>
            <Typography variant="h4">Hey Charles!</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h7">
              The key is not to prioritize what's on your schedule, but to
              schedule your priorities.
            </Typography>
          </Grid>
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={6}>
            <DashboardCard
              variant="primary"
              spaceName="Create a Space"
              description="insert some sort of tagline or feature description "
            />
          </Grid>
          <Grid item xs={6}>
            <DashboardCard
              spaceName="Join a Space"
              description="insert some sort of tagline or feature description "
            />
          </Grid>
        </Grid>
        <Grid container item xs={12}>
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
        <Grid container item xs={12}>
          
        </Grid>
      </Grid>
    </Container>
  );
};
export default DashboardContainer;
