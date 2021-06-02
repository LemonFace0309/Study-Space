import React from 'react'
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import VideoPlayer from '../../components/Spaces/Video/VideoPlayer'
import Notifications from '../../components/Spaces/Video/Notifications'
import Options from '../../components/Spaces/Video/Options'
import Chat from '../../components/Spaces/Chat'

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    textAlign: 'center',
    margin: '100px auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '600px',
    border: '2px solid black',

    [theme.breakpoints.down('xs')]: {
      width: '90%',
    },
  },
  image: {
    marginLeft: '15px',
  },
}));

function Space() {
  const classes = useStyles()

  return (
    <>
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography variant="h2" align="center">Study with Me</Typography>
      </AppBar>
      <Grid container spacing={2}>
        <Grid className="flex flex-col items-center w-full" item xs={12} md={6}>
          <VideoPlayer />
          <Options>
            <Notifications />
          </Options>
        </Grid>
        <Grid item xs={12} md={6} className="flex flex-col items-center">
          <Chat />
        </Grid>
      </Grid>
    </>
  )
}

export default Space
