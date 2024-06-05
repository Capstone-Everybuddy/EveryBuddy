import ChatList from 'components/Chatting/ChatList/ChatList';

import Header from 'components/Header';
import Layout from 'components/Layout';
import Main from 'components/Main';
import useMatching from 'hooks/useMatching';
import styled from 'styled-components';

const Chatting = () => {
  const { isMatchingComplete } = useMatching();
  return (
    <Main.Wrapper>
      <Layout.PageContent>
        <Header title="Chat" />
        {isMatchingComplete ? (
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
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin: 0 auto;
  margin-bottom: 60px;
`;

export default Chatting;
