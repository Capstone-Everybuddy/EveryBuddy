import React, {
  useState,
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
} from 'react';
import { MdEdit } from 'react-icons/md';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import useUserType from 'hooks/useUserType'; // useUserType 훅 import
import { api } from 'api/Client';

interface FormData {
  user_name: string;
  user_id: string;
  user_pwd: string;
  user_pwdCheck: string;
  profileImage: string;
}

interface FormErrors {
  user_name: string;
  user_id: string;
  user_pwd: string;
  user_pwdCheck: string;
}

const Register = () => {
  const [formData, setFormData] = useState<FormData>({
    user_name: '',
    user_id: '',
    user_pwd: '',
    user_pwdCheck: '',
    profileImage: 'https://via.placeholder.com/150',
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({
    user_name: '',
    user_id: '',
    user_pwd: '',
    user_pwdCheck: '',
  });

  const [userType] = useUserType(); // 사용자 유형 가져오기
  useEffect(() => {
    if (userType === 'MATE') {
      api.seoulmates.createSeoulmate({
        name: formData.user_name,
        password1: formData.user_pwd,
        password2: formData.user_pwdCheck,
        id: formData.user_id,
        profileImg: 'path/to/default-image.jpg', // 기본 이미지 경로(필요한 경우)
      });
    } else if (userType === 'BUDDY') {
      api.buddies.createBuddy({
        name: formData.user_name,
        password1: formData.user_pwd,
        password2: formData.user_pwdCheck,
        id: formData.user_id,
        profileImg: 'path/to/default-image.jpg', // 기본 이미지 경로(필요한 경우)
      });
    }
  }, [userType, formData, api]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const [isChecked] = useState<boolean>(() => {
    return localStorage.getItem('isChecked') === 'true';
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (value === '') {
      setFormErrors({ ...formErrors, [name]: 'This field is required.' });
    } else {
      setFormErrors({ ...formErrors, [name]: '' });
    }

    if (name === 'user_pwdCheck' && value !== formData.user_pwd) {
      setFormErrors({
        ...formErrors,
        user_pwdCheck: 'Passwords do not match.',
      });
    } else if (name === 'user_pwdCheck') {
      setFormErrors({ ...formErrors, user_pwdCheck: '' });
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profileImage: reader.result as string });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  const validateForm = () => {
    let hasErrors = false;
    const errors: FormErrors = {
      user_name: '',
      user_id: '',
      user_pwd: '',
      user_pwdCheck: '',
    };

    for (const key in formData) {
      if (formData[key as keyof FormData] === '') {
        errors[key as keyof FormErrors] = 'This field is required.';
        hasErrors = true;
      }
    }

    if (formData.user_pwd !== formData.user_pwdCheck) {
      errors.user_pwdCheck = 'Passwords do not match.';
      hasErrors = true;
    }

    setFormErrors(errors);
    return !hasErrors;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      alert('Registration completed.');
      navigate('/login');
    }
  };

  const isFormValid =
    !Object.values(formErrors).some((error) => error !== '') &&
    Object.values(formData).every((value) => value !== '');

  return (
    <MainWrapper>
      <Link to="/signup">
        <ArrowWrapper>
          <FaArrowLeft color="white" size="22px" />
        </ArrowWrapper>
      </Link>
      <ContentWrapper>
        <BackgroundCircle>
          <h1>Sign Up</h1>
          <p>Please enter your information.</p>
          <Form onSubmit={handleSubmit}>
            <FormGrid>
              <ProfileImage>
                <img src={formData.profileImage} alt="Profile Preview" />
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
                <MdEditIcon onClick={triggerFileInput} />
              </ProfileImage>
              <InputDiv>
                <Label htmlFor="user_name">NAME</Label>
                <Input
                  type="text"
                  id="user_name"
                  name="user_name"
                  value={formData.user_name}
                  onChange={handleInputChange}
                />
                {formErrors.user_name && (
                  <ErrorMessage>{formErrors.user_name}</ErrorMessage>
                )}
              </InputDiv>
              <InputDiv>
                <Label htmlFor="user_id">Id</Label>
                <Input
                  type="text"
                  id="user_id"
                  name="user_id"
                  value={formData.user_id}
                  onChange={handleInputChange}
                />
                {formErrors.user_id && (
                  <ErrorMessage>{formErrors.user_id}</ErrorMessage>
                )}
              </InputDiv>
              <InputDiv>
                <Label htmlFor="user_pwd">PASSWORD</Label>
                <Input
                  type="password"
                  id="user_pwd"
                  name="user_pwd"
                  value={formData.user_pwd}
                  onChange={handleInputChange}
                />
                {formErrors.user_pwd && (
                  <ErrorMessage>{formErrors.user_pwd}</ErrorMessage>
                )}
              </InputDiv>
              <InputDiv>
                <Label htmlFor="user_pwdCheck">PASSWORD CHECK</Label>
                <Input
                  type="password"
                  id="user_pwdCheck"
                  name="user_pwdCheck"
                  value={formData.user_pwdCheck}
                  onChange={handleInputChange}
                />
                {formErrors.user_pwdCheck && (
                  <ErrorMessage>{formErrors.user_pwdCheck}</ErrorMessage>
                )}
              </InputDiv>
            </FormGrid>
            <Link to="/check">
              <CheckButton
                onClick={() => localStorage.setItem('isChecked', 'true')}
                isChecked={isChecked}
              >
                Go To Student Check
              </CheckButton>
            </Link>
            <NextButton disabled={!isFormValid}>NEXT</NextButton>
          </Form>
        </BackgroundCircle>
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGrid = styled.div`
  padding: 60px 0px 20px 0px;
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

const ProfileImage = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const MdEditIcon = styled(MdEdit)`
  position: absolute;
  top: 270px;
  right: 160px;
  cursor: pointer;
`;

const ErrorMessage = styled.span`
  font-size: 12px;
  color: red;
  padding-left: 10px;
  padding-top: 10px;
`;

const CheckButton = styled.button<{ isChecked: boolean }>`
  padding: 10px 20px;
  background-color: ${({ isChecked }) => (isChecked ? '#B2B2B2' : 'orange')};
  color: white;
  border: none;
  font-size: 20px;
  font-weight: 700;
  border-radius: 40px;
  width: 100%;
  cursor: ${({ isChecked }) => (isChecked ? 'not-allowed' : 'pointer')};
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
  width: 100%;
`;

export default Register;
