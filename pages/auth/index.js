import { useState, useEffect } from 'react'
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
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [validFirstName, setValidFirstName] = useState(false)
  const [validLastName, setValidLastName] = useState(false)
  const [validEmail, setValidEmail] = useState(false)
  const [validPassword, setValidPassword] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const validSignUp =
    validFirstName && validLastName && validEmail && validPassword
  const validLogIn = validEmail && validPassword

  const validateFirstName = (value) => {
    setValidFirstName(/^[a-z ,.'-]+$/i.test(value))
  }

  const validateLastName = (value) => {
    setValidLastName(/^[a-z ,.'-]+$/i.test(value))
  }

  const validateEmail = (value) => {
    setValidEmail(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        value
      )
    )
  }

  const validatePassword = (value) => {
    setValidPassword(
      !isSignUp ||
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
          value
        )
    )
  }

  useEffect(() => {
    validatePassword(password)
  }, [isSignUp])

  const handleInputChange = (e, updater, validator) => {
    updater(e.target.value)
    validator(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isSignUp) {
      // do this
    } else {
      // do that
    }
    setSubmitted(true)
  }

  let formContent = [
    <TextField
      label="Email Address"
      fullWidth
      error={submitted && !validEmail}
      helperText={
        submitted && !validEmail && 'Please enter a valid email address 🥺'
      }
      className="mb-1"
      type="email"
      value={email}
      onChange={(e) => handleInputChange(e, setEmail, validateEmail)}
    />,
    <TextField
      label="Password"
      fullWidth
      error={submitted && !validPassword}
      helperText={
        isSignUp
          ? 'Minimum eight characters. At least one letter, one number and one special character is required.'
          : submitted && !validPassword && 'Please enter a valid password 🥺'
      }
      type="password"
      value={password}
      onChange={(e) => handleInputChange(e, setPassword, validatePassword)}
    />,
  ]
  let btnText
  let switchModeText
  if (isSignUp) {
    formContent.unshift(
      <TextField
        label="First Name"
        fullWidth
        error={submitted && !validFirstName}
        helperText={
          submitted && !validFirstName && 'Please enter a valid first name 🥺'
        }
        className="mb-1"
        value={firstName}
        onChange={(e) => handleInputChange(e, setFirstName, validateFirstName)}
      />,
      <TextField
        label="Last Name"
        fullWidth
        error={submitted && !validLastName}
        helperText={
          submitted && !validLastName && 'Please enter a valid last name 🥺'
        }
        className="mb-1"
        value={lastName}
        onChange={(e) => handleInputChange(e, setLastName, validateLastName)}
      />
    )
    btnText = 'SIGN UP'
    switchModeText = 'Already have an account? '
  } else {
    btnText = 'LOG IN'
    switchModeText = "Don't have an account? "
  }

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => setModalOpen(true)}
      >
        {isSignUp ? 'Login' : 'Signup'}
      </Button>
      <Dialog
        fullWidth={true}
        maxWidth="lg"
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="Login/Signup Modal"
        className={styles.Dialogue}
      >
        <Grid container className="my-8" alignItems="center" direction="row">
          <Grid container item xs={12} md={6} direction="column">
            <form onSubmit={handleSubmit}>
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
                <Button
                  type="submit"
                  className="my-12 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-8/12 outline-none"
                  disabled={isSignUp && !validSignUp}
                >
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
            </form>
            <div className="flex justify-center">
              <Typography variant="subtitle1">
                {switchModeText}{' '}
                <Box
                  color="#977BBF"
                  className="inline cursor-pointer"
                  onClick={() => {
                    setIsSignUp((isSignUp) => !isSignUp)
                  }}
                >
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
