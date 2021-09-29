import { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

import { useTheme } from '@mui/material';

const Conversation = ({ conversation }) => {
  // const { conversation } = useConversation()
  const theme = useTheme();

  const setRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView({ smooth: true });
    }
  }, []);

  const messages = useMemo(
    () =>
      conversation.map((message, index) => {
        const lastMessage = conversation.length - 1 === index;
        return (
          <div
            ref={lastMessage ? setRef : null}
            key={index}
            className={`my-1 flex flex-col ${message.fromMe ? 'self-end items-end' : 'items-start'}`}>
            <div
              className={`rounded px-2 py-1 ${message.fromMe ? 'text-white' : 'border-2'}`}
              style={{ backgroundColor: message.fromMe ? theme.palette.primary.main : 'white' }}>
              {message.text}
            </div>
            <div className={`text-current text-sm ${message.fromMe ? 'text-right' : ''}`}>
              {message.fromMe ? 'Me' : message.sender}
            </div>
          </div>
        );
      }),
    [conversation]
  );

  return (
    <div className="flex-grow overflow-auto">
      <div className="flex flex-col items-start justify-end px-3">{messages}</div>
    </div>
  );
};

Conversation.propTypes = {
  conversation: PropTypes.array.isRequired,
};

export default Conversation;
