import Dropdown from 'components/MatchingStart/Dropdown/Dropdown';
import MatchingHeader from 'components/MatchingHeader';
import PreferenceSelector from 'components/MatchingStart/PreferenceSelector';
import React, { useState } from 'react';
import styled from 'styled-components';
import Button from 'components/Button';

const preferenceOptions = ['언어', '성격', '취미', '활동'];

const MatchingStart = () => {
  const [order, setOrder] = useState(1);
  const [currentValue, setCurrentValue] = useState(preferenceOptions[0]);

  const handleCurrentValue = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
  ) => {
    setCurrentValue(e.currentTarget.title);
  };

  return (
    <Wrapper>
      <MatchingHeader order={order} />
      <Container>
        <div style={{ paddingBottom: '30px' }}>
          <MainText>
            {order}순위로 선호하는 항목을
            <br />
            선택해주세요
          </MainText>
          <Dropdown
            list={preferenceOptions}
            currentValue={currentValue}
            handleValue={handleCurrentValue}
          />
        </div>
        <Line />
        <PreferenceSelector currentValue={currentValue} />
      </Container>
      <ButtonWrapper>
        <Button text="다음" />
      </ButtonWrapper>
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
  overflow-y: auto;
  height: calc(100vh - 60px);
`;

const MainText = styled.div`
  color: black;
  font-size: 24px;
  font-weight: 700;
  text-align: left;
  margin-bottom: 20px;
`;

const Line = styled.div`
  border: 1px solid ${(props) => props.theme.colors.lightgray};
`;

const ButtonWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 25px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    #ffffff 70.61%
  );
`;
export default MatchingStart;
