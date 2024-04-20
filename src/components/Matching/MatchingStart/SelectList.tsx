import React from 'react';
import styled from 'styled-components';
import SelectGrid from './SelectGrid/SelectGrid';
import { MatchingInfoKeys, preferenceOptionsList } from 'data/matching';

interface SelectListProps {
  lists: typeof preferenceOptionsList;
  setLists: React.Dispatch<React.SetStateAction<typeof preferenceOptionsList>>;
  currentValue: MatchingInfoKeys;
  handleButtondDisabled: (value: boolean) => void;
}

const getMainText = (currentValue: MatchingInfoKeys) => {
  switch (currentValue) {
    case 'language':
      return 'What language would you like your matching partner to be able to speak?';
    case 'personality':
      return 'What kind of personality do you want your matching partner to have?';
    case 'hobby':
      return 'What hobbies would you like to have with a matching partner?';
    case 'wanttodo':
      return 'What activities would you like to do with a matching partner?';
    case 'sex':
      return 'Is there a gender for a matching partner you want?';
    case 'major':
      return 'What kind of major would you like your matching partner to have?';
    case 'continent':
      return '문구 모르겟음...';
    default:
      return null;
  }
};

const SelectList: React.FC<SelectListProps> = ({
  lists,
  setLists,
  currentValue,
  handleButtondDisabled,
}) => {
  const mainText = getMainText(currentValue);

  return (
    <Wrapper>
      <div>
        <MainText>{mainText}</MainText>
        <SubText>At least one selection is required</SubText>
        <SelectGrid
          lists={lists}
          setLists={setLists}
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

export default SelectList;
