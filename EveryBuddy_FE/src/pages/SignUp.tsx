import React from 'react';
import TypeButton from 'components/TypeButton';
import { styled } from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const SignUp = () => {
  const navigate = useNavigate();

  const handleTypeSelection = (type: string) => {
    console.log(`Signup / Type selected: ${type}`); // 콘솔 로그 추가
    navigate('/register', { state: { userType: type } }); // register 페이지로 이동하면서 userType 상태 전달
  };

  return (
    <MainWrapper>
      <Link to="/">
        <ArrowWrapper>
          <FaArrowLeft color="white" size="22px" />
        </ArrowWrapper>
      </Link>

      <ContentWrapper>
        <BackgroundCircle>
          <h1>Sign Up</h1>
          <p color="#B0B0B0">Choose your type, SeoulMate or Buddy?</p>
          <TypeButtonWrapper>
            <TypeButton
              type="MATE"
              description="MATE"
              onClick={() => handleTypeSelection('MATE')}
            />
            <TypeButton
              type="BUDDY"
              description="BUDDY"
              onClick={() => handleTypeSelection('BUDDY')}
            />
          </TypeButtonWrapper>
        </BackgroundCircle>
      </ContentWrapper>
    </MainWrapper>
  );
};

const MainWrapper = styled.div`
  height: 100vh;
  background-color: ${(props) => props.theme.colors.yellow};
  overflow-y: auto;
`;

const ContentWrapper = styled.div`
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 20px;
  /* 스크롤바 감추기 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 및 Edge */

  /* Webkit 기반 브라우저(Chrome, Safari 등)에서 스크롤바 감추기 */
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
`;

const ArrowWrapper = styled.div`
  padding: 30px 27px;
`;

const BackgroundCircle = styled.div`
  box-shadow: 0px -6px 10px 0px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  height: 95%;
  background-color: white;
  border-radius: 60px 60px 0px 0px;
  padding: 35px 30px 0px 30px;
  position: absolute;
  bottom: 0px;
  left: 0;
  right: 0;
`;

const TypeButtonWrapper = styled.div`
  padding-top: 60px;
`;

export default SignUp;
