import { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { 
    Typography,
    Grid,
    Container,
    Button
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        display: 'flex',
        flex: 1,
        justifyContent: 'space-around',
        [theme.breakpoints.down('sm')]: {
            display: 'block',
        }
    },
    bannerContainer: {
      backgroundImage: `url(${'bg-img.png'})`,
      backgroundRepeat: 'no-repeat',
      opacity: 0.85,
      backgroundSize: 'cover',
      display: 'flex',
      position: 'relative',
      justifyContent: 'center',
      mixBlendMode: 'normal',
      [theme.breakpoints.down('sm')]: {
          maxHeight: '270px'
      }
    },
    maskStyle: {
        position: 'absolute',
        width: '100%',
        height: '100vh',
        zIndex: '-1',
        background: 'linear-gradient(180deg, #3A8DFF 0%, #86B9FF 100%)',
        opacity: 0.85,
    },
    mainContainer: {
        marginTop: '30px'
    },
    formContainer: {
      display: 'flex',
      flex: '1',
      justifyContent: 'center',
      height: 'calc(100% - 1em - 24px)',
      alignItems: 'center'
    },
    bannerStyle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            position: 'relative',
            width: '80%'
        }
    },
    bannerText: {
        color: 'white',
        fontSize: '26px',
        fontWeight: 400,
        textAlign: 'center',
        [theme.breakpoints.down('sm')]: {
            fontSize: '1.2em',
            marginTop: '110px'
        },
        [theme.breakpoints.up('sm')]: {
            marginTop: '40px',
        }
    },
    bubbleStyle: {
        position: 'absolute',
        transform: 'translate(calc(50% - 33px))',
        top: '30%',
        width: '66px',
        height: '67px',
        [theme.breakpoints.down('sm')]: {
            display: 'block',
            margin: '0 auto'
        }
    },
    headerStyle: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    titleStyle: {
        fontSize: '14px',
        color: '#B0B0B0',
    },
    buttonStyle: {
        width: '170px',
        height: '56px',
        margin: '0 30px',
        backgroundColor: '#fff',
        boxShadow: '0px 2px 12px rgba(74, 106, 149, 0.2)',
        borderRadius: '5px',
        fontWeight: 600,
        fontSize: '14px',
        lineHeight: '19px',
        color: '#3A8DFF'
    }
}));

const AuthWrapper = ({children}) => {
    const { pathname } = useLocation();
    const [title, setTitle] = useState('');
    const [targetPath, setTargetPath] = useState('');
    const [buttonText, setButtonText] = useState('');
    const classes = useStyles();
    const history = useHistory();

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
        <Grid container className={classes.root}>
            <Grid item md={5} className={classes.bannerContainer}>
                <div className={classes.maskStyle}/>
                <Grid item md={9} className={classes.bannerStyle}>
                    <img className={classes.bubbleStyle} src="bubble.svg" alt='Banner Image' />
                    <Typography className={classes.bannerText}>{'Converse with anyone with any language'}</Typography>
                </Grid>
            </Grid>
            <Grid item md={7} className={classes.mainContainer}>
                <Container className={classes.headerStyle}>
                    <Typography className={classes.titleStyle}>{title}</Typography>
                    <Button onClick={() => history.push(targetPath)} className={classes.buttonStyle}
                    >{buttonText}</Button>
                </Container>
                <Container className={classes.formContainer}>
                    {children}
                </Container>
            </Grid>
        </Grid>
  );
}

export default AuthWrapper;