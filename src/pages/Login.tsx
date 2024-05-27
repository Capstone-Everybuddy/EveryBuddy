import React, { useState } from 'react';
import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from 'assets/logo.svg';
import LoginButton from 'components/LoginButton';
import { useMutation } from '@tanstack/react-query';
import { PostLoginReq, BaseResponsePostLoginRes } from 'api/Api';
import { api } from 'api/Client'; // API 클라이언트 import

const Login = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('');

  const handleRoleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectedRole(event.target.value);
  };

  const loginMutation = useMutation<
    BaseResponsePostLoginRes,
    Error,
    { role: string; data: PostLoginReq }
  >({
    mutationFn: async ({
      role,
      data,
    }: {
      role: string;
      data: PostLoginReq;
    }) => {
      if (role === 'seoulmate') {
        return api.seoulmates.loginSeoulmate(data);
      } else if (role === 'buddy') {
        return api.buddies.loginBuddy(data);
      } else {
        throw new Error('Invalid role');
      }
    },
  });

  const handleLogin = () => {
    loginMutation.mutate({
      role: selectedRole,
      data: { id: userId, password },
    });
  };

  return (
    <MainWrapper>
      <ContentWrapper>
        <BackgroundCircle>
          <Logo width={240} />
        </BackgroundCircle>
        <ButtonWrapper>
          <FormGrid>
            <h1>Sign In</h1>
            <InputDiv>
              <Input
                type="text"
                id="user_id"
                placeholder="ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
            </InputDiv>
            <InputDiv>
              <Input
                type="password"
                id="user_pwd"
                placeholder="PASSWORD"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputDiv>
            <RadioButtonContainer>
              <RadioButtonLabel>
                <RadioButton
                  type="radio"
                  value="seoulmate"
                  checked={selectedRole === 'seoulmate'}
                  onChange={handleRoleChange}
                />
                Seoulmate
              </RadioButtonLabel>
              <RadioButtonLabel>
                <RadioButton
                  type="radio"
                  value="buddy"
                  checked={selectedRole === 'buddy'}
                  onChange={handleRoleChange}
                />
                Buddy
              </RadioButtonLabel>
            </RadioButtonContainer>
            <LoginButton text="Sign In" onClick={handleLogin}>
              Sign In
            </LoginButton>
            {loginMutation.isError && (
              <ErrorMessage>Error: {loginMutation.error?.message}</ErrorMessage>
            )}
            {loginMutation.isSuccess && <div>Login successful!</div>}
          </FormGrid>
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
  height: 600px;
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
  padding: 60px 10px 0px 10px;
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

const RadioButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const RadioButtonLabel = styled.label`
  display: flex;
  align-items: center;
  margin: 10px;
  font-size: 16px;
`;

const RadioButton = styled.input`
  margin-right: 10px;
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

const ErrorMessage = styled.div`
  text-align: center;
  color: red;
  font-weight: bold;
  margin-top: 10px;
`;

export default Login;
