import React from 'react';
import { styled } from 'styled-components';
import TypeButton from 'components/TypeButton';

import { Link, useNavigate } from 'react-router-dom';

// 아이콘 임포트
import { FaArrowLeft } from 'react-icons/fa';

const SignUp = () => {
  const navigate = useNavigate();

  const handleTypeSelection = (type: string) => {
    navigate('/register', { state: { userType: type } });
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
            <StyledLink to="/register">
              <TypeButton
                type="MATE"
                description="MATE"
                onClick={() => handleTypeSelection('MATE')}
              />
            </StyledLink>
            <StyledLink to="/register">
              <TypeButton
                type="BUDDY"
                description="BUDDY"
                onClick={() => handleTypeSelection('BUDDY')}
              />
            </StyledLink>
          </TypeButtonWrapper>
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
  height: 850px;
  background-color: white;
  border-radius: 60px 60px 0px 0px;
  padding: 35px 30px 0px 30px;
  position: absolute;
  bottom: 0px;
  left: 0;
  right: 0;
`;

const StyledLink = styled(Link)`
  text-decoration: none; /* Remove underline */
  color: inherit; /* Inherit text color */
`;

const TypeButtonWrapper = styled.div`
  padding-top: 60px;
`;
export default SignUp;
