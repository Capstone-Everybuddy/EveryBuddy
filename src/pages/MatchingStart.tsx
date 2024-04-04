import MatchingHeader from 'components/MatchingStart/MatchingHeader';
import PreferenceSelectList from 'components/MatchingStart/PreferenceSelectList';
import React, { useState } from 'react';
import styled from 'styled-components';
import Button from 'components/Button';
import Dropdown from 'components/MatchingStart/Dropdown/Dropdown';

const preferenceOptions = ['언어', '성격', '취미', '활동'];

const MatchingStart = () => {
  const [order, setOrder] = useState(1);
  const [currentValue, setCurrentValue] = useState(preferenceOptions[0]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleCurrentValue = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
  ) => {
    setCurrentValue(e.currentTarget.title);
  };

  const decreaseOrder = () => {
    setOrder((prev) => prev - 1);
  };

  const increaseOrder = () => {
    setOrder((prev) => prev + 1);
  };

  const handleButtonDisabled = (value: boolean) => {
    if (value) setIsButtonDisabled(false);
    else setIsButtonDisabled(true);
  };

  const clickButton = () => {
    if (order === 4) console.log('완료');
    else increaseOrder();
  };
  return (
    <Wrapper>
      <MatchingHeader order={order} handleOrder={decreaseOrder} />
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
        <PreferenceSelectList
          currentValue={currentValue}
          handleButtondDisabled={handleButtonDisabled}
        />
      </Container>
      <ButtonWrapper>
        <Button
          text={order === 4 ? '완료' : '다음'}
          disabled={isButtonDisabled}
          onClick={clickButton}
        />
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
