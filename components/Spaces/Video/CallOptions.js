import PropTypes from 'prop-types';
import { IconButton } from '@material-ui/core';
import { Mic, MicOff, Videocam, VideocamOff } from '@material-ui/icons';

function CallOptions({ userAudioShow, toggleUserAudio, userVideoShow, toggleUserVideo }) {
  return (
    <div className="absolute bottom-0 left-0">
      <IconButton onClick={toggleUserAudio}>{userAudioShow ? <Mic /> : <MicOff />}</IconButton>
      <IconButton onClick={toggleUserVideo}>{userVideoShow ? <Videocam /> : <VideocamOff />}</IconButton>
    </div>
  );
}

CallOptions.propTypes = {
  userAudioShow: PropTypes.bool.isRequired,
  toggleUserAudio: PropTypes.func.isRequired,
  userVideoShow: PropTypes.bool.isRequired,
  toggleUserVideo: PropTypes.func.isRequired,
};

export default CallOptions;
