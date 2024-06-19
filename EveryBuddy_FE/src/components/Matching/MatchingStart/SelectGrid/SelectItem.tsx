import React from 'react';
import Styled from './Select.styled';

interface SelectItemProps {
  text: string;
  selected: boolean;
  onClick: () => void;
}
const SelectItem: React.FC<SelectItemProps> = ({ text, selected, onClick }) => {
  return (
    <Styled.SelectItem selected={selected} onClick={onClick}>
      {text}
    </Styled.SelectItem>
  );
};

export default SelectItem;
