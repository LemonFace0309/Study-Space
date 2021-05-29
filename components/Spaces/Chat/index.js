import { IconButton, TextField } from "@material-ui/core"
import Paper from "@material-ui/core/Paper"
import SendIcon from '@material-ui/icons/Send';

const Chat = () => {
  return (
    <>
      <Paper className="flex flex-col h-96 min-h-full w-9/12 max-w-lg">
        <div className="flex-grow">Testing</div>
        <div className="flex items-center">
          <TextField
            variant="outlined"
            label="Message User"
            fullWidth
          />
          <IconButton color="primary">
            <SendIcon />
          </IconButton>
        </div>
      </Paper>
    </>
  )
}

export default Chat
