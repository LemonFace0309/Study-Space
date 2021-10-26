import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import { useSpaceContext } from '@/context/spaces';
import ROLES from '@/context/spaces/libs/roles';
import MyVideo from './libs/MyVideo';
import PeerVideo from './libs/PeerVideo';

const VideoContainer = styled(Box, { shouldForwardProp: (prop) => prop !== 'status' })(({ theme, status }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: status == ROLES.TEACHER.value ? 'center' : 'start',
  alignItems: 'center',
}));

const VideoStreams = ({ showTabs }) => {
  const { role, peersRef } = useSpaceContext();

  return (
    <Grid item xs={12} md={showTabs ? 6 : 12} lg={showTabs ? 7 : 12} xl={showTabs ? 8 : 12}>
      {/* Teachers */}
      <VideoContainer status={ROLES.TEACHER.value}>{role == ROLES.TEACHER.value && <MyVideo />}</VideoContainer>

      {/* Students */}
      <VideoContainer status={ROLES.STUDENT.value}>
        {role == ROLES.STUDENT.value && <MyVideo />}
        {peersRef.current.map((peerObj) => {
          return (
            <PeerVideo key={peerObj.peerId} peer={peerObj.peer} username={peerObj.peerName} stream={peerObj.stream} />
          );
        })}
      </VideoContainer>
    </Grid>
  );
};

VideoStreams.propTypes = {
  showTabs: PropTypes.bool.isRequired,
};

export default VideoStreams;
