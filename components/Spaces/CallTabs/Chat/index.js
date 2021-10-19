import { useState } from 'react';
import PropTypes from 'prop-types';
import { IconButton, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

import { useSocketContext } from '@/context/spaces/SocketContext';
import Conversation from './Conversation';

const Chat = ({ conversation, roomId, username }) => {
  const { sendMessage } = useSocketContext();
  const [text, setText] = useState('');
  const [error, setError] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();

    sendMessage(roomId, text, username);
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
        <IconButton type="submit" color="primary" size="large">
          <SendIcon />
        </IconButton>
      </form>
    </div>
  );
};

Chat.propTypes = {
  username: PropTypes.string,
  conversation: PropTypes.array.isRequired,
  roomId: PropTypes.string.isRequired,
};

export default Chat;
