import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    Container,
    Grid,
    Typography,
    Button,
  } from '@material-ui/core';
import './AuthWrapper.scss';

export const styles = {
    paperContainer: {
      backgroundImage: `url(${'bg-img.png'}), linear-gradient(180deg, #3A8DFF 0%, #86B9FF 100%)`,
      backgroundRepeat: 'no-repeat',
      backgroundBlendMode: 'overlay',
      backgroundSize: 'cover',
      opacity: 0.85,
      position: 'relative',
      justifyContent: 'center'
    },
    formContainer: {
      display: 'flex',
      flex: '1',
      justifyContent: 'center',
      height: 'calc(100% - 1em - 24px)'
    }
  };
  
const AuthWrapper = ({children}) => {
    const { pathname } = useLocation();
    const [title, setTitle] = useState('');
    const [targetPath, setTargetPath] = useState('');
    const [buttonText, setButtonText] = useState('');

    useEffect(() => {
        if(pathname === '/register') {
            setTitle('Already have an account?');
            setButtonText('Login');
            setTargetPath('/login');
        } else if(pathname === '/login') {
            setTitle('Don\'t have an account?');
            setButtonText('Create account');
            setTargetPath('/register')
        } else return;
    }, [pathname]);

    return (
        <Grid container className="auth-container">
            <Grid className="left-column width-100pc" item md={5} style={styles.paperContainer}>
            <div className="bubble-icon">
                <img src="bubble.svg" />
                <Typography>Converse with anyone with any language</Typography>
            </div>
            </Grid>
            <Grid className="right-column" item md={7}>
                <Container className="header-action">
                    <Typography>{title}</Typography>
                    <Link className="link" to={targetPath}>
                    <Button variant="contained">{buttonText}</Button>
                    </Link>
                </Container>
                <Container style={styles.formContainer}>
                    {children}
                </Container>
            </Grid>
        </Grid>
  );
}

export default AuthWrapper;