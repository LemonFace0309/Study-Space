import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getProviders, signIn, signOut, getSession } from 'next-auth/client';
import axios from 'axios';
import { Button, TextField } from '@material-ui/core';

import AuthDialog from '../../components/Auth/AuthDialog';

const Auth = ({ providers }) => {
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

  const AuthButton = () => {
    if (session) {
      return (
        <Button variant="outlined" color="primary" onClick={() => signOut()}>
          Signout
        </Button>
      );
    }
    return (
      <Button variant="outlined" color="primary" onClick={() => setModalOpen(true)}>
        {isSignUp ? 'Login' : 'Signup'}
      </Button>
    );
  };

  const validSignUp = validFirstName && validLastName && validEmail && validPassword;
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
    setValidPassword(!isSignUp || /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(value));
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
      const result = await axios.post('/api/create-new-user', {
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
      helperText={submitted && !validEmail && 'Please enter a valid email address 🥺'}
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
        label="First Name"
        fullWidth
        error={submitted && !validFirstName}
        helperText={submitted && !validFirstName && 'Please enter a valid first name 🥺'}
        className="mb-1"
        value={firstName}
        onChange={(e) => handleInputChange(e, setFirstName, validateFirstName)}
      />,
      <TextField
        label="Last Name"
        fullWidth
        error={submitted && !validLastName}
        helperText={submitted && !validLastName && 'Please enter a valid last name 🥺'}
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

  return (
    <div>
      {!loading && <AuthButton />}
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
    </div>
  );
};

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}

Auth.propTypes = {
  providers: PropTypes.object.isRequired,
};

export default Auth;
