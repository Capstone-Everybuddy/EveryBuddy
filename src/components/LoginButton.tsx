import React from 'react';
import styled from 'styled-components';

interface LoginButtonProps {
  text: '로그인' | '회원가입';
}

const LoginButton: React.FC<LoginButtonProps> = ({ text }) => {
  return <ButtonWrapper text={text}>{text}</ButtonWrapper>;
};

const ButtonWrapper = styled.button<{ text: string }>`
  width: 100%;
  background-color: ${(props) =>
    props.text === '로그인'
      ? props.theme.colors.orange
      : props.theme.colors.background_orange};
  border-radius: 40px;
  font-size: 24px;
  font-weight: 700;
  color: ${(props) =>
    props.text === '로그인' ? 'white' : props.theme.colors.orange};
  padding: 20px 20px;
  border: ${(props) =>
    props.text === '로그인'
      ? 'none'
      : `1px solid ${props.theme.colors.orange}`};
  cursor: pointer;
`;

export default LoginButton;
