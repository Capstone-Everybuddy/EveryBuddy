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
        {!isMatchingComplete ? (
          <ChatList />
        ) : (
          <CompleteMessage>
            매칭이 완료된 후 채팅방이 생성됩니다.
          </CompleteMessage>
        )}
      </Layout.PageContent>
    </Main.Wrapper>
  );
};

const CompleteMessage = styled.div`
  padding: 10px 0px;
`;

export default Chatting;
