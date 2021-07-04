import PropTypes from 'prop-types';
import { useState } from 'react';
import SpaceCardModal from './SpaceCardModal';
import SpaceCard from '../../Shared/SpaceCard';

const SpacePackage = ({ data }) => {
  const [open, setOpen] = useState(false);

  const { spaceName, description, headCount, music, friends, participants, hosts } = data;
  return (
    <>
      <div
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
  isClickable: PropTypes.bool,
  spaceName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  headCount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  music: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
  friends: PropTypes.array,
  participants: PropTypes.array,
  hosts: PropTypes.array,
};

export default SpacePackage;
