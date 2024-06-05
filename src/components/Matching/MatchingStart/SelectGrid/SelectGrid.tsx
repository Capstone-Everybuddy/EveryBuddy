import React, { useEffect, useState } from 'react';
import Styled from './Select.styled';
import SelectItem from './SelectItem';
import {
  matchingInfo,
  MatchingInfoKeys,
  preferenceOptionsList,
} from 'data/matching';

interface SelectGridProps {
  enterType: 'information' | 'preference';
  lists: typeof preferenceOptionsList;
  setLists: React.Dispatch<React.SetStateAction<typeof preferenceOptionsList>>;
  currentValue: MatchingInfoKeys;
  handleButtonDisabled: (value: boolean) => void;
}

const SelectGrid: React.FC<SelectGridProps> = ({
  enterType,
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
        if (
          enterType === 'information' &&
          ['sex', 'major', 'continent', 'motherTongue'].includes(currentValue)
        ) {
          return {
            ...prevLists,
            [currentValue]: [code], // 기존 값을 대체하여 새로운 값으로 설정
          };
        } else {
          return {
            ...prevLists,
            [currentValue]: [...prevLists[currentValue], code],
          };
        }
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
