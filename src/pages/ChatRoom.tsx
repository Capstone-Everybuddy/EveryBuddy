import ChatInput from 'components/Chatting/ChatRoom/ChatInput';
import ChatRoomHeader from 'components/Chatting/ChatRoom/ChatRoomHeader';
import MessageList from 'components/Chatting/ChatRoom/MessageList';
import styled from 'styled-components';

const ChatRoom = () => {
  return (
    <Wrapper>
      <ChatRoomHeader />
      <Container>
        <MessageList />
        <ChatInput />
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: white;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* padding: 0px 25px; */
  overflow-y: auto;
  flex: 1;
`;

export default ChatRoom;
