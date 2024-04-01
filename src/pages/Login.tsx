import React from 'react';
import { styled } from 'styled-components';
import { ReactComponent as Logo } from 'assets/logo.svg';
import LoginButton from 'components/LoginButton';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <MainWrapper>
      <ContentWrapper>
        <BackgroundCircle>
          <Logo width={240} />
        </BackgroundCircle>
        <ButtonWrapper>
          <FormGrid>
            <h1>로그인</h1>
            <InputDiv>
              <Input type="text" id="user_id" placeholder="아이디" />
            </InputDiv>
            <InputDiv>
              <Input type="password" id="user_pwd" placeholder="비밀번호" />
            </InputDiv>
          </FormGrid>
          <Link to="/Matching">
            <LoginButton text={'로그인'} />
          </Link>
          <TextWrapper>
            <Text>Forgot your Id? Click Here</Text>
            <Text>Forgot your password? Click Here</Text>
          </TextWrapper>
        </ButtonWrapper>
      </ContentWrapper>
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  height: 100vh;
  background-color: ${(props) => props.theme.colors.yellow};
`;

const BackgroundCircle = styled.div`
  height: 65%;
  padding: 60px 35px;
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
  height: 650px;
  background-color: white;
  border-radius: 60px 60px 0px 0px;
  gap: 20px;
  padding: 0px 20px;
  position: absolute;
  bottom: 0px;
  left: 0;
  right: 0;
`;

const FormGrid = styled.form`
  padding: 60px 10px 20px 10px;
`;

const InputDiv = styled.div`
  padding-bottom: 20px;
`;

const Input = styled.input`
  padding-left: 20px;
  height: 60px;
  width: 100%;
  background-color: #f8f8f8;
  border-radius: 40px;
  border: none;
  &::placeholder {
    color: #b5b5b5;
  }
`;

const TextWrapper = styled.div`
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Text = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
`;

export default Login;
