import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
} from '@material-ui/core';
import './Login.scss';

const styles = {
  paperContainer: {
    backgroundImage: `url(${'bg-img.png'}), linear-gradient(180deg, #3A8DFF 0%, #86B9FF 100%)`,
    backgroundRepeat: 'no-repeat',
    backgroundBlendMode: 'overlay',
    backgroundSize: 'cover',
    opacity: 0.85,
    position: 'relative',
  }
};

const Login = ({ user, login }) => {
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
    <Box className="Login-Container" height="100vh" display="flex" flex="1" justifyContent="space-around">
      <Grid container justifyContent="center">
        <Grid className="left-column width-100pc" item md={5} style={styles.paperContainer} justifyContent="center">
          <div className="bubble-icon">
            <img src="bubble.svg" height={66} width={67} />
            <Typography>Converse with anyone with any language</Typography>
          </div>
        </Grid>
        <Grid className="right-column" item md={7} direction="column">
          <Box display="flex" flex="1" justifyContent="flex-end">
            <Typography>Don't have an account?</Typography>
            <Link className="link" href="/register" to="/register">
              <Button variant="contained">Register</Button>
            </Link>
          </Box>
          <Box display="flex" flex="1" justifyContent="center" style={{ height: `calc(100% - 1em - 24px` }}>
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
