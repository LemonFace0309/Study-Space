import PropTypes from 'prop-types';
import Image from 'next/image';
import Grid from '@material-ui/core/Grid';

import { useSocketContext } from '@/context/spaces/SocketContext';
import PeerVideo from './PeerVideo';

export const LAYOUT_OPTIONS = {
  TILED: 'TILED',
  LIST: 'LIST',
  MAIN: 'MAIN',
};

const VideoStreams = ({ layout, showTabs }) => {
  const { username, userVideo, peersRef } = useSocketContext();
  console.debug(peersRef);

  return (
    <Grid item xs={12} md={showTabs ? 6 : 12} lg={showTabs ? 7 : 12} xl={showTabs ? 8 : 12}>
      <div className="p-5 flex flex-row flex-wrap justify-center items-center">
        <div className="relative border">
          <video muted ref={userVideo} autoPlay height="400" width="400" />
          {layout == LAYOUT_OPTIONS.LIST && (
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
          return <PeerVideo key={peerObj.peerId} peer={peerObj.peer} username={peerObj.peerName} />;
        })}
      </div>
    </Grid>
  );
};

VideoStreams.propTypes = {
  layout: PropTypes.string.isRequired,
  showTabs: PropTypes.bool.isRequired,
};

export default VideoStreams;
