import React, { useState } from 'react';

import {
  useTheme,
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';

import { Button } from '@material-ui/core';
import SpaceCardModal from '../../components/Dashboard/Cards/SpaceCardModal';
import SpaceCard from '../../components/Dashboard/Cards/SpaceCard';

import Typography from '@material-ui/core/Typography';
import { spaceCardModalTestData } from '../../data/spaceCardModalTestData';
import { spaceCardTestData } from '../../data/spaceCardTestData';

const theme = createMuiTheme({
  palette: {
    primary: {
      dark: '#614885',
      main: '#977BBF',
      light: '#F5F2F9',
    },
    secondary: {
      main: '#f44336',
    },
  },
});

export default function SpaceCardModalDemo() {
  // For the sake of the demo, we are using locally defined theme.
  // When using ThemeProvider, use the useTheme() hook.
  // const theme = useTheme();
  const { friends, participants, hosts } = spaceCardModalTestData;
  const { cardData } = spaceCardTestData;

  const [open, setOpen] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <div className="flex flex-row space-x-5">
        {cardData.map(({ spaceName, description, headCount, music }) => {
          return (
            <div>
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
            </div>
          );
        })}
      </div>
    </ThemeProvider>
  );
}
