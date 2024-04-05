import React, { useEffect, useState } from 'react';
import Styled from './Select.styled';
import SelectItem from './SelectItem';

interface SelectGridProps {
  currentValue: string;
  handleButtonDisabled: (value: boolean) => void;
}

const getList = (currentValue: string): { [key: string]: boolean } => {
  switch (currentValue) {
    case '언어':
      return {
        한국어: false,
        영어: false,
        중국어: false,
        일본어: false,
        불어: false,
        스페인어: false,
      };
    case '성격':
      return {
        차분한: false,
        활동적인: false,
        사교적인: false,
        친화적인: false,
        적극적인: false,
        섬세한: false,
        배려깊은: false,
        협동적인: false,
        유머러스한: false,
        경청하는: false,
      };
    case '취미':
      return {
        독서: false,
        운동: false,
        쇼핑: false,
        '관광/여행': false,
        요리: false,
        영화: false,
        맛집탐방: false,
        '전시회/공연관람': false,
        게임: false,
      };
    case '활동':
      return {
        언어교환: false,
        관광: false,
        학교적응: false,
        친목: false,
        학업: false,
      };
    default:
      return {};
  }
};

const SelectGrid: React.FC<SelectGridProps> = ({
  currentValue,
  handleButtonDisabled,
}) => {
  const [list, setList] = useState<{ [key: string]: boolean }>(
    getList(currentValue),
  );

  const toggleItemSelection = (key: string) => {
    setList((prevList) => {
      const updatedList = { ...prevList };
      updatedList[key] = !updatedList[key];
      return updatedList;
    });
  };

  useEffect(() => {
    setList(getList(currentValue));
  }, [currentValue]);

  useEffect(() => {
    const hasTrueValue = Object.values(list).some((value) => value);
    handleButtonDisabled(hasTrueValue);
  }, [list]);
  return (
    <>
      <Styled.SelectGrid>
        {Object.entries(list).map(([key, value]) => (
          <SelectItem
            key={key}
            text={key}
            selected={value}
            onClick={() => {
              toggleItemSelection(key);
            }}
          />
        ))}
      </Styled.SelectGrid>
    </>
  );
};

export default SelectGrid;
