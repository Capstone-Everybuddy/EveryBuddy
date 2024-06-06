import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const ChatRoomItem = () => {
  const navigate = useNavigate();
  return (
    <Container onClick={() => navigate('/chat/room')}>
      <div>
        <GroupName>SeoulMate & Buddy</GroupName>
        <GroupMembers>Click to Start Chatting!</GroupMembers>
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  border-radius: 12px;
  border: 1px solid ${(props) => props.theme.colors.orange};
  padding: 22px 26px;
  background-color: white;
  box-shadow: 0px 4px 10px rgba(161, 161, 161, 0.1);
  cursor: pointer;
  &:active {
    transition: all 0.2s ease-in-out;
    scale: 0.99;
  }
`;

const GroupName = styled.div`
  font-size: 16px;
  font-weight: 500;
`;

const GroupMembers = styled.div`
  font-size: 14px;
  margin-top: 10px;
`;

const RecentMessage = styled.div`
  color: ${(props) => props.theme.colors.darkgray};
  font-size: 14px;
`;
export default ChatRoomItem;
