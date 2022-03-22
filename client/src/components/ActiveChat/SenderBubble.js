import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, ImageListItem } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  date: {
    fontSize: 11,
    color: '#BECCE2',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
    color: '#91A3C0',
    letterSpacing: -0.2,
    padding: 8,
    fontWeight: 'bold',
  },
  bubble: {
    background: '#F4F6FA',
    borderRadius: '10px 10px 0 10px',
  },
}));

const SenderBubble = ({ time, text, attachments }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography className={classes.date}>{time}</Typography>
      {text ? <Box className={classes.bubble}>
        <Typography className={classes.text}>{text}</Typography>
      </Box> : null}
      {attachments ? <Box display="flex" flex="1" className="attachments-file">
        {attachments.map(item =>
          <img
            src={`${item}`}
            loading="lazy"
          />)}
      </Box> : null}
    </Box>
  );
};

export default SenderBubble;
