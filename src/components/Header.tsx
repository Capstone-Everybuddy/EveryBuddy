import React from 'react';
import styled from 'styled-components';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return <HeaderWrapper>{title}</HeaderWrapper>;
};

const HeaderWrapper = styled.div`
  color: black;
  text-align: center;
  font-size: 30px;
  font-weight: 600;
  padding: 20px;
  margin: 0px 20px;
  border-bottom: 1px solid ${(props) => props.theme.colors.gray};
`;

export default Header;
