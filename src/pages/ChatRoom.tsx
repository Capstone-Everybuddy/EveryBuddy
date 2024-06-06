import ChatInput from 'components/Chatting/ChatRoom/ChatInput';
import ChatRoomHeader from 'components/Chatting/ChatRoom/ChatRoomHeader';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { useAuth } from 'components/AuthContext';
import useChat from 'hooks/useChat';
import Message from 'components/Chatting/ChatRoom/Message';
import { ChatMessage } from 'api/Api';
import { api } from 'api/Client';

const ChatRoom = () => {
  const { user } = useAuth();
  const { roomId } = useChat(user!);
  const [ws, setWs] = useState<Client | null>(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [pastMessages, setPastMessages] = useState<ChatMessage[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMessagesAndConnect = async () => {
      if (roomId) {
        try {
          const response = await api.chat.getMessages(String(roomId));
          setPastMessages(response);
          connectWebSocket();
        } catch (error) {
          console.error('Failed to fetch messages:', error);
        }
      }
    };

    fetchMessagesAndConnect();
    return () => {
      if (ws) {
        ws.deactivate(); // WebSocket 연결을 해제
      }
    };
  }, [roomId]); // roomId가 변경될 때만 useEffect 실행

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, pastMessages]);

  const connectWebSocket = () => {
    if (ws) {
      ws.deactivate(); // 기존 연결이 있을 경우 해제
    }

    // const socket = new SockJS(`${process.env.REACT_APP_API_HOST}/ws/chat`);
    const socket = new SockJS(`/ws/chat`);
    const client = new Client({
      webSocketFactory: () => socket,
      debug: (str) => {
        console.log(new Date(), str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.onConnect = (frame) => {
      client.subscribe(`/topic/chat/room/${roomId}`, (message) => {
        const recv = JSON.parse(message.body);
        console.log(recv);
        setMessages((prevMessages) => [...prevMessages, recv]);
      });
    };

    client.onStompError = (frame) => {
      console.error(`Broker reported error: ${frame.headers['message']}`);
      console.error(`Additional details: ${frame.body}`);
    };

    client.onWebSocketClose = () => {
      console.log('WebSocket connection closed');
      setWs(null);
    };

    client.activate();
    setWs(client);
  };

  const sendMessage = () => {
    if (ws) {
      ws.publish({
        destination: '/app/chat/message',
        body: JSON.stringify({
          type: 'TALK',
          roomId: roomId,
          sender: user?.name,
          senderId: user?.idx,
          senderType: user?.role === 'seoulmate' ? 's' : 'b',
          message: message,
        }),
      });
      setMessage('');
    }
  };

  const recvMessage = (recv: ChatMessage) => {
    console.log(recv);
    setMessages((prevMessages) => [...prevMessages, recv]);
    console.log(messages);
  };

  const onChangeMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  return (
    <Wrapper>
      <ChatRoomHeader />
      <Container>
        <MessageContainer ref={scrollRef}>
          {pastMessages.map((message, idx) => (
            <Message
              key={idx}
              isUser={user?.idx === message.senderId}
              message={message}
            />
          ))}
          {messages.map((message, idx) => (
            <Message
              key={idx}
              isUser={user?.idx === message.senderId}
              message={message}
            />
          ))}
        </MessageContainer>
        <ChatInput
          message={message}
          onChangeMessage={onChangeMessage}
          sendMessage={sendMessage}
        />
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
  overflow-y: auto;
  flex: 1;
`;

const MessageContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 25px;
  overflow-y: auto;
`;

export default ChatRoom;
