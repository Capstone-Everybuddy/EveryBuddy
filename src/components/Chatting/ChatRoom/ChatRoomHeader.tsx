import React from 'react';
import { ReactComponent as ArrowLeft } from 'assets/arrow-left.svg';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const ChatRoomHeader = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <ArrowLeftIcon onClick={() => navigate(-1)} />
      <div>
        <GroupName>SeoulMate Group</GroupName>
        <GroupMembers>John, Subin, Youngjin, Heesun, Suyeon</GroupMembers>
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  padding: 26px;
  align-items: center;
  gap: 16px;
  border-bottom: 1px solid ${(props) => props.theme.colors.lightgray};
`;

const ArrowLeftIcon = styled(ArrowLeft)`
  path {
    stroke: ${(props) =>
      props.theme.colors.orange}; /* fill 속성을 이용하여 색상 변경 */
  }
  cursor: pointer;
`;

const GroupName = styled.div`
  font-size: 18px;
  font-weight: 500;
`;

const GroupMembers = styled.div`
  font-size: 12px;
`;
export default ChatRoomHeader;
