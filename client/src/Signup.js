import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
  GridListTileBar,
} from '@material-ui/core';
import './Signup.scss';

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

const Signup = ({ user, register }) => {
  const history = useHistory();

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

  useEffect(() => {
    if (user && user.id) history.push('/home');
  }, [user, history]);

  return (
    <Box className="Signup-Container" height="100vh" display="flex" flex="1" justifyContent="space-around">
      <Grid container justifyContent="center">
        <Grid className="left-column width-100pc" item md={5} style={styles.paperContainer} justifyContent="center">
          <div className="bubble-icon">
            <img src="bubble.svg" height={66} width={67} />
            <Typography>Converse with anyone with any language</Typography>
          </div>
        </Grid>
        <Grid className="right-column" item md={7} direction="column">
          <Box display="flex" flex="1" justifyContent="flex-end">
            <Typography>Already have an account?</Typography>
            <Link className="link" href="/login" to="/login">
              <Button variant="contained">Login</Button>
            </Link>
          </Box>
          <Box display="flex" flex="1" justifyContent="center" style={{ height: `calc(100% - 1em - 24px` }}>
            <form onSubmit={handleRegister}>
              <label className="banner">Create an account.</label>
              <Grid item md={12}>
                <Grid>
                  <FormControl>
                    <TextField
                      aria-label="username"
                      label="Username"
                      name="username"
                      type="text"
                      required
                    />
                  </FormControl>
                </Grid>
                <Grid>
                  <FormControl>
                    <TextField
                      label="E-mail address"
                      aria-label="e-mail address"
                      type="email"
                      name="email"
                      required
                    />
                  </FormControl>
                </Grid>
                <Grid>
                  <FormControl error={!!formErrorMessage.confirmPassword}>
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
                </Grid>
                <Grid>
                  <FormControl error={!!formErrorMessage.confirmPassword}>
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
                </Grid>
                <Grid className="mg-t-1" container justifyContent="center">
                  <Button className="btn-submit" type="submit" variant="contained" size="large">
                    Create
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid >
    </Box>
  );
};

export default Signup;
