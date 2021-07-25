import { useState } from 'react';
import PropTypes from 'prop-types';
import { IconButton, TextField } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

import Conversation from './Conversation';

const Chat = ({ conversation, socketRef, roomID, username }) => {
  const [text, setText] = useState('');
  const [error, setError] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    socketRef.current.emit('send message', {
      roomID,
      message: text,
      username,
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
    <div className="flex p-2 flex-col flex-1 h-96 w-full">
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
    </div>
  );
};

Chat.propTypes = {
  username: PropTypes.string,
  conversation: PropTypes.array.isRequired,
  roomID: PropTypes.string.isRequired,
  socketRef: PropTypes.object.isRequired,
};

export default Chat;
