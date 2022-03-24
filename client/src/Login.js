import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
} from '@material-ui/core';
import { useStyles } from './Signup';

const Login = ({ user, login }) => {
  const classes = useStyles();
  const history = useHistory();

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
    <Box height="100vh" display="flex" flex="1" justifyContent="space-around">
      <Grid container justifyContent="center">
        <Grid className={`${classes.root} ${classes.fullWidth} left-column`} item md={4} justifyContent="center">
          <div className="bubble-icon">
            <img src="bubble.svg" height={66} width={67} />
            <Typography>Converse with anyone with any language</Typography>
          </div>
        </Grid>
        <Grid className="right-column" item md={8} direction="column">
          <Box display="flex" flex="1" justifyContent="flex-end">
            <Typography>Don't have an account?</Typography>
            <Link className="link" href="/register" to="/register">
              <Button variant="contained">Create account</Button>
            </Link>
          </Box>
          <Box className={classes.fieldForm} display="flex" flex="1" justifyContent="center">
            <form onSubmit={handleLogin}>
              <label className="banner">Welcome back!</label>
              <Grid>
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
                <Grid container justifyContent="center">
                  <Button className="btn-submit" type="submit" variant="contained" size="large">
                    Login
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
