import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const PeerVideo = ({ peer, username, stream }) => {
  const ref = useRef();

  useEffect(() => {
    if (stream) {
      ref.current.srcObject = stream;
    }
    // peer.on('stream', (stream) => {
    //   ref.current.srcObject = stream;
    // });
  }, [peer, stream]);

  return (
    <div className="flex flex-col relative">
      <video autoPlay ref={ref} className="h-72 w-96 object-cover">
        <track kind="captions"></track>
      </video>
      <Typography variant="body1" className="z-10 absolute bottom-0 right-0 w-full text-white p-1">
        {username}
      </Typography>
    </div>
  );
};

PeerVideo.propTypes = {
  peer: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  stream: PropTypes.object,
};

PeerVideo.defaultProps = {
  stream: null,
};

export default PeerVideo;
