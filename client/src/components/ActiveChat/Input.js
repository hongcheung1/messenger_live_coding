import React, { useRef, useState, useEffect } from 'react';
import axios from "axios";
import { FormControl, FilledInput, IconButton, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { SentimentDissatisfied, AttachFile, HighlightOff } from '@material-ui/icons';
import { CLOUDINARY_URL, CLOUDINARY_API_KEY, UPLOAD_PRESET, CLOUND_NAME } from '../Constants';

const useStyles = makeStyles(() => ({
  root: {
    justifySelf: 'flex-end',
    backgroundColor: '#F4F6FA',
  },
  input: {
    minHeight: 70,
    borderRadius: 8,
  },
}));

const Input = ({ otherUser, conversationId, user, postMessage, messagesComming }) => {
  const classes = useStyles();
  const [text, setText] = useState('');
  const [attachments, setAttachments] = useState([]);
  const attachedFile = useRef();

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const uploadImages = async (attachments = []) => {
    const formData = new FormData();
    const cloudinaryResponse = [];
    for (let i = 0; i < attachments.length; i++) {
      formData.append('file', attachments[i].file);
      formData.append("api_key", CLOUDINARY_API_KEY);
      formData.append("upload_preset", UPLOAD_PRESET);
      formData.append("cloud_name", CLOUND_NAME);
      const response = await fetch(CLOUDINARY_URL, {
        method: 'POST',
        body: formData,
      }).then(res => res.json());
      cloudinaryResponse.push(response.url);
    }
    return cloudinaryResponse;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formElements = form.elements;
    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    setAttachments([]);
    const cloudinaryAttachments = await uploadImages(attachments);
    const reqBody = {
      text: formElements.text.value,
      recipientId: otherUser.id,
      conversationId,
      sender: conversationId ? null : user,
      attachments: [...cloudinaryAttachments],
    };
    setText('');
    await postMessage(reqBody);
    messagesComming.current.scrollIntoView({
      block: 'end',
      inline: 'nearest',
    });
  };

  const onOpenWindowFile = () => {
    attachedFile.current.click();
  };

  const removeAttachedFile = (index) => {
    const attachmentsCopy = [...attachments];
    attachmentsCopy.splice(index, 1);
    setAttachments(attachmentsCopy);
  };

  const addAttachedFiles = async (event) => {
    event.preventDefault();
    const files = event.target.files;
    const attachments = [];
    Object.entries(files).forEach(([key, file]) => {
      attachments.push({
        file,
        previewUrl: URL.createObjectURL(file),
      });
    });
    setAttachments(attachments);
  };

  return (
    <form className={`push-message ${classes.root}`} onSubmit={handleSubmit}>
      <FormControl fullWidth hiddenLabel>
        <Box className="add-attached-files">
          {attachments.map((img, i) => (
            <div className="item-files">
              <HighlightOff onClick={() => removeAttachedFile(i)} />
              <img src={img.previewUrl} loading="lazy" />
            </div>))}
        </Box>
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
        <input ref={attachedFile} onChange={addAttachedFiles} multiple type="file" hidden />
      </FormControl>
    </form>
  );
};

export default Input;
