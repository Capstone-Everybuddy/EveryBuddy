import React, { useState } from 'react';
import styled from 'styled-components';
import SelectGrid from './SelectGrid/SelectGrid';

interface PreferenceSelectorProps {
  currentValue: string;
}

const getMainText = (currentValue: string) => {
  switch (currentValue) {
    case '언어':
      return (
        <MainText>
          서울메이트 활동을 하며
          <br />
          사용하고 싶은 언어를 순서대로
          <br />
          선택해주세요
        </MainText>
      );
    case '성격':
      return (
        <MainText>
          사용자의 성격을
          <br />
          나타내는 키워드를
          <br />
          순서대로 선택해주세요
        </MainText>
      );
    case '취미':
      return (
        <MainText>
          서울메이트 활동 중
          <br />
          즐기는 취미를
          <br />
          순서대로 선택해주세요
        </MainText>
      );
    case '활동':
      return (
        <MainText>
          서울메이트 활동을
          <br />
          즐기기 위해 우선적으로
          <br />
          하고 싶은 활동을
          <br />
          선택해주세요
        </MainText>
      );
    default:
      return null;
  }
};

const getList = (currentValue: string): [string, boolean][] => {
  switch (currentValue) {
    case '언어':
      return ['한국어', '영어', '중국어', '일본어', '불어', '스페인어'].map(
        (language) => [language, false],
      );
    case '성격':
      return [
        '차분한',
        '활동적인',
        '사교적인',
        '친화적인',
        '적극적인',
        '섬세한',
        '배려깊은',
        '협동적인',
        '유머러스한',
        '경청하는',
      ].map((personality) => [personality, false]);
    case '취미':
      return [
        '독서',
        '운동',
        '쇼핑',
        '관광/여행',
        '요리',
        '영화',
        '맛집탐방',
        '전시회/공연관람',
        '게임',
      ].map((hobby) => [hobby, false]);
    case '활동':
      return ['언어교환', '관광', '학교적응', '친목', '학업'].map(
        (activity) => [activity, false],
      );
    default:
      return [];
  }
};

const PreferenceSelector: React.FC<PreferenceSelectorProps> = ({
  currentValue,
}) => {
  const [languageList, setLanguageList] = useState(getList('언어'));
  const [personalityList, setPersonalityList] = useState(getList('성격'));
  const [hobbyList, setHobbyList] = useState(getList('취미'));
  const [activityList, setActivityList] = useState(getList('활동'));
  const mainText = getMainText(currentValue);

  let list: [string, boolean][];
  switch (currentValue) {
    case '언어':
      list = languageList;
      break;
    case '성격':
      list = personalityList;
      break;
    case '취미':
      list = hobbyList;
      break;
    case '활동':
      list = activityList;
      break;
    default:
      list = [];
  }
  return (
    <Wrapper>
      <div>
        {mainText}
        <SubText>3개 선택 필수가 맞을까요?</SubText>
        <SelectGrid list={list} />
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

export default PreferenceSelector;
