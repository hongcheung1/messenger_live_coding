import { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { 
    Typography,
    Grid,
    Container,
    Button
} from '@material-ui/core';

const banner = 'Converse with anyone with any language';
const useStyles = makeStyles({
    root: {
        height: '100vh',
        display: 'flex',
        flex: 1,
        justifyContent: 'space-around'
    },
    bannerContainer: {
      backgroundImage: `url(${'bg-img.png'}), linear-gradient(180deg, #3A8DFF 0%, #86B9FF 100%)`,
      backgroundRepeat: 'no-repeat',
      backgroundBlendMode: 'overlay',
      backgroundSize: 'cover',
      opacity: 0.85,
      display: 'flex',
      position: 'relative',
      justifyContent: 'center'
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
    },
    bannerText: {
        color: 'white',
        fontSize: '26px',
        fontWeight: 400,
        textAlign: 'center',
    },
    bubbleStyle: {
        position: 'absolute',
        transform: 'translate(calc(50% - 33px))',
        top: '30%',
        width: '66px',
        height: '67px'
    },
    headerStyle: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    titleStyle: {
        fontSize: '14px',
        color: '#B0B0B0',
    },
});

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
                <Grid md={9} className={classes.bannerStyle}>
                    <img className={classes.bubbleStyle} src="bubble.svg" />
                    <Typography className={classes.bannerText}>{banner}</Typography>
                </Grid>
            </Grid>
            <Grid className="right-column" item md={7}>
                <Container className={classes.headerStyle}>
                    <Typography className={classes.titleStyle}>{title}</Typography>
                    <Button onClick={() => history.push(targetPath)}
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