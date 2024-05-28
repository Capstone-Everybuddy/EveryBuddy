import React from 'react';
import Header from 'components/Header';
import Layout from 'components/Layout';
import styled from 'styled-components';
import Main from 'components/Main';
import { useNavigate } from 'react-router-dom';

const Check = () => {
  const navigate = useNavigate();

  const handleNextClick = () => {
    // Next 버튼을 클릭했을 때 Register 페이지로 이동
    navigate('/register');
  };

  return (
    <Main.Wrapper>
      <Layout.PageContent>
        <Header title="Chat" />
        <h1>안녕하세요</h1>
        <NextButton onClick={handleNextClick}>NEXT</NextButton>
      </Layout.PageContent>
    </Main.Wrapper>
  );
};

const NextButton = styled.button`
  padding: 10px 20px;
  background-color: orange;
  color: white;
  border: none;
  font-size: 20px;
  font-weight: 700;
  border-radius: 40px;
  cursor: pointer;
  width: 100%;
`;

export default Check;
