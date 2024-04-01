import MatchingHeader from 'components/MatchingHeader';
import React, { useState } from 'react';
import styled from 'styled-components';

const MatchingStart = () => {
  const [order, setOrder] = useState<number>(1);
  return (
    <Wrapper>
      <MatchingHeader order={order} />
      <Container>
        <MainTextWrapper>
          {order}순위로 선호하는 항목을
          <br />
          선택해주세요
        </MainTextWrapper>
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
