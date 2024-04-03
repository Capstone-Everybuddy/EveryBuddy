import React, { useState, ChangeEvent, FormEvent } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

interface FormData {
  user_name: string;
  user_id: string;
  user_pwd: string;
  user_pwdCheck: string;
  user_studentNum: string;
}

interface FormErrors {
  user_name: boolean;
  user_id: boolean;
  user_pwd: boolean;
  user_pwdCheck: boolean;
  user_studentNum: boolean;
}

const Register = () => {
  const [formData, setFormData] = useState<FormData>({
    user_name: '',
    user_id: '',
    user_pwd: '',
    user_pwdCheck: '',
    user_studentNum: '',
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({
    user_name: false,
    user_id: false,
    user_pwd: false,
    user_pwdCheck: false,
    user_studentNum: false,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: false });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let hasErrors = false;
    const updatedErrors: FormErrors = {
      user_name: false,
      user_id: false,
      user_pwd: false,
      user_pwdCheck: false,
      user_studentNum: false,
    };

    // 모든 입력 필드에 대해 빈 값을 체크하여 에러 여부를 업데이트합니다.
    for (const key in formData) {
      if (formData[key as keyof FormData] === '') {
        updatedErrors[key as keyof FormErrors] = true;
        hasErrors = true;
      }
    }

    // 비밀번호 확인 값이 비밀번호 값과 일치하는지 확인
    if (formData.user_pwd !== formData.user_pwdCheck) {
      updatedErrors.user_pwdCheck = true;
      hasErrors = true;
    }

    // 모든 입력 값이 유효한지 확인 후 formErrors 객체 업데이트
    setFormErrors(updatedErrors);

    if (!hasErrors) {
      // 모든 필드가 작성되었으므로 다음 페이지로 이동할 수 있음
      alert('회원가입이 완료되었습니다.');
    }
  };

  const isFormValid = Object.values(formData).every((value) => value !== '');

  return (
    <MainWrapper>
      <Link to="/signup">
        <ArrowWrapper>
          <FaArrowLeft color="white" size="22px" />
        </ArrowWrapper>
      </Link>
      <ContentWrapper>
        <BackgroundCircle>
          <h1>회원가입</h1>
          <p>정보를 입력해주세요.</p>
          <Form onSubmit={handleSubmit}>
            <FormGrid>
              <InputDiv>
                <Label htmlFor="user_name">이름</Label>
                <Input
                  type="text"
                  id="user_name"
                  name="user_name"
                  value={formData.user_name}
                  onChange={handleInputChange}
                />
                {formData.user_name === '' && (
                  <ErrorMessage>이름은 필수 입력 항목입니다.</ErrorMessage>
                )}
              </InputDiv>
              <InputDiv>
                <Label htmlFor="user_id">아이디</Label>
                <Input
                  type="text"
                  id="user_id"
                  name="user_id"
                  value={formData.user_id}
                  onChange={handleInputChange}
                />
                {formData.user_id === '' && (
                  <ErrorMessage>아이디는 필수 입력 항목입니다.</ErrorMessage>
                )}
              </InputDiv>
              <InputDiv>
                <Label htmlFor="user_pwd">비밀번호</Label>
                <Input
                  type="password"
                  id="user_pwd"
                  name="user_pwd"
                  value={formData.user_pwd}
                  onChange={handleInputChange}
                />
                {formData.user_pwd === '' && (
                  <ErrorMessage>비밀번호는 필수 입력 항목입니다.</ErrorMessage>
                )}
              </InputDiv>
              <InputDiv>
                <Label htmlFor="user_pwdCheck">비밀번호 확인</Label>
                <Input
                  type="password"
                  id="user_pwdCheck"
                  name="user_pwdCheck"
                  value={formData.user_pwdCheck}
                  onChange={handleInputChange}
                />
                {formData.user_pwdCheck === '' && (
                  <ErrorMessage>
                    비밀번호 확인은 필수 입력 항목입니다.
                  </ErrorMessage>
                )}
                {formData.user_pwdCheck !== '' &&
                  formData.user_pwd !== formData.user_pwdCheck && (
                    <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>
                  )}
              </InputDiv>
              <InputDiv>
                <Label htmlFor="user_studentNum">학번</Label>
                <Input
                  type="number"
                  id="user_studentNum"
                  name="user_studentNum"
                  value={formData.user_studentNum}
                  onChange={handleInputChange}
                />
                {formData.user_studentNum === '' && (
                  <ErrorMessage>학번은 필수 입력 항목입니다.</ErrorMessage>
                )}
              </InputDiv>
            </FormGrid>
            <NextButton disabled={!isFormValid}>다음</NextButton>
          </Form>
        </BackgroundCircle>
      </ContentWrapper>
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
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
  height: 950px;
  background-color: white;
  border-radius: 60px 60px 0px 0px;
  padding: 35px 30px 0px 30px;
  position: absolute;
  bottom: 0px;
  left: 0;
  right: 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGrid = styled.div`
  padding: 60px 00px 20px 0px;
`;

const InputDiv = styled.div`
  padding-bottom: 20px;
`;

const Label = styled.label`
  padding-left: 15px;
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

const ErrorMessage = styled.span`
  font-size: 12px;
  color: red;
  padding-left: 10px;
  padding-top: 10px;
`;

const NextButton = styled.button`
  padding: 10px 20px;
  background-color: ${({ disabled }) => (disabled ? '#B2B2B2' : 'orange')};
  color: white;
  border: none;
  font-size: 20px;
  font-weight: 700;
  border-radius: 40px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;

export default Register;
