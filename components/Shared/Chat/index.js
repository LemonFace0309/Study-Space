import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { IconButton, TextField, Box, Chip } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { styled } from '@mui/material/styles';

import ROLES from '@/context/libs/roles';
import Conversation from './Conversation';
import MessageOptions from './MessageOptions';

const FileChip = styled(Chip)(({ theme }) => ({
  marginRight: theme.spacing(1),
}));

const Input = styled('input')({
  display: 'none',
});

const Chat = ({ role, conversation, sendMessage, directMessage, peers, admins }) => {
  const [text, setText] = useState('');
  const [error, setError] = useState(false);
  const [files, setFiles] = useState([]);
  const [messageOption, setMessageOption] = useState(null);
  const messageOptions = useMemo(() => {
    let options = [];
    if (admins) {
      options.push(
        ...admins.map((admin) => ({
          username: admin.username,
          socketId: admin.socketId,
        }))
      );
    }
    if (peers) {
      const optionFilter = role == ROLES.TEACHER.value ? ROLES.STUDENT.value : ROLES.TEACHER.value;
      options.push(
        ...peers
          .filter((peerObj) => peerObj?.role == optionFilter)
          .map((obj) => ({
            username: obj.peerName,
            socketId: obj.peerId,
          }))
      );
    }
    console.debug(options);
    return options;
  }, [role, peers, admins]);

  const filesHandler = (e) => {
    setFiles([...e.target.files]);
  };

  const removeFileHandler = (index) => {
    setFiles((prev) => {
      prev.splice(index, 1);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validMsg = text && /\S/.test(text);

    const fileMsgs = [];

    if (files.length) {
      const msgData = await getFileLinks();

      msgData.data.forEach((msg) => {
        fileMsgs.push(`${msg.name}: ${msg.data.Location}`);
      });
    }

    fileMsgs.forEach((fm) => sendMessage(fm));
    if (validMsg && messageOption == null && sendMessage) {
      sendMessage(text);
    } else if (validMsg && directMessage) {
      directMessage(text, messageOptions[messageOption].socketId);
    }

    setText('');
    setFiles([]);
    setTimeout(() => {
      setError(false);
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.keyCode == 13) {
      handleSubmit(e);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: '1', height: '100%', width: '100%', p: 1 }}>
      <Conversation conversation={conversation} />
      {(peers || admins) && (
        <MessageOptions selectedIndex={messageOption} setSelectedIndex={setMessageOption} options={messageOptions} />
      )}
      <Box sx={{ mb: 0.5 }}>
        {files.map((file, i) => (
          <FileChip key={file.lastModified} label={file.name} onDelete={() => removeFileHandler(i)} />
        ))}
      </Box>
      <form onSubmit={handleSubmit} className="flex items-center mt-2">
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
          onKeyDown={handleKeyPress}
        />
        <IconButton type="submit" color="primary" size="large">
          <SendIcon />
        </IconButton>
      </form>
    </Box>
  );
};

Chat.propTypes = {
  role: PropTypes.string.isRequired,
  conversation: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      sender: PropTypes.string.isRequired,
      fromMe: PropTypes.bool.isRequired,
      dm: PropTypes.bool.isRequired,
    }).isRequired
  ).isRequired,
  sendMessage: PropTypes.func.isRequired,
  directMessage: PropTypes.func,
  peers: PropTypes.arrayOf(
    PropTypes.shape({
      peerName: PropTypes.string.isRequired,
      peerId: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
    }).isRequired
  ),
  admins: PropTypes.arrayOf(
    PropTypes.shape({
      username: PropTypes.string.isRequired,
      socketId: PropTypes.string.isRequired,
    })
  ),
};

export default Chat;
