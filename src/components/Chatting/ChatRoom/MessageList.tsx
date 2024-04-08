import React from 'react';
import styled from 'styled-components';
import Message from './Message';

const MessageList = () => {
  return (
    <Container>
      <Message isUser={false} />
      <Message isUser={true} />
      <Message isUser={true} />
      <Message isUser={false} />
      <Message isUser={true} />
      <Message isUser={true} />
      <Message isUser={false} />
      <Message isUser={true} />
      <Message isUser={true} />
    </Container>
  );
};

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 25px;
  overflow-y: auto;
`;

export default MessageList;
