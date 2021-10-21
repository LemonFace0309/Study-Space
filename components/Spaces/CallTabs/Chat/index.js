import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { IconButton, TextField, Box, Chip } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { styled } from '@mui/material/styles';

import { useSocketContext } from '@/context/spaces/SocketContext';
import Conversation from './Conversation';

const FileChip = styled(Chip)(({ theme }) => ({
  marginRight: theme.spacing(1),
}));

const Input = styled('input')({
  display: 'none',
});

const Chat = ({ conversation, roomId, username }) => {
  const { sendMessage } = useSocketContext();
  const [text, setText] = useState('');
  const [error, setError] = useState(false);
  const [files, setFiles] = useState([]);

  const filesHandler = (e) => {
    setFiles([...e.target.files]);
  };

  const removeFileHandler = (index) => {
    setFiles((prev) => {
      prev.splice(index, 1);
      console.debug(prev);
      return [...prev];
    });
  };

  const getFileLinks = async () => {
    const formData = new FormData();

    files.forEach((file) => {
      formData.append('files', file);
    });

    try {
      const res = await axios.post('/api/spaces/upload-files', formData, {
        headers: { 'content-type': 'multipart/form-data' },
        onUploadProgress: (event) => {
          console.debug(`Current progress:`, Math.round((event.loaded * 100) / event.total));
        },
      });
      return res.data;
    } catch (err) {
      console.debug(err);
    }
    return [];
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const validMsg = text && /\S/.test(text);

    const fileMsgs = [];

    if (files.length) {
      const msgData = await getFileLinks();

      msgData.data.forEach((msg) => {
        fileMsgs.push(`${msg.name}: ${msg.data.Location}`);
      });
    }

    fileMsgs.forEach((fm) => sendMessage(roomId, fm, username));
    if (validMsg) sendMessage(roomId, text, username);

    setText('');
    setFiles([]);
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
      <Box sx={{ mb: 0.5 }}>
        {files.map((file, i) => (
          <FileChip key={file.lastModified} label={file.name} onDelete={() => removeFileHandler(i)} />
        ))}
      </Box>
      <form onSubmit={submitHandler} className="flex items-center mt-2">
        <label htmlFor="icon-button-file">
          <Input id="icon-button-file" type="file" multiple="multiple" onChange={filesHandler} />
          <IconButton color="primary" size="large" component="span">
            <AddCircleIcon />
          </IconButton>
        </label>
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
