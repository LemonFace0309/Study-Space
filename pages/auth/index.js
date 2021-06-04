import { useState } from 'react'
import Image from 'next/image'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import {
  Box,
  Divider,
  Grid,
  Hidden,
  Typography,
  IconButton,
} from '@material-ui/core'

import styles from '../../styles/Auth/Auth.module.css'

const Auth = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)

  const handleOpenModal = () => {
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
  }

  let formContent
  let btnText
  let switchModeText
  if (isSignUp) {
    formContent = (
      <>
        <TextField label="First Name" fullWidth className="mb-1" />
        <TextField label="Last Name" fullWidth className="mb-1" />
        <TextField label="Email Address" fullWidth className="mb-1" />
        <TextField label="Password" fullWidth />
      </>
    )
    btnText = 'SIGN UP'
    switchModeText = "Already have an account? "
  } else {
    formContent = (
      <>
        <TextField label="Email Address" fullWidth className="mb-1" />
        <TextField label="Password" fullWidth />
      </>
    )
    btnText = 'LOG IN'
    switchModeText = "Don't have an account? "
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleOpenModal}>
        {isSignUp ? 'Login' : 'Signup'}
      </Button>
      <Dialog
        fullWidth={true}
        maxWidth="lg"
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="Login/Signup Modal"
        className={styles.Dialogue}
      >
        <Grid container className="my-8" alignItems="center">
          <Grid item xs={12} md={6} direction="column">
            <div className="flex-grow flex flex-col items-center p-8">
              <Typography
                variant="h4"
                component="h1"
                style={{ color: '#4E3276' }}
                className="font-bold"
              >
                Log in
              </Typography>
              <div className="w-8/12 mt-8">{formContent}</div>
              <Button className="my-12 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-8/12 outline-none">
                {btnText}
              </Button>
              <div className="flex w-full justify-center items-center">
                <Divider className="w-4/12 h-0.5" />
                <Typography variant="caption" component="p" className="mx-3">
                  OR
                </Typography>
                <Divider className="w-4/12 h-0.5" />
              </div>
              <Typography variant="caption" component="p" className="my-2">
                Log in with
              </Typography>
              <div className="flex w-full justify-center items-center">
                <IconButton className="mr-4 outline-none">
                  <Image
                    src="/images/facebook.svg"
                    alt="Facebook Login"
                    height="32"
                    width="32"
                  />
                </IconButton>
                <IconButton className="outline-none ">
                  <Image
                    src="/images/google.svg"
                    alt="Facebook Login"
                    height="32"
                    width="32"
                  />
                </IconButton>
              </div>
            </div>
            <div className="flex justify-center">
              <Typography variant="subtitle1">
                {switchModeText}{' '}
                <Box color="#977BBF" className="inline cursor-pointer" onClick={() => setIsSignUp((isSignUp) => !isSignUp)}>
                  {isSignUp ? 'Log in' : 'Sign up'}
                </Box>
              </Typography>
            </div>
          </Grid>
          <Hidden smDown>
            <Grid
              item
              md={6}
              className="overflow-hidden flex flex-col content-center items-start"
            >
              <Typography variant="h6" component="h4" className="mb-2">
                All your study needs in one space.
              </Typography>
              <div className="w-11/12 max-w-lg relative">
                <div style={{ paddingTop: '100%' }}>
                  <Image
                    src="/images/placeholder.jpg"
                    alt="login screen picture"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>
            </Grid>
          </Hidden>
        </Grid>
      </Dialog>
    </div>
  )
}

export default Auth
