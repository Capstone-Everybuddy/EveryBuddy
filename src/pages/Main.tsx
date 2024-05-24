import React from 'react';
import { styled } from 'styled-components';
import { ReactComponent as Logo } from 'assets/logo.svg';
import LoginButton from 'components/LoginButton';
import { Link } from 'react-router-dom';

const Main = () => {
  return (
    <MainWrapper>
      <ContentWrapper>
        <BackgroundCircle>
          <Logo width={240} />
        </BackgroundCircle>
        <ButtonWrapper>
          <Link to="/login">
            <LoginButton text={'Sign In'} />
          </Link>
          <Link to="/signup">
            <LoginButton text={'Sign Up'} />
          </Link>
        </ButtonWrapper>
      </ContentWrapper>
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  height: 100vh;
  background-color: white;
`;

const BackgroundCircle = styled.div`
  height: 65%;
  padding: 60px 35px;
  border-radius: 0 0 100% 100%/0 0 100px 100px;
  background-color: ${(props) => props.theme.colors.yellow};
`;

const ContentWrapper = styled.div`
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0px 20px;
  position: absolute;
  bottom: 60px;
  left: 0;
  right: 0;
`;

export default Main;
