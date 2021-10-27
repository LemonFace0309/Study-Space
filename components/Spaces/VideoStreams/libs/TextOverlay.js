import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MicOffIcon from '@mui/icons-material/MicOff';
import { styled } from '@mui/material/styles';

import STATUS_ENUM from '@/context/spaces/libs/statusBubbleEnum';

const StatusBox = styled(Box)(({ theme }) => ({
  zIndex: 100,
  position: 'absolute',
  width: '100%',
  top: '0',
  color: 'white',
  padding: theme.spacing(1, 1, 0, 0),
  textAlign: 'right',
}));

const StatusIcon = styled(Box, { shouldForwardProp: (prop) => prop !== 'statusBubble' })(({ theme, statusBubble }) => ({
  width: theme.spacing(2),
  height: theme.spacing(2),
  marginLeft: 'auto',
  overflow: 'hidden',
  borderRadius: '999px',
  backgroundColor:
    statusBubble == STATUS_ENUM.ACTIVE ? 'blue' : statusBubble == STATUS_ENUM.FOCUSED ? 'green' : 'yellow',
}));

const Tooltip = styled(Box)({
  zIndex: 1,
});

const TextBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  zIndex: 100,
  position: 'absolute',
  width: '100%',
  bottom: '0',
  color: 'white',
  padding: theme.spacing(0, 1, 0.5, 1),
}));

const TextOverlay = ({ username, isAudioEnabled, statusBubble }) => {
  return (
    <>
      <StatusBox>
        <StatusIcon statusBubble={statusBubble} />
        <Tooltip>
          <span>{statusBubble}</span>
        </Tooltip>
      </StatusBox>
      <TextBox>
        <Typography variant="body1">{username}</Typography>
        {!isAudioEnabled && <MicOffIcon />}
      </TextBox>
    </>
  );
};

TextOverlay.propTypes = {
  username: PropTypes.string.isRequired,
  isAudioEnabled: PropTypes.bool.isRequired,
  statusBubble: PropTypes.string,
};

export default TextOverlay;
