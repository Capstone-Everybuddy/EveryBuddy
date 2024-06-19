import React from 'react';
import styled from 'styled-components';
import ChatRoomItem from './ChatRoomItem';

const ChatList = () => {
  return (
    <Container>
      <ChatRoomItem />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 15px;
  padding: 40px 0 150px 0;
`;

export default ChatList;
