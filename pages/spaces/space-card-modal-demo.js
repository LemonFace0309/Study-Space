import React, { useState } from 'react';


import SpaceCardModal from '../../components/Spaces/Dashboard/SpaceCardModal';
import SpaceCard from '../../components/Spaces/Dashboard/SpaceCard';
import { spaceCardModalTestData } from '../../data/spaceCardModalTestData';
import { spaceCardTestData } from '../../data/spaceCardTestData';

export default function SpaceCardModalDemo() {
  const { friends, participants, hosts } = spaceCardModalTestData;
  const { cardData } = spaceCardTestData;

  const [open, setOpen] = useState(false);

  return (
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
  );
}
