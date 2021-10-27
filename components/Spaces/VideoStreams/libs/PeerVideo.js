import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import MicOffIcon from '@mui/icons-material/MicOff';
import { styled } from '@mui/material/styles';

import ImageOverlay from './ImageOverlay';

const ProgressBox = styled(Box)({
  height: '100%',
  width: '100%',
  display: 'grid',
  placeItems: 'center',
  position: 'absolute',
  zIndex: 10,
  top: 0,
});

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
