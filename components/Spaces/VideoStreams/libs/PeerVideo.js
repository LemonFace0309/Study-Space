import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';

import ImageOverlay from './ImageOverlay';
import TextOverlay from './TextOverlay';

const ProgressBox = styled(Box)({
  height: '100%',
  width: '100%',
  display: 'grid',
  placeItems: 'center',
  position: 'absolute',
  zIndex: 10,
  top: 0,
});

const PeerVideo = ({ peerObj }) => {
  const ref = useRef();

  useEffect(() => {
    if (peerObj.stream) {
      ref.current.srcObject = peerObj.stream;
    }
  }, [peerObj.peer, peerObj.stream]);

  const Overlay = () => {
    if (!peerObj.stream)
      return (
        <ProgressBox>
          <CircularProgress size={50} />
        </ProgressBox>
      );

    if (!peerObj.isVideoEnabled) return <ImageOverlay />;
    return null;
  };

  return (
    <div style={{ position: 'relative' }}>
      <video controls autoPlay ref={ref} style={{ objectFit: 'cover', height: '18rem', width: '32rem' }}>
        <track kind="captions"></track>
      </video>
      <Overlay />
      <TextOverlay
        username={peerObj.peerName}
        isAudioEnabled={peerObj.isAudioEnabled}
        statusBubble={peerObj.statusBubble}
      />
    </div>
  );
};

PeerVideo.propTypes = {
  peerObj: PropTypes.shape({
    peer: PropTypes.object.isRequired,
    peerName: PropTypes.string.isRequired,
    stream: PropTypes.object,
    isAudioEnabled: PropTypes.bool.isRequired,
    isVideoEnabled: PropTypes.bool.isRequired,
    statusBubble: PropTypes.string,
  }),
};

export default PeerVideo;
