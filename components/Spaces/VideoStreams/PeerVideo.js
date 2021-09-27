import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

import { useSocketContext } from '@/context/spaces/SocketContext';

const PeerVideo = ({ peer, username, stream }) => {
  const {
    constants: { USER_MEDIA_ACTIVE },
  } = useSocketContext();
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
      <video muted={JSON.parse(localStorage.getItem(USER_MEDIA_ACTIVE))} autoPlay ref={ref} height="400" width="400">
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
