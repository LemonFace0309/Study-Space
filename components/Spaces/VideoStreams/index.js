import PropTypes from 'prop-types';
import Image from 'next/image';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { useSpaceContext, LAYOUT_OPTIONS } from '@/context/spaces';
import PeerVideo from './PeerVideo';

const VideoStreams = ({ showTabs }) => {
  const { layout, username, userVideo, peersRef } = useSpaceContext();

  return (
    <Grid item xs={12} md={showTabs ? 6 : 12} lg={showTabs ? 7 : 12} xl={showTabs ? 8 : 12}>
      <div className="p-5 flex flex-row flex-wrap justify-center items-center">
        <div className="relative border">
          <video muted ref={userVideo} autoPlay className="h-72 w-96 object-cover" />
          {layout == LAYOUT_OPTIONS.LIST && (
            <div>
              <div className="absolute top-0 left-0 w-full h-full">
                <Image src="/images/avatar/anime.png" alt="login screen picture" layout="fill" objectFit="cover" />
              </div>
            </div>
          )}
          <Typography variant="body1" className="z-10 absolute bottom-0 right-0 w-full text-white p-1">
            {username}
          </Typography>
        </div>

        {peersRef.current.map((peerObj) => {
          return (
            <PeerVideo key={peerObj.peerId} peer={peerObj.peer} username={peerObj.peerName} stream={peerObj.stream} />
          );
        })}
      </div>
    </Grid>
  );
};

VideoStreams.propTypes = {
  showTabs: PropTypes.bool.isRequired,
};

export default VideoStreams;
