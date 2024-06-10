import ChatList from 'components/Chatting/ChatList/ChatList';
import Header from 'components/Header';
import Layout from 'components/Layout';
import Main from 'components/Main';
import useMatchingState from 'hooks/useMatchingState';
import styled from 'styled-components';

const Chatting = () => {
  const { isMatchingComplete } = useMatchingState();

  return (
    <Main.Wrapper>
      <Layout.PageContent>
        <Header title="Chat" />
        {isMatchingComplete ? (
          <ChatList />
        ) : (
          <CompleteMessage>
            Once matching is complete, <br />a chat room will be created.
          </CompleteMessage>
        )}
      </Layout.PageContent>
    </Main.Wrapper>
  );
};

const CompleteMessage = styled.div`
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin: 0 auto;
  margin-bottom: 60px;
  text-align: center;
`;

export default Chatting;
