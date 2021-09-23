import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import { useSocketContext } from '@/context/spaces/SocketContext';
import PeerVideo from './PeerVideo';

const VideoStreams = ({ showTabs }) => {
  const { userVideo, peersRef } = useSocketContext();

  return (
    <Grid item xs={12} md={showTabs ? 6 : 12} lg={showTabs ? 7 : 12} xl={showTabs ? 8 : 12}>
      <div className="p-5 flex flex-row flex-wrap justify-center items-center">
        <video muted ref={userVideo} autoPlay height="400" width="400" />
        {peersRef.current.map((peerObj) => {
          return <PeerVideo key={peerObj.peerID} peer={peerObj.peer} username={peerObj.peerName} />;
        })}
      </div>
    </Grid>
  );
};

VideoStreams.propTypes = {
  showTabs: PropTypes.bool.isRequired,
};

export default VideoStreams;
