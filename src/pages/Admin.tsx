import React from 'react';
import Main from 'components/Main';
import Layout from 'components/Layout';
import Header from 'components/Header';
import Button from 'components/Button';
import styled from 'styled-components';
import useMatching from 'hooks/useMatching';
import MatchingList from 'components/Matching/MatchingList';

const Admin = () => {
  const { isMatchingComplete } = useMatching();
  return (
    <Main.Wrapper>
      <Layout.PageContent>
        <Header title="Admin" />
        {!isMatchingComplete ? (
          <MatchingList />
        ) : (
          <ButtonWrapper>
            <Button
              text="매칭 시작하기"
              onClick={() => console.log('매칭 시작하기!!')}
            />
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
