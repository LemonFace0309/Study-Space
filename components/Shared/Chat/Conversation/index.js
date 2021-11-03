import { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material';

const MessageContainer = styled(Box, { shouldForwardProp: (prop) => prop !== 'fromMe' })(({ theme, fromMe }) => ({
  margin: theme.spacing(0.5, 0),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  ...(fromMe && {
    alignItems: 'end',
    alignSelf: 'end',
  }),
}));

const MessageText = styled(Box, { shouldForwardProp: (prop) => !['bgColour', 'text', 'border'].includes(prop) })(
  ({ theme, bgColour, text, border }) => ({
    borderRadius: '0.25rem',
    padding: theme.spacing(0.5, 1),
    color: text,
    backgroundColor: bgColour,
    borderWidth: border,
  })
);

const MessageSender = styled(Box)({
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
});

const Conversation = ({ conversation }) => {
  const theme = useTheme();

  const setRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView({ smooth: true });
    }
  }, []);

  const messages = useMemo(() => {
    return conversation.map((message, index) => {
      let subText = '';
      if (message.fromMe && message.dm) {
        subText = `To ${message.recipient}`;
      } else if (message.fromMe) {
        subText = `Me`;
      } else if (message.dm) {
        subText = `From ${message.sender}`;
      } else {
        subText = `${message.sender}`;
      }

      const lastMessage = conversation.length - 1 === index;
      return (
        <MessageContainer ref={lastMessage ? setRef : null} key={index} fromMe={message.fromMe}>
          <MessageText
            bgColour={message.dm ? 'honeydew' : message.fromMe ? theme.palette.primary.main : 'white'}
            text={message.dm ? 'black' : message.fromMe ? 'white' : 'black'}
            border={message.fromMe ? '0px' : '2px'}>
            {message.text}
          </MessageText>
          <MessageSender>{subText}</MessageSender>
        </MessageContainer>
      );
    });
  }, [conversation]);

  return (
    <Box sx={{ flexGrow: '1', overflow: 'auto' }}>
      <Box sx={{ px: 1.5 }}>{messages}</Box>
    </Box>
  );
};

Conversation.propTypes = {
  conversation: PropTypes.array.isRequired,
};

export default Conversation;
