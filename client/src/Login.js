import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Grid,
  Button,
  FormControl,
  TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AuthWrapper from './components/AuthWrapper/AuthWrapper'

const useStyles = makeStyles({
  containerStyle: {
    marginTop: '12px'
  }
});

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
        <form onSubmit={handleLogin}>
          <label className="banner">Welcome back!</label>
          <Grid className={classes.containerStyle}>
            <FormControl margin="normal" required>
              <TextField
                aria-label="email"
                label="E-mail address"
                name="username"
                type="text"
              />
            </FormControl>
            <FormControl margin="normal" required>
              <TextField
                label="Password"
                aria-label="password"
                type="password"
                name="password"
              />
              <a className="forgot-password" href="#">Forgot?</a>
            </FormControl>
            <Grid className="mg-t-1" container>
              <Button className="btn-submit" type="submit" variant="contained" size="large">
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
    </AuthWrapper>
  );
};

export default Login;
