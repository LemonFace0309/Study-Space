import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { IconButton, MenuList, MenuItem, Popper, Grow, Paper, ClickAwayListener } from '@material-ui/core';
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

import LeaveCallDialog from './LeaveCallDialog';
import ParticipantsDialog from './ParticipantsDialog';

function CallOptions({ userAudioShow, toggleUserAudio, userVideoShow, toggleUserVideo, leaveCall }) {
  const [openOptions, setOpenOptions] = useState(false);
  const [openLeaveModal, setOpenLeaveModal] = useState(false);
  const [openParticipantsModal, setOpenParticipantsModal] = useState(false);
  const buttonRef = useRef();

  const handleToggle = () => {
    setOpenOptions((openOptions) => !openOptions);
  };

  const handleClose = () => {
    if (buttonRef.current && buttonRef.current.contains(event.target)) {
      return;
    }

    setOpenOptions(false);
  };

  return (
    <>
      <div className="absolute bottom-0 left-0">
        <IconButton onClick={toggleUserAudio}>{userAudioShow ? <Mic /> : <MicOff />}</IconButton>
        <IconButton onClick={toggleUserVideo}>{userVideoShow ? <Videocam /> : <VideocamOff />}</IconButton>
        <IconButton onClick={handleToggle} ref={buttonRef}>
          <MoreVert />
        </IconButton>
      </div>

      <Popper open={openOptions} anchorEl={buttonRef.current} transition disablePortal>
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={openOptions}>
                  <MenuItem onClick={() => setOpenParticipantsModal(true)}>
                    <ViewCompact className="m-1" />
                    Participant layout
                  </MenuItem>
                  <MenuItem onClick={() => {}}>
                    <Palette className="m-1" />
                    Appearance
                  </MenuItem>
                  <MenuItem onClick={() => {}}>
                    <Settings className="m-1" />
                    Settings
                  </MenuItem>
                  <MenuItem onClick={() => setOpenLeaveModal(true)}>
                    <ExitToApp className="m-1" />
                    Quit Session
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>

      <ParticipantsDialog open={openParticipantsModal} setOpen={setOpenParticipantsModal} leaveCall={leaveCall} />
      <LeaveCallDialog open={openLeaveModal} setOpen={setOpenLeaveModal} leaveCall={leaveCall} />
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
