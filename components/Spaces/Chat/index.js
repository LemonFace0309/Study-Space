import { useState } from "react";
import { IconButton, TextField } from "@material-ui/core"
import Paper from "@material-ui/core/Paper"
import SendIcon from '@material-ui/icons/Send';

import Conversation from './Conversation'
import { useConversation } from '../../../context/ConversationProvider'

const Chat = () => {
  const [text, setText] = useState('')
  const { sendMessage } = useConversation()

  const submitHandler = (e) => {
    e.preventDefault()
    console.log('test')

    sendMessage(text)
  }

  return (
    <>
      <Paper className="flex flex-col h-96 min-h-full w-9/12 max-w-lg">
        <Conversation />
        <form onSubmit={submitHandler} className="flex items-center">
          <TextField
            variant="outlined"
            label="Message User"
            fullWidth
            multiline
            rows={1}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <IconButton type="submit" color="primary">
            <SendIcon />
          </IconButton>
        </form>
      </Paper>
    </>
  )
}

export default Chat
