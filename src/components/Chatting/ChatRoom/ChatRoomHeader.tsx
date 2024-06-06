import React from 'react';
import { ReactComponent as ArrowLeft } from 'assets/arrow-left.svg';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import useMatching from 'hooks/useMatching';

const ChatRoomHeader = () => {
  const navigate = useNavigate();
  const { matchingArray } = useMatching();
  return (
    <Container>
      <ArrowLeftIcon onClick={() => navigate(-1)} />
      <div>
        <GroupName>Chatting</GroupName>
        <GroupMembers>{/* {matchingArray} */}</GroupMembers>
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
