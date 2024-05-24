import React, { useState } from 'react';
import { styled } from 'styled-components';
import { ReactComponent as Logo } from 'assets/logo.svg';
import LoginButton from 'components/LoginButton';
import { Link } from 'react-router-dom';

const Login = () => {
  const [selectedRole, setSelectedRole] = useState('');

  const handleRoleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectedRole(event.target.value);
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
              <Input type="text" id="user_id" placeholder="ID" />
            </InputDiv>
            <InputDiv>
              <Input type="password" id="user_pwd" placeholder="PASSWORD" />
            </InputDiv>
            <RadioButtonContainer>
              <RadioButtonLabel>
                <RadioButton
                  type="radio"
                  name="role"
                  value="seoulmate"
                  checked={selectedRole === 'seoulmate'}
                  onChange={handleRoleChange}
                />
                SeoulMate
              </RadioButtonLabel>
              <RadioButtonLabel>
                <RadioButton
                  type="radio"
                  name="role"
                  value="buddy"
                  checked={selectedRole === 'buddy'}
                  onChange={handleRoleChange}
                />
                Buddy
              </RadioButtonLabel>
            </RadioButtonContainer>
          </FormGrid>
          <Link to="/Matching">
            <LoginButton text={'Sign In'} />
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

export default Login;
