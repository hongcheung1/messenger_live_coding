import React, { useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import {
  Grid,
  Button,
  FormControl,
  TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AuthWrapper from './components/AuthWrapper/AuthWrapper'
import Form from './components/Form'

const useStyles = makeStyles(() => ({
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

const Login = ({ user, login }) => {
  const history = useHistory();
  const classes = useStyles();

  const handleLogin = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formElements = form.elements;
    const username = formElements.username.value;
    const password = formElements.password.value;

    await login({ username, password });
  };

  useEffect(() => {
    if (user && user.id) history.push('/home');
  }, [user, history]);

  return (
    <AuthWrapper>
      <Form handleSubmit={handleLogin} header={'Welcome back!'} buttonText={'Login'}>
        <FormControl className={classes.formStyle} margin="normal" required>
          <TextField
            className={classes.textField}
            aria-label="email"
            label="E-mail address"
            name="username"
            type="text"
          />
        </FormControl>
        <FormControl className={classes.formStyle} margin="normal" required>
          <TextField
            label="Password"
            aria-label="password"
            type="password"
            name="password"
          />
          <Link to='#' className={classes.forgotPwdStyle}>Forgot?</Link>
        </FormControl>
      </Form>
    </AuthWrapper>
  );
};

export default Login;
