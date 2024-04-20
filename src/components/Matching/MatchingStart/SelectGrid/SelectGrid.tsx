import React, { useEffect, useState } from 'react';
import Styled from './Select.styled';
import SelectItem from './SelectItem';
import {
  matchingInfo,
  MatchingInfoKeys,
  preferenceOptionsList,
} from 'data/matching';

interface SelectGridProps {
  lists: typeof preferenceOptionsList;
  setLists: React.Dispatch<React.SetStateAction<typeof preferenceOptionsList>>;
  currentValue: MatchingInfoKeys;
  handleButtonDisabled: (value: boolean) => void;
}

const SelectGrid: React.FC<SelectGridProps> = ({
  lists,
  setLists,
  currentValue,
  handleButtonDisabled,
}) => {
  const itemArray = matchingInfo[currentValue];
  // ['Korean', 'English', 'Chinese', 'Japanese', 'French', 'Spanish']

  const toggleItemSelection = (code: number) => {
    setLists((prevLists) => {
      if (prevLists[currentValue].includes(code)) {
        return {
          ...prevLists,
          [currentValue]: prevLists[currentValue].filter(
            (item) => item !== code,
          ),
        };
      } else {
        return {
          ...prevLists,
          [currentValue]: [...prevLists[currentValue], code],
        };
      }
    });
  };

  useEffect(() => {
    const hasTrueValue = lists[currentValue].length > 0;
    handleButtonDisabled(hasTrueValue);
  }, [lists]);
  return (
    <>
      <Styled.SelectGrid>
        {itemArray.map((item, idx) => (
          <SelectItem
            key={item}
            text={item}
            selected={lists[currentValue].indexOf(idx + 1) !== -1}
            onClick={() => {
              toggleItemSelection(idx + 1);
            }}
          />
        ))}
      </Styled.SelectGrid>
    </>
  );
};

export default SelectGrid;
