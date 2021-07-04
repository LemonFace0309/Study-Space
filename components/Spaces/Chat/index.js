import { useState } from 'react';
import PropTypes from 'prop-types';
import { IconButton, TextField } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import SendIcon from '@material-ui/icons/Send';

import Conversation from './Conversation';

const Chat = ({ conversation, setConversation, peersRef }) => {
  const [text, setText] = useState('');
  const [error, setError] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    setConversation((prevConversation) => {
      return [...prevConversation, { text: text, fromMe: true }];
    });
    peersRef.current.forEach((peerObj) => {
      if (peerObj && !peerObj.peer.destroyed) {
        peerObj.peer.send(text);
      }
    });

    setText('');
    setTimeout(() => {
      setError(false);
    }, 2000);
  };

  const keyPressHandler = (e) => {
    if (e.keyCode == 13) {
      submitHandler(e);
    }
  };

  return (
    <>
      <Paper className="flex flex-col h-96 min-h-full max-w-lg" elevation={3}>
        <Conversation conversation={conversation} />
        <form onSubmit={submitHandler} className="flex items-center mt-2">
          <TextField
            error={error}
            helperText={error}
            variant="outlined"
            label="Message User"
            fullWidth
            multiline
            rows={1}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={keyPressHandler}
          />
          <IconButton type="submit" color="primary">
            <SendIcon />
          </IconButton>
        </form>
      </Paper>
    </>
  );
};

Chat.propTypes = {
  conversation: PropTypes.array.isRequired,
  setConversation: PropTypes.func.isRequired,
  peersRef: PropTypes.array.isRequired,
};

export default Chat;
