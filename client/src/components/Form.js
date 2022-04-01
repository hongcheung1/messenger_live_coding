import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Button } from '@material-ui/core';

const useStyles = makeStyles({
    formStyle: {
        width: '70%',
        margin: 'auto'
    },
    containerStyle: {
      marginTop: '12px'
    },
    headerStyle: {
        fontSize: '26px',
        fontWeight: '600',
        lineHeight: '40px'
    },
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
});

const Form = ({children, buttonText, header, handleSubmit}) => {
    const classes = useStyles();

    return (
        <form className={classes.formStyle} onSubmit={handleSubmit}>
            <Typography className={classes.headerStyle}>{header}</Typography>
            <Grid className={classes.containerStyle}>
                {children}
                <Grid container>
                <Button className={classes.submitButton} type="submit" variant="contained" size="large">
                    {buttonText}
                </Button>
                </Grid>
            </Grid>
        </form>
    )
}

export default Form;