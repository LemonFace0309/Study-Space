import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import classNames from 'classnames';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { AppBar, Toolbar, Button, TextField } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import AuthDialog from '../../Auth/AuthDialog';
import NavDrawer from './NavDrawer';
import styles from '../../Shared/Spinner.module.css';

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const Header = (props) => {
  const { providers, signIn, signOut, getSession } = props;
  const [isNavDrawerOpen, setIsNavDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validFirstName, setValidFirstName] = useState(false);
  const [validLastName, setValidLastName] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // using classNames so it's easy to change when making responsive
  const menuItemStyles = classNames([
    'mx-2',
    'outline-none',
    'hover:text-gray-500',
    'transition duration-200 ease-in-out',
  ]);
  const authButtons = classNames([
    'normal-case',
    'px-10',
    'm-2',
    'rounded-full',
    'outline-none',
  ]);

  const validSignUp =
    validFirstName && validLastName && validEmail && validPassword;
  const validLogIn = validEmail && validPassword;

  const validateFirstName = (value) => {
    setValidFirstName(/^[a-z ,.'-]+$/i.test(value));
  };

  const validateLastName = (value) => {
    setValidLastName(/^[a-z ,.'-]+$/i.test(value));
  };

  const validateEmail = (value) => {
    setValidEmail(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        value
      )
    );
  };

  const validatePassword = (value) => {
    setValidPassword(
      !isSignUp ||
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
          value
        )
    );
  };

  useEffect(async () => {
    const userSession = await getSession();
    setSession(userSession);
    setLoading(false);
    console.debug(userSession);
  }, []);

  useEffect(() => {
    validatePassword(password);
  }, [isSignUp]);

  const handleInputChange = (e, updater, validator) => {
    updater(e.target.value);
    validator(e.target.value);
  };

  const handleCredentialsSubmit = async (e) => {
    e.preventDefault();
    if (isSignUp && validSignUp) {
      const result = await axios.post('/api/createnewuser', {
        name: firstName + ' ' + lastName,
        email,
        password,
        type: 'credentials',
      });
      console.debug(result);
    } else if (validLogIn) {
      signIn('credentials', { email, password });
    }
    setSubmitted(true);
  };

  let btnText;
  let oAuthText;
  let switchModeText;
  let formContent = [
    <TextField
      key="1"
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
      key="2"
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
  ];
  if (isSignUp) {
    formContent.unshift(
      <TextField
        key="3"
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
        key="4"
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
    );
    btnText = 'SIGN UP';
    switchModeText = 'Already have an account? ';
    oAuthText = 'Sign up with';
  } else {
    btnText = 'LOG IN';
    switchModeText = "Don't have an account? ";
    oAuthText = 'Log in with';
  }

  const handleSignUp = () => {
    setIsSignUp(true);
    setModalOpen(true);
  };

  const handleLogIn = () => {
    setIsSignUp(false);
    setModalOpen(true);
  };

  if (loading) {
    return <div className={styles.loader} />;
  }

  return (
    <>
      <NavDrawer
        isOpen={isNavDrawerOpen}
        setIsOpen={setIsNavDrawerOpen}
        handleSignUp={handleSignUp}
        handleLogIn={handleLogIn}
      />
      <ElevationScroll {...props}>
        <AppBar position="sticky" className="bg-white text-gray-600 pt-2">
          <Toolbar>
            <IconButton
              onClick={() => setIsNavDrawerOpen(true)}
              edge="start"
              className="mr-2 outline-none"
              color="inherit"
              aria-label="menu">
              <MenuIcon />
            </IconButton>
            <div className="flex-grow">
              <button variant="h6" className={menuItemStyles}>
                Just You
              </button>
              <button variant="h6" className={menuItemStyles}>
                With Friends
              </button>
              <button variant="h6" className={menuItemStyles}>
                Large Groups
              </button>
            </div>
            {session ? (
              <Button
                color="inherit"
                className={authButtons}
                style={{
                  border: '1.5px solid rgba(107, 114, 128)',
                }}
                onClick={() => signOut()}>
                Signout
              </Button>
            ) : (
              <>
                <Button
                  color="inherit"
                  className={authButtons}
                  onClick={handleSignUp}
                  style={{
                    border: '1.5px solid rgba(107, 114, 128)',
                  }}>
                  Sign Up
                </Button>
                <Button
                  color="inherit"
                  className={authButtons}
                  onClick={handleLogIn}
                  style={{
                    border: '1.5px solid rgba(107, 114, 128)',
                  }}>
                  Log in
                </Button>
              </>
            )}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <AuthDialog
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        handleCredentialsSubmit={handleCredentialsSubmit}
        formContent={formContent}
        isSignUp={isSignUp}
        setIsSignUp={setIsSignUp}
        validSignUp={validSignUp}
        btnText={btnText}
        oAuthText={oAuthText}
        switchModeText={switchModeText}
        signIn={signIn}
        providers={providers}
      />
    </>
  );
};

Header.propTypes = {
  providers: PropTypes.object.isRequired,
  signIn: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  getSession: PropTypes.func.isRequired,
};

export default Header;
