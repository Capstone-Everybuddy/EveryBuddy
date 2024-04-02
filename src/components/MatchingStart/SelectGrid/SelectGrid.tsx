import React from 'react';
import Styled from './Select.styled';
import SelectItem from './SelectItem';

interface SelectGridProps {
  list: [string, boolean][];
}
const SelectGrid: React.FC<SelectGridProps> = ({ list }) => {
  return (
    <>
      <Styled.SelectGrid>
        {list.map((item) => (
          <SelectItem key={item[0]} text={item[0]} />
        ))}
      </Styled.SelectGrid>
    </>
  );
};

export default SelectGrid;
