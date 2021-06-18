import { useState } from "react";
import { IconButton, TextField } from "@material-ui/core"
import Paper from "@material-ui/core/Paper"
import SendIcon from '@material-ui/icons/Send';

import Conversation from './Conversation'
import { useConversation } from '../../../context/ConversationProvider'

const Chat = ({socketRef, conversation, peersRef}) => {
  const [text, setText] = useState('')
  const [error, setError] = useState(false)
  const { sendMessage } = useConversation()

  const submitHandler = (e) => {
    e.preventDefault()


    console.log(peersRef)
    peersRef.current.forEach((peer, i) => {
      console.log(i, peer)
      peer.peer.send(text)
    });


    // const messageDidSend = sendMessage(text)
    socketRef.current.emit("send message", {text: text})
    // setError(!messageDidSend)
    setText('')
    setTimeout(() => {
      setError(false)
    }, 2000)
  }

  const keyPressHandler = (e) => {
    if (e.keyCode == 13) {
      submitHandler(e)
    }
  }

  return (
    <>
      <Paper className="flex flex-col h-96 min-h-full w-9/12 max-w-lg" elevation={3}>
        <Conversation conversation={conversation}/>
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
  )
}

export default Chat
