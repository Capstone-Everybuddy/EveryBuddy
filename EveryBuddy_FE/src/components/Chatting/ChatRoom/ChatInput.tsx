import React from 'react';
import styled from 'styled-components';
import { ReactComponent as SendButton } from 'assets/send.svg';

interface ChatInputProps {
  message: string;
  onChangeMessage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sendMessage: () => void;
}

const ChatInput = ({
  message,
  onChangeMessage,
  sendMessage,
}: ChatInputProps) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage();
  };
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Message here..."
          value={message}
          onChange={onChangeMessage}
        />
        <Button type="submit">
          <SendButton />
        </Button>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  padding: 0px 25px 30px;
`;

const Form = styled.form`
  position: relative;
  display: inline-block;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  border-radius: 100px;
  border: 1px solid ${(props) => props.theme.colors.lightgray};
  background-color: #f6f6f6;
  outline: none;
  padding: 16px;
  padding-right: 50px;
  &::placeholder {
    color: ${(props) => props.theme.colors.gray}; /* 원하는 색상으로 변경 */
  }
`;

const Button = styled.button`
  position: absolute;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
`;
export default ChatInput;
