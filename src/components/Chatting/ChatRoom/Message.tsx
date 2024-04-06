import React from 'react';
import styled from 'styled-components';

interface MessageProps {
  isUser: boolean;
}
const Message: React.FC<MessageProps> = ({ isUser }) => {
  return (
    <Container isUser={isUser}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor
      sit amet, consectetur adipiscing elit.
    </Container>
  );
};

const Container = styled.div<{ isUser: boolean }>`
  width: fit-content;
  max-width: 80%;
  padding: 15px;
  color: ${(props) => props.isUser && 'white'};
  background-color: ${(props) =>
    props.isUser ? props.theme.colors.orange : props.theme.colors.lightgray};
  border-radius: 5px;
  word-break: break-all;
  align-self: ${(props) => (props.isUser ? 'flex-end' : 'flex-start')};
`;

export default Message;
