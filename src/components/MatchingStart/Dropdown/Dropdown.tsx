import React, { useState } from 'react';
import Styled from './Dropdown.styled';

interface DropdownProps {
  list: string[];
  currentValue: string;
  handleValue: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  list,
  currentValue,
  handleValue,
}) => {
  const [isShowOptions, setShowOptions] = useState(false);

  return (
    <Styled.SelectBox onClick={() => setShowOptions((prev) => !prev)}>
      <Styled.Label>{currentValue}</Styled.Label>
      <Styled.SelectOptions show={isShowOptions}>
        {list.map((name) => (
          <Styled.Option key={name} title={name} onClick={handleValue}>
            {name}
          </Styled.Option>
        ))}
      </Styled.SelectOptions>
    </Styled.SelectBox>
  );
};

export default Dropdown;
