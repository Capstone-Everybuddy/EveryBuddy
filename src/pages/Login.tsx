import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { ReactComponent as Logo } from 'assets/logo.svg';
import LoginButton from 'components/LoginButton';
import { useMutation } from '@tanstack/react-query';
import { PostLoginReq, BaseResponsePostLoginRes } from 'api/Api';
import { api } from 'api/Client';
import { useAuth } from 'components/AuthContext';

const Login: React.FC = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'seoulmate' | 'buddy'>('seoulmate');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserType(event.target.value as 'seoulmate' | 'buddy');
  };

  const loginMutation = useMutation<
    BaseResponsePostLoginRes,
    Error,
    { role: 'seoulmate' | 'buddy'; data: PostLoginReq }
  >({
    mutationFn: async ({ role, data }) => {
      if (role === 'seoulmate') {
        return api.seoulmates.loginSeoulmate(data);
      } else if (role === 'buddy') {
        return api.buddies.loginBuddy(data);
      } else {
        throw new Error('Please Check Your Type');
      }
    },
    onSettled: (data) => {
      if (data?.isSuccess && data.result) {
        const { result } = data;
        const idx =
          userType === 'seoulmate' ? result.seoulmateIdx : result.buddyIdx;
        const name = result.name;

        if (idx !== undefined && name !== undefined) {
          const user = {
            role: userType,
            idx: idx,
            name: name,
          };
          login(userType, user);
          console.log(user);
          navigate('/matching');
        } else {
          alert('Failed to login, try again');
        }
      } else {
        alert('Failed to login, try again');
      }
    },
  });

  const handleLogin = () => {
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
            <LoginButton text="Sign In" onClick={handleLogin}>
              Sign In
            </LoginButton>
            {loginMutation.isError && (
              <ErrorMessage>Error: {loginMutation.error?.message}</ErrorMessage>
            )}
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
  height: 60%;
  background-color: white;
  border-radius: 60px 60px 0px 0px;
  gap: 20px;
  padding: 0px 20px;
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

const ArrowWrapper = styled.div`
  padding: 30px 27px;
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
