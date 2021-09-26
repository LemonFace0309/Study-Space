import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';

import PeerVideo from './PeerVideo';

const USER_MEDIA_ACTIVE = 'USER_MEDIA_ACTIVE';

const VideoGrid = ({ layout, userVideo, peersRef, username }) => {
  return (
    <div className="p-5 flex flex-row flex-wrap justify-center items-center">
      <div className="relative border">
        <video muted ref={userVideo} autoPlay height="400" width="400" />
        {layout == 'LIST' && (
          <div>
            <div className="absolute top-0 left-0 w-full h-full">
              <Image src="/images/avatar/anime.png" alt="login screen picture" layout="fill" objectFit="cover" />
            </div>
            <div className="z-10 absolute bottom-0 right-0 w-full">
              <div className="p-1 text-white"> {username} </div>
            </div>
          </div>
        )}
      </div>

      {peersRef.current.map((peerObj) => {
        return <PeerVideo key={peerObj.peerID} peer={peerObj.peer} username={peerObj.peerName} />;
      })}
    </div>
  );
};

VideoGrid.propTypes = {
  layout: PropTypes.string.isRequired,
  userVideo: PropTypes.object,
  peersRef: PropTypes.object,
  username: PropTypes.string,
};

export default VideoGrid;
