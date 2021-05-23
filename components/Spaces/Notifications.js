import React from 'react'
import { Button } from '@material-ui/core'

import { useSocket } from '../../context/SocketContext'

function Notifications() {
  const { answerCall, call, callAccepted } = useSocket()

  return (
    <>
      {call.isReceivedCall && !callAccepted && (
        <div className="flex justify-center">
          <h1>{call.name} is calling: </h1>
          <Button variant="contained" color="primary" onClick={answerCall}>
            Answer
          </Button>
        </div>
      )}
    </>
  )
}

export default Notifications
