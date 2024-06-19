import React from 'react';
import styled from 'styled-components';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <Container>
      <HeaderWrapper>{title}</HeaderWrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  /* padding: 0 20px; */
`;

const HeaderWrapper = styled.div`
  color: black;
  text-align: center;
  font-size: 30px;
  font-weight: 600;
  padding: 20px;
  border-bottom: 1px solid ${(props) => props.theme.colors.gray};
`;

export default Header;
