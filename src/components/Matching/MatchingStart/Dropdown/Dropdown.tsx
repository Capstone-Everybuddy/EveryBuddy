import React, { useState } from 'react';
import Styled from './Dropdown.styled';
import { MatchingInfoKeys, getPreferenceOptions } from 'data/matching';

interface DropdownProps {
  options: ReturnType<typeof getPreferenceOptions>;
  currentValue: MatchingInfoKeys;
  handleCurrentValue: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  currentValue,
  handleCurrentValue,
}) => {
  const [isShowOptions, setShowOptions] = useState(false);

  return (
    <Styled.SelectBox onClick={() => setShowOptions((prev) => !prev)}>
      <Styled.Label>{currentValue}</Styled.Label>
      <Styled.SelectOptions show={isShowOptions}>
        {Object.keys(options)
          .filter((option) => options[option as MatchingInfoKeys] === 0) // option이 0인 값만 반환
          .map((option) => (
            <Styled.Option
              key={option}
              title={option}
              onClick={handleCurrentValue}
            >
              {option}
            </Styled.Option>
          ))}
      </Styled.SelectOptions>
    </Styled.SelectBox>
  );
};

export default Dropdown;
