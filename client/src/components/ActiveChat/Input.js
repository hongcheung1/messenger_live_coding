import React, { useRef, useState, useEffect } from 'react';
import { FormControl, FilledInput, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { SentimentDissatisfied, AttachFile } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
  root: {
    justifySelf: 'flex-end',
  },
  input: {
    minHeight: 70,
    backgroundColor: '#F4F6FA',
    borderRadius: 8,
  },
}));

const Input = ({ otherUser, conversationId, user, postMessage, messagesComming }) => {
  const classes = useStyles();
  const [text, setText] = useState('');
  const attachedFile = useRef();

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formElements = form.elements;
    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    const reqBody = {
      text: formElements.text.value,
      recipientId: otherUser.id,
      conversationId,
      sender: conversationId ? null : user,
    };
    await postMessage(reqBody);
    setText('');
    messagesComming.current.scrollIntoView({
      block: 'end',
      inline: 'nearest',
    });
  };

  const onOpenWindowFile = () => {
    attachedFile.current.click();
  };

  const handleAttachedFile = async (event) => {
    console.log(event.target.files)
    event.preventDefault();
    const form = event.currentTarget;
    const formElements = form.elements;
    const reqBody = {
      text: formElements ? formElements.text.value : '',
      recipientId: otherUser.id,
      conversationId,
      sender: conversationId ? null : user,
      attachments:['https://res.cloudinary.com/demo/image/upload/sheep.png',
        'https://res.cloudinary.com/demo/image/upload/b_lightblue/car_white.png']
    };
    await postMessage(reqBody);
    messagesComming.current.scrollIntoView({
      block: 'end',
      inline: 'nearest',
    });
  };

  return (
    <form className={`push-message ${classes.root}`} onSubmit={handleSubmit}>
      <FormControl fullWidth hiddenLabel>
        <FilledInput
          classes={{ root: classes.input }}
          disableUnderline
          placeholder="Type something..."
          value={text}
          name="text"
          onChange={handleChange}
        />
        <IconButton size="sm" className="btn-icon btn-icon-smile">
          <SentimentDissatisfied />
        </IconButton>
        <IconButton onClick={onOpenWindowFile} size="sm" className="btn-icon btn-icon-file">
          <AttachFile />
        </IconButton>
        <input ref={attachedFile} onChange={handleAttachedFile} type="file" hidden />
      </FormControl>
    </form>
  );
};

export default Input;
