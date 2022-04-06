import React, { useEffect } from 'react';
import { Box } from '@material-ui/core';
import { SenderBubble, OtherUserBubble } from '.';
import moment from 'moment';

const Messages = (props) => {
  const { messages, otherUser, userId } = props;
  
  useEffect(() => {
    props.messagesComming.current.scrollIntoView({ 
      block: 'end',
      inline: 'nearest'
    }); 
  }, [messages]);

  return (
    <Box className="messages-comming">
      <Box className="bubbles" ref={props.messagesComming}>
        {messages.map((message) => {
          const time = moment(message.createdAt).format('h:mm');
          return message.senderId === userId ? (
            <SenderBubble key={message.id} 
              text={message.text} time={time} 
              attachments={message.attachments} 
            />
          ) : (
            <OtherUserBubble
              key={message.id}
              text={message.text}
              time={time}
              otherUser={otherUser}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default Messages;
