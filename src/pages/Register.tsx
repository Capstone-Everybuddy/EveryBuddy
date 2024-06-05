import React, {
  useState,
  ChangeEvent,
  FormEvent,
  useRef,
  MouseEvent,
} from 'react';
import { MdEdit } from 'react-icons/md';
import styled from 'styled-components';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { api } from 'api/Client';
import StudentCardCheck from 'components/StudentCardCheck';

interface FormData {
  user_name: string;
  user_id: string;
  user_pwd: string;
  user_pwdCheck: string;
  profileImage: string;
  user_studentId: string;
  user_auth: string;
}

interface FormErrors {
  user_name: string;
  user_id: string;
  user_pwd: string;
  user_studentId: string;
  user_pwdCheck: string;
  user_auth: string;
}

const Register = () => {
  const location = useLocation();
  const userType = location.state?.userType || '';
  const [formData, setFormData] = useState<FormData>({
    user_name: '',
    user_id: '',
    user_pwd: '',
    user_pwdCheck: '',
    user_studentId: '',
    user_auth: '',
    profileImage: 'https://via.placeholder.com/150',
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({
    user_name: '',
    user_id: '',
    user_pwd: '',
    user_pwdCheck: '',
    user_studentId: '',
    user_auth: '',
  });

  const [completeAuth, setCompleteAuth] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

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

  const studentIdCheckInputChange = (name: string, studentId: string) => {
    setFormData({ ...formData, user_name: name, user_studentId: studentId });
    setFormErrors((prev) => ({ ...prev, user_name: '', user_studentId: '' }));
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
      user_studentId: '',
      user_auth: '',
    };

    for (const key in formData) {
      if (formData[key as keyof FormData] === '') {
        errors[key as keyof FormErrors] = 'This field is required.';
        hasErrors = true;
      }
    }

    if (
      formData.user_pwd !== formData.user_pwdCheck &&
      formData.user_pwdCheck !== ''
    ) {
      errors.user_pwdCheck = 'Passwords do not match.';
      hasErrors = true;
    }

    setFormErrors(errors);
    return !hasErrors;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      console.log(`User type: ${userType}`);
      console.log('Form data:', formData);

      try {
        if (userType === 'MATE') {
          console.log('Calling createSeoulmate API');
          const response = await api.seoulmates.createSeoulmate({
            name: formData.user_name,
            id: formData.user_id,
            password1: formData.user_pwd,
            password2: formData.user_pwdCheck,
            studentId: formData.user_studentId,
            profileImg: formData.profileImage,
          });
          console.log('createSeoulmate response:', response);
          alert('Seoulmate registration completed.');
          navigate('/login');
        } else if (userType === 'BUDDY') {
          console.log('Calling createBuddy API');
          const response = await api.buddies.createBuddy({
            name: formData.user_name,
            id: formData.user_id,
            password1: formData.user_pwd,
            password2: formData.user_pwdCheck,
            studentId: formData.user_studentId,
            profileImg: formData.profileImage,
          });
          console.log('createBuddy response:', response);
          alert('Buddy registration completed.');
          navigate('/login');
        }
      } catch (error) {
        console.error('API call error:', error);
        alert('Failed to register.');
      }
    }
  };

  const isFormValid =
    !Object.values(formErrors).some((error) => error !== '') &&
    Object.values(formData).every((value) => value !== '') &&
    completeAuth;

  const handleAuthSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (formData['user_auth'] !== 'everybuddy!') {
      setCompleteAuth('');
      setFormErrors((prev) => ({
        ...prev,
        user_auth: 'The verification code does not match.',
      }));
    } else setCompleteAuth('Verification completed.');
  };

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
              <InputDiv>
                <Label htmlFor="user_studentId">STUDENT ID</Label>
                <Input
                  type="number"
                  id="user_studentId"
                  name="user_studentId"
                  value={formData.user_studentId}
                  onChange={handleInputChange}
                />
                {formErrors.user_studentId && (
                  <ErrorMessage>{formErrors.user_studentId}</ErrorMessage>
                )}
              </InputDiv>
            </FormGrid>
            <InputDiv>
              <Label htmlFor="user_auth">Verification Code</Label>
              <AuthDiv>
                <Input
                  type="text"
                  id="user_auth"
                  name="user_auth"
                  value={formData.user_auth}
                  onChange={handleInputChange}
                />
                <SubmitButton onClick={handleAuthSubmit}>Submit</SubmitButton>
              </AuthDiv>
              {formErrors.user_auth && (
                <ErrorMessage>{formErrors.user_auth}</ErrorMessage>
              )}
              {completeAuth && (
                <CompleteMessage>{completeAuth}</CompleteMessage>
              )}
            </InputDiv>
            <StudentCardCheck
              studentIdCheckInputChange={studentIdCheckInputChange}
            />
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
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ArrowWrapper = styled.div`
  padding: 30px 27px;
`;

const BackgroundCircle = styled.div`
  flex: 1;
  box-shadow: 0px -6px 10px 0px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 60px 60px 0px 0px;
  padding: 35px 30px 30px 30px;
  overflow-y: auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGrid = styled.div`
  padding: 60px 0px 0px 0px;
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

const CompleteMessage = styled.span`
  font-size: 12px;
  padding-left: 10px;
  padding-top: 10px;
`;

const NextButton = styled.button`
  padding: 10px 20px;
  margin-bottom: 20px;
  background-color: ${({ disabled }) => (disabled ? '#B2B2B2' : 'orange')};
  color: white;
  border: none;
  font-size: 20px;
  font-weight: 700;
  border-radius: 40px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  width: 100%;
`;

const AuthDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
  margin-bottom: 20px; /* 간격을 주기 위해 마진 추가 */
`;

const SubmitButton = styled.button`
  padding: 8px 10px;
  background-color: ${(props) => props.theme.colors.orange};
  color: #fff;
  border: none;
  border-radius: 4px;
  font-weight: 700;
  font-size: 12px;
  cursor: pointer;
`;

export default Register;
