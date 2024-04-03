import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  text: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return <ButtonWrapper onClick={onClick}>{text}</ButtonWrapper>;
};

const ButtonWrapper = styled.button`
  background-color: ${(props) => props.theme.colors.orange};
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
