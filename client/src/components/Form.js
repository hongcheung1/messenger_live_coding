import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

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
    }
});

const Form = ({children, header, handleSubmit}) => {
    const classes = useStyles();

    return (
        <form className={classes.formStyle} onSubmit={handleSubmit}>
            <Typography className={classes.headerStyle}>{header}</Typography>
            <Grid className={classes.containerStyle}>
                {children}
            </Grid>
        </form>
    )
}

export default Form;