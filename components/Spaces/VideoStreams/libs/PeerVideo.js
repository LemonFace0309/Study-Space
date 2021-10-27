import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MicOffIcon from '@mui/icons-material/MicOff';
import { styled } from '@mui/material/styles';

import ImageOverlay from './ImageOverlay';

const InfoBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  zIndex: 100,
  position: 'absolute',
  width: '100%',
  bottom: '0',
  color: 'white',
  padding: theme.spacing(0, 1, 0.5, 1),
}));

const PeerVideo = ({ peerObj }) => {
  const ref = useRef();

  useEffect(() => {
    if (peerObj.stream) {
      ref.current.srcObject = peerObj.stream;
    }
  }, [peerObj.peer, peerObj.stream]);

  return (
    <div className="relative">
      <video controls autoPlay ref={ref} style={{ objectFit: 'cover', height: '18rem', width: '32rem' }}>
        <track kind="captions"></track>
      </video>
      {!peerObj.isVideoEnabled && <ImageOverlay />}
      <InfoBox>
        <Typography variant="body1">{peerObj.peerName}</Typography>
        {!peerObj.isAudioEnabled && <MicOffIcon />}
      </InfoBox>
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
  }),
};

export default PeerVideo;
