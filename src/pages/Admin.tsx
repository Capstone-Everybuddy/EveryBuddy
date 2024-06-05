import React from 'react';
import Main from 'components/Main';
import Layout from 'components/Layout';
import Header from 'components/Header';
import Button from 'components/Button';
import styled from 'styled-components';
import MatchingList from 'components/Matching/MatchingList';
import useMatchingState from 'hooks/useMatchingState';

const Admin = () => {
  const { isMatchingComplete, matchingStart } = useMatchingState();
  return (
    <Main.Wrapper>
      <Layout.PageContent>
        <Header title="Admin" />
        {isMatchingComplete ? (
          <MatchingList />
        ) : (
          <ButtonWrapper>
            <Button text="매칭 시작하기" onClick={() => matchingStart()} />
          </ButtonWrapper>
        )}
      </Layout.PageContent>
    </Main.Wrapper>
  );
};

const ButtonWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Admin;
