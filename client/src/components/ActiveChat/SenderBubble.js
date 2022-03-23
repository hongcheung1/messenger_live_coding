import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, ImageList, ImageListItem } from '@material-ui/core';

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
    maxWidth: '500px',
    background: '#F4F6FA',
    borderRadius: '10px 10px 0 10px',
  },
}));

const SenderBubble = ({ time, text, attachments }) => {
  const classes = useStyles();

  const openViewImage = () => {

  };

  return (
    <Box className={classes.root}>
      <Typography className={classes.date}>{time}</Typography>
      {attachments ? <Box className={`attachments-files ${classes.bubble}`}>
        {attachments.map(item =>
          <div key={item} className="item-files" onClick={openViewImage} role="presentation">
            <img src={`${item}`} loading="lazy" />
          </div>
        )}
      </Box> : null}
      {text ? <Box className={classes.bubble}>
        <Typography className={classes.text}>{text}</Typography>
      </Box> : null}
    </Box>
  );
};

export default SenderBubble;
