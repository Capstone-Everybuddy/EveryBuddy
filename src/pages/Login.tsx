import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { ReactComponent as Logo } from 'assets/logo.svg';
import LoginButton from 'components/LoginButton';
import { useMutation } from '@tanstack/react-query';
import { PostLoginReq, BaseResponsePostLoginRes } from 'api/Api';
import { api } from 'api/Client';

const Login: React.FC = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<string>(''); // useUserType 훅을 대체
  const [errorMessage, setErrorMessage] = useState('');
  const [logMessage, setLogMessage] = useState(''); // 로그 메시지 상태 추가
  const navigate = useNavigate();

  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserType(event.target.value);
  };

  const loginMutation = useMutation<
    BaseResponsePostLoginRes,
    Error,
    { role: string; data: PostLoginReq }
  >({
    mutationFn: async ({ role, data }) => {
      const message = `Attempting login with role: ${role}`;
      setLogMessage((prev) => `${prev}\n${message}`); // 로그 메시지 업데이트

      if (role === 'seoulmate') {
        const apiMessage = 'Calling seoulmate login API';
        setLogMessage((prev) => `${prev}\n${apiMessage}`); // 로그 메시지 업데이트
        return api.seoulmates.loginSeoulmate(data);
      } else if (role === 'buddy') {
        const apiMessage = 'Calling buddy login API';
        setLogMessage((prev) => `${prev}\n${apiMessage}`); // 로그 메시지 업데이트
        return api.buddies.loginBuddy(data);
      } else {
        throw new Error('Invalid role');
      }
    },
    onSuccess: () => {
      navigate('/matching');
    },
    onError: (error: Error) => {
      setErrorMessage(error.message);
    },
  });

  const handleLogin = () => {
    setErrorMessage(''); // 새로운 로그인 시도 전에 에러 메시지 초기화
    setLogMessage(''); // 새로운 로그인 시도 전에 로그 메시지 초기화
    loginMutation.mutate({
      role: userType,
      data: { id: userId, password },
    });
  };

  return (
    <MainWrapper>
      <ContentWrapper>
        <Link to="/">
          <ArrowWrapper>
            <FaArrowLeft color="white" size="22px" />
          </ArrowWrapper>
        </Link>
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
                  checked={userType === 'seoulmate'}
                  onChange={handleRoleChange}
                />
                Seoulmate
              </RadioButtonLabel>
              <RadioButtonLabel>
                <RadioButton
                  type="radio"
                  value="buddy"
                  checked={userType === 'buddy'}
                  onChange={handleRoleChange}
                />
                Buddy
              </RadioButtonLabel>
            </RadioButtonContainer>
            <LoginButton text="Sign In" onClick={handleLogin} />
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            <LogMessage>{logMessage}</LogMessage> {/* 로그 메시지 표시 */}
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
  overflow-y: auto;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.yellow};
`;

const ContentWrapper = styled.div`
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ArrowWrapper = styled.div`
  padding: 30px 27px;
`;

const BackgroundCircle = styled.div`
  box-shadow: 0px -6px 10px 0px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: white;
  border-radius: 60px 60px 0px 0px;
  padding: 35px 30px 0px 30px;
  position: absolute;
  bottom: 0px;
  left: 0;
  right: 0;
`;

const FormGrid = styled.div`
  padding: 60px 0px 20px 0px;
`;

const InputDiv = styled.div`
  padding-bottom: 20px;
`;

const Input = styled.input`
  margin-top: 10px;
  padding-left: 20px;
  height: 60px;
  width: 100%;
  background-color: #f8f8f8;
  border-radius: 40px;
  border: none;
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const RadioButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
`;

const RadioButtonLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 16px;
`;

const RadioButton = styled.input`
  margin-right: 10px;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
`;

const LogMessage = styled.pre`
  background: #f1f1f1;
  padding: 10px;
  white-space: pre-wrap;
  word-wrap: break-word;
  margin-top: 10px;
`;

const TextWrapper = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const Text = styled.p`
  color: blue;
  cursor: pointer;
`;

const ButtonWrapper = styled.div`
  padding: 20px;
`;

export default Login;
