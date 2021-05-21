import React from 'react'
import { Typography, AppBar } from '@material-ui/core'

import VideoPlayer from '../../components/Spaces/VideoPlayer'
import Notifications from '../../components/Spaces/Notifications'
import Options from '../../components/Spaces/Options'

function Space() {
  return (
    <div>
      <AppBar position="static" color="inherit">
        <Typography variant="h2" align="center">Video Chat</Typography>
      </AppBar>
      <VideoPlayer />
      <Options>
        <Notifications />
      </Options>
    </div>
  )
}

export default Space
