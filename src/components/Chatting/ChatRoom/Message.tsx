import { ChatMessage } from 'api/Api';
import React from 'react';
import styled from 'styled-components';

interface MessageProps {
  isUser: boolean;
  message: ChatMessage;
}

const Message: React.FC<MessageProps> = ({ isUser, message }) => {
  const formattedDate: string = new Date(message.createdAt!).toLocaleString();
  return (
    <MessageWrapper isUser={isUser}>
      <MessageContent isUser={isUser}>
        <Name isUser={isUser}>{message.sender}</Name>
        <MessageBubble isUser={isUser}>{message.message}</MessageBubble>
        <DateDiv isUser={isUser}>{formattedDate}</DateDiv>
      </MessageContent>
    </MessageWrapper>
  );
};

const MessageWrapper = styled.div<{ isUser: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.isUser ? 'flex-end' : 'flex-start')};
  margin-bottom: 10px;
`;

const MessageContent = styled.div<{ isUser: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.isUser ? 'flex-end' : 'flex-start')};
  max-width: 70%;
  word-break: break-word;
`;

const Name = styled.div<{ isUser: boolean }>`
  font-size: 12px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.darkgray};
  margin-bottom: 5px;
`;

const MessageBubble = styled.div<{ isUser: boolean }>`
  background-color: ${(props) =>
    props.isUser ? props.theme.colors.orange : props.theme.colors.lightgray};
  color: ${(props) => (props.isUser ? 'white' : 'black')};
  padding: 10px;
  border-radius: 15px;
  border-bottom-right-radius: ${(props) => (props.isUser ? '0' : '15px')};
  border-bottom-left-radius: ${(props) => (props.isUser ? '15px' : '0')};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const DateDiv = styled.div<{ isUser: boolean }>`
  font-size: 10px;
  color: gray;
  margin-top: 5px;
  text-align: ${(props) => (props.isUser ? 'right' : 'left')};
`;

export default Message;
