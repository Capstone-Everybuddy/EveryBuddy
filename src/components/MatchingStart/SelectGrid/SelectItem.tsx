import React, { useState } from 'react';
import Styled from './Select.styled';

interface SelectItemProps {
  text: string;
}
const SelectItem: React.FC<SelectItemProps> = ({ text }) => {
  const [selected, setSelected] = useState(false);
  return (
    <Styled.SelectItem
      onClick={() => setSelected((prev) => !prev)}
      selected={selected}
    >
      {text}
    </Styled.SelectItem>
  );
};

export default SelectItem;
