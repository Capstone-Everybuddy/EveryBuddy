import MatchingHeader from 'components/Matching/MatchingStart/MatchingHeader';
import SelectList from 'components/Matching/MatchingStart/SelectList';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from 'components/Button';
import Dropdown from 'components/Matching/MatchingStart/Dropdown/Dropdown';
import Modal from 'components/Modal';

const preferenceOptions: { [key: string]: number } = {
  언어: 0,
  성격: 0,
  취미: 0,
  활동: 0,
};

const maxOrder = 4;

const MatchingStart = () => {
  const [order, setOrder] = useState(1);
  const [options, setOptions] = useState(preferenceOptions);
  const [currentValue, setCurrentValue] = useState(
    Object.keys(preferenceOptions).find((key) => preferenceOptions[key] === 0)!,
  );
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const handleOptions = (key: string) => {
    setOptions((prev) => {
      const updatedOptions = { ...prev };
      updatedOptions[key] = order;
      return updatedOptions;
    });
  };

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

  const clickNextButton = () => {
    if (order === maxOrder) console.log('완료');
    else {
      handleOptions(currentValue);
      increaseOrder();
    }
  };

  const clickBackButton = () => {
    setOptions((prev) => {
      const updatedOptions = { ...prev };
      Object.keys(updatedOptions).forEach((key) => {
        if (updatedOptions[key] >= order - 1) {
          updatedOptions[key] = 0;
        }
      });
      return updatedOptions;
    });
    decreaseOrder();
  };

  const submitCompleted = () => {
    setShowModal(true);
  };

  useEffect(() => {
    setCurrentValue(Object.keys(options).find((key) => options[key] === 0)!);
    console.log(options);
  }, [order]);
  return (
    <Wrapper>
      <MatchingHeader order={order} handleOrder={clickBackButton} />
      <Container>
        <div style={{ paddingBottom: '30px' }}>
          <MainText>
            {order}순위로 선호하는 항목을
            <br />
            선택해주세요
          </MainText>
          <Dropdown
            order={order}
            options={options}
            currentValue={currentValue}
            handleOptions={handleOptions}
            handleCurrentValue={handleCurrentValue}
          />
        </div>
        <Line />
        <SelectList
          currentValue={currentValue}
          handleButtondDisabled={handleButtonDisabled}
        />
      </Container>
      <ButtonWrapper>
        <Button
          text={order === maxOrder ? '완료' : '다음'}
          disabled={isButtonDisabled}
          onClick={order === maxOrder ? submitCompleted : clickNextButton}
        />
      </ButtonWrapper>
      <Modal show={showModal} />
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
