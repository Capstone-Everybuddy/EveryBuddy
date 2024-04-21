import React from 'react';
import Main from 'components/Main';
import Layout from 'components/Layout';
import Header from 'components/Header';
import Button from 'components/Button';
import styled from 'styled-components';

const Admin = () => {
  return (
    <Main.Wrapper>
      <Layout.PageContent>
        <Header title="Admin" />
        <Content>
          <Button
            text="매칭 시작하기"
            onClick={() => console.log('매칭 시작하기!!')}
          />
        </Content>
      </Layout.PageContent>
    </Main.Wrapper>
  );
};

const Content = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export default Admin;
