import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

const USER_MEDIA_ACTIVE = 'USER_MEDIA_ACTIVE';

const PeerVideo = ({ peer, username }) => {
  const ref = useRef();
  useEffect(() => {
    peer.on('stream', (stream) => {
      ref.current.srcObject = stream;
    });
  }, [peer]);
  return (
    <div className="flex flex-col">
      <video muted={JSON.parse(localStorage.getItem(USER_MEDIA_ACTIVE))} autoPlay ref={ref} height="400" width="400">
        <track kind="captions"></track>
      </video>
      <span>{username}</span>
    </div>
  );
};

PeerVideo.propTypes = {
  peer: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
};

export default PeerVideo;
