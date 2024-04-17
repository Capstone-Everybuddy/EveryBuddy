import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  type?: 'button' | 'submit';
  text: string;
  disabled?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, disabled, onClick }) => {
  return (
    <ButtonWrapper disabled={disabled} onClick={onClick}>
      {text}
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled.button`
  background-color: ${(props) =>
    props.disabled ? props.theme.colors.gray : props.theme.colors.orange};
  border: none;
  border-radius: 100px;
  padding: 16px;
  color: white;
  font-weight: 700;
  font-size: 20px;
  cursor: pointer;
  width: 100%;
`;

export default Button;
