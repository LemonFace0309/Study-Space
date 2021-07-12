/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import PropTypes from 'prop-types';
import { useState } from 'react';
import SpaceCardModal from './SpaceCardModal';
import SpaceCard from '../../Shared/SpaceCard';

const SpacePackage = ({ spaceCardData, spaceCardModalData }) => {
  const [open, setOpen] = useState(false);

  const { spaceName, description, headCount, music } = spaceCardData;
  const { friends, participants, hosts } = spaceCardModalData;
  return (
    <>
      <div
        className="h-full"
        onClick={() => {
          setOpen(true);
        }}>
        <SpaceCard
          isClickable={true}
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
        <SpaceCard spaceName={spaceName} description={description} headCount={headCount} music={music} />
      </SpaceCardModal>
    </>
  );
};

SpacePackage.propTypes = {
  spaceCardData: PropTypes.shape({
    spaceName: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    headCount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    music: PropTypes.string.isRequired,
  }),
  spaceCardModalData: PropTypes.shape({
    friends: PropTypes.array,
    participants: PropTypes.array,
    hosts: PropTypes.array,
  }),
};

export default SpacePackage;
