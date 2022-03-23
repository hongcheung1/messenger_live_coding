import React, { useEffect, useRef } from 'react';
import { Box } from '@material-ui/core';
import { SenderBubble, OtherUserBubble } from '.';
import moment from 'moment';

const Messages = (props) => {
  const { messages, otherUser, userId } = props;
  const sortedMessages = messages.sort((a, b) => b.createdAt > a.createdAt ? -1 : b.createdAt < a.createdAt ? 1 : 0);
  useEffect(() => {
    props.messagesComming.current.scrollIntoView({ 
      block: 'end',
      inline: 'nearest'
    }); 
  }, [messages]);

  return (
    <Box className="messages-comming">
      <Box className="bubbles" ref={props.messagesComming}>
        {sortedMessages.map((message) => {
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
