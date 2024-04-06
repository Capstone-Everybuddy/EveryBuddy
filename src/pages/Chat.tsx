import ChatList from 'components/Chatting/ChatList/ChatList';
import ChatRoomItem from 'components/Chatting/ChatList/ChatRoomItem';
import Header from 'components/Header';
import Layout from 'components/Layout';

const Chatting = () => {
  return (
    <Layout.PageContent>
      <Header title="Chat" />
      <ChatList />
    </Layout.PageContent>
  );
};

export default Chatting;
