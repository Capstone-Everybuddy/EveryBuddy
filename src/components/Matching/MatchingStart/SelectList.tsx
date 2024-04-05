import React from 'react';
import styled from 'styled-components';
import SelectGrid from './SelectGrid/SelectGrid';

interface PreferenceSelectorProps {
  currentValue: string;
  handleButtondDisabled: (value: boolean) => void;
}

const getMainText = (currentValue: string) => {
  switch (currentValue) {
    case '언어':
      return (
        <MainText>
          서울메이트 활동을 하며
          <br />
          사용하고 싶은 언어를 순서대로
          <br />
          선택해주세요
        </MainText>
      );
    case '성격':
      return (
        <MainText>
          사용자의 성격을
          <br />
          나타내는 키워드를
          <br />
          순서대로 선택해주세요
        </MainText>
      );
    case '취미':
      return (
        <MainText>
          서울메이트 활동 중
          <br />
          즐기는 취미를
          <br />
          순서대로 선택해주세요
        </MainText>
      );
    case '활동':
      return (
        <MainText>
          서울메이트 활동을
          <br />
          즐기기 위해 우선적으로
          <br />
          하고 싶은 활동을
          <br />
          선택해주세요
        </MainText>
      );
    default:
      return null;
  }
};

const PreferenceSelector: React.FC<PreferenceSelectorProps> = ({
  currentValue,
  handleButtondDisabled,
}) => {
  const mainText = getMainText(currentValue);

  return (
    <Wrapper>
      <div>
        {mainText}
        <SubText>3개 선택 필수가 맞을까요?</SubText>
        <SelectGrid
          currentValue={currentValue}
          handleButtonDisabled={handleButtondDisabled}
        />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 30px 0px;
  padding-bottom: 120px;
`;
const MainText = styled.div`
  color: black;
  font-size: 24px;
  font-weight: 700;
  text-align: left;
  margin-bottom: 20px;
`;

const SubText = styled.div`
  color: ${(props) => props.theme.colors.gray};
  font-size: 16px;
  text-align: left;
  margin-bottom: 20px;
`;

export default PreferenceSelector;
