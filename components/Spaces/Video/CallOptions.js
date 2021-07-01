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

export default CallOptions;
