import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { IconButton, Menu, MenuItem, Fade } from '@material-ui/core';
import {
  Mic,
  MicOff,
  Videocam,
  VideocamOff,
  MoreVert,
  ViewCompact,
  Palette,
  Settings,
  ExitToApp,
} from '@material-ui/icons';

function CallOptions({ userAudioShow, toggleUserAudio, userVideoShow, toggleUserVideo, leaveCall }) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef();

  const handleOpen = () => {
    setOpen((open) => !open);
  };

  return (
    <>
      <div className="absolute bottom-0 left-0">
        <IconButton onClick={toggleUserAudio}>{userAudioShow ? <Mic /> : <MicOff />}</IconButton>
        <IconButton onClick={toggleUserVideo}>{userVideoShow ? <Videocam /> : <VideocamOff />}</IconButton>
        <IconButton onClick={handleOpen} ref={buttonRef}>
          <MoreVert />
        </IconButton>
      </div>

      <Menu keepMounted open={open} anchorEl={buttonRef.current} TransitionComponent={Fade}>
        <MenuItem onClick={handleOpen}>
          <ViewCompact className="m-1" />
          Participant layout
        </MenuItem>
        <MenuItem onClick={handleOpen}>
          <Palette className="m-1" />
          Appearance
        </MenuItem>
        <MenuItem onClick={handleOpen}>
          <Settings className="m-1" />
          Settings
        </MenuItem>
        <MenuItem onClick={leaveCall}>
          <ExitToApp className="m-1" />
          Quit Session
        </MenuItem>
      </Menu>
    </>
  );
}

CallOptions.propTypes = {
  userAudioShow: PropTypes.bool.isRequired,
  toggleUserAudio: PropTypes.func.isRequired,
  userVideoShow: PropTypes.bool.isRequired,
  toggleUserVideo: PropTypes.func.isRequired,
  leaveCall: PropTypes.func.isRequired,
};

export default CallOptions;
