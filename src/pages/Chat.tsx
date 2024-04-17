import ChatList from 'components/Chatting/ChatList/ChatList';
import ChatRoomItem from 'components/Chatting/ChatList/ChatRoomItem';
import Header from 'components/Header';
import Layout from 'components/Layout';
import Main from 'components/Main';

const Chatting = () => {
  return (
    <Main.Wrapper>
      <Layout.PageContent>
        <Header title="Chat" />
        <ChatList />
      </Layout.PageContent>
    </Main.Wrapper>
  );
};

export default Chatting;
