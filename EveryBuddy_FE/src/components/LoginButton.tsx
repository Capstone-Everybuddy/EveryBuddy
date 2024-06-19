import React from 'react';
import styled from 'styled-components';

interface LoginButtonProps {
  text: 'Sign In' | 'Sign Up';
  onClick?: () => void; // onClick 핸들러를 선택적으로 만듦
  children?: React.ReactNode; // children 속성 추가
}

const LoginButton: React.FC<LoginButtonProps> = ({
  text,
  onClick,
  children,
}) => {
  return (
    <ButtonWrapper text={text} onClick={onClick}>
      {children || text}{' '}
      {/* children이 있으면 children을, 없으면 text를 렌더링 */}
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled.button<{ text: string }>`
  width: 100%;
  background-color: ${(props) =>
    props.text === 'Sign In'
      ? props.theme.colors.orange
      : props.theme.colors.background_orange};
  border-radius: 40px;
  font-size: 24px;
  font-weight: 700;
  color: ${(props) =>
    props.text === 'Sign In' ? 'white' : props.theme.colors.orange};
  padding: 20px 20px;
  border: ${(props) =>
    props.text === 'Sign In'
      ? 'none'
      : `1px solid ${props.theme.colors.orange}`};
  cursor: pointer;
`;

export default LoginButton;
