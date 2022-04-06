import React, { useState } from 'react';
import {
  FormControl,
  TextField,
  FormHelperText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AuthWrapper from './components/AuthWrapper/AuthWrapper'
import Form from './components/Form'

const useStyles = makeStyles(() => ({
  submitButton: {
    width: '160px',
    height: '56px',
    backgroundColor: '#3a8dff',
    color: '#fff',
    margin: 'auto',
    fontSize: '16px',
    fontWeight: 700,
    borderRadius: '3px'
  },
  forgotPwdStyle: {
    position: 'absolute',
    right: '12px',
    top: '35%',
    fontSize: '12px',
    textDecoration: 'none',
    color: '#3a8dff'
  },
  formStyle: {
    width: '100%',
    marginBottom: '1em'
  },
  textField: {
    color: '#b0b0b0',
  }
}))

const Signup = ({ user, register }) => {
  const classes = useStyles();

  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formElements = form.elements;
    const username = formElements.username.value;
    const email = formElements.email.value;
    const password = formElements.password.value;
    const confirmPassword = formElements.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: 'Passwords must match' });
      return;
    }
    await register({ username, email, password });
  };

  return (
    <AuthWrapper title='Already have an account?' buttonText='Login' targetPath='login'>
      <Form handleSubmit={handleRegister} header={'Create an account.'} buttonText={'Create'}>
        <FormControl className={classes.formStyle}>
          <TextField
            aria-label="username"
            label="Username"
            name="username"
            type="text"
            required
          />
        </FormControl>
        <FormControl className={classes.formStyle}>
          <TextField
            label="E-mail address"
            aria-label="e-mail address"
            type="email"
            name="email"
            required
          />
        </FormControl>
        <FormControl  className={classes.formStyle} error={!!formErrorMessage.confirmPassword}>
          <TextField
            aria-label="password"
            label="Password"
            type="password"
            inputProps={{ minLength: 6 }}
            name="password"
            required
          />
          <FormHelperText>
            {formErrorMessage.confirmPassword}
          </FormHelperText>
        </FormControl>
        <FormControl className={classes.formStyle} error={!!formErrorMessage.confirmPassword}>
          <TextField
            label="Confirm Password"
            aria-label="confirm password"
            type="password"
            inputProps={{ minLength: 6 }}
            name="confirmPassword"
            required
          />
          <FormHelperText>
            {formErrorMessage.confirmPassword}
          </FormHelperText>
        </FormControl>
      </Form>
    </AuthWrapper>
  );
};

export default Signup;
