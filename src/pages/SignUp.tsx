import React from 'react';
import { styled } from 'styled-components';
import TypeButton from 'components/TypeButton';
import { Link } from 'react-router-dom';

//Import Icons
import { FaArrowLeft } from 'react-icons/fa';

const SignUp = () => {
  return (
    <MainWrapper>
      <Link to="/">
        <ArrowWrapper>
          <FaArrowLeft color="white" size="22px" />
        </ArrowWrapper>
      </Link>

      <ContentWrapper>
        <BackgroundCircle>
          <h1>회원가입</h1>
          <p color="#B0B0B0">서울메이트와 버디중 본인의 유형을 선택해주세요</p>
          <TypeButtonWrapper>
            <StyledLink to="/register">
              <TypeButton type="메이트" description="메이트" />
            </StyledLink>
            <StyledLink to="/register">
              <TypeButton type="버디" description="버디" />
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
  height: 950px;
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
