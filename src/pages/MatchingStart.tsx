import Dropdown from 'components/Dropdown/Dropdown';
import MatchingHeader from 'components/MatchingHeader';
import React, { useState } from 'react';
import styled from 'styled-components';

const preferenceOptions = ['언어', '성격', '취미', '활동'];

const MatchingStart = () => {
  const [order, setOrder] = useState(1);
  return (
    <Wrapper>
      <MatchingHeader order={order} />
      <Container>
        <MainTextWrapper>
          {order}순위로 선호하는 항목을
          <br />
          선택해주세요
        </MainTextWrapper>
        <Dropdown list={preferenceOptions} />
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;
  background-color: white;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 25px;
`;

const MainTextWrapper = styled.div`
  color: black;
  font-size: 24px;
  font-weight: 700;
  text-align: left;
`;

export default MatchingStart;
