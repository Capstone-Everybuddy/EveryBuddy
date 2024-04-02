import React, { useState } from 'react';
import Styled from './Dropdown.styled';

interface DropdownProps {
  list: string[];
}

const Dropdown: React.FC<DropdownProps> = ({ list }) => {
  const [isShowOptions, setShowOptions] = useState(false);
  const [currentValue, setCurrentValue] = useState(list[0]);

  const handleCurrentValue = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
  ) => {
    setCurrentValue(e.currentTarget.title);
  };

  return (
    <Styled.SelectBox onClick={() => setShowOptions((prev) => !prev)}>
      <Styled.Label>{currentValue}</Styled.Label>
      <Styled.SelectOptions show={isShowOptions}>
        {list.map((name) => (
          <Styled.Option key={name} title={name} onClick={handleCurrentValue}>
            {name}
          </Styled.Option>
        ))}
      </Styled.SelectOptions>
    </Styled.SelectBox>
  );
};

export default Dropdown;
