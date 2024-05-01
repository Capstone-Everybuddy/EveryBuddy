import MatchingHeader from 'components/Matching/MatchingStart/MatchingHeader';
import SelectList from 'components/Matching/MatchingStart/SelectList';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from 'components/Button';
import Dropdown from 'components/Matching/MatchingStart/Dropdown/Dropdown';
import Modal from 'components/Modal';
import {
  MatchingInfoKeys,
  preferenceOptions,
  preferenceOptionsList,
} from 'data/matching';
import { useLocation } from 'react-router-dom';
import useSeoulmates from 'hooks/useSeoulmates';

enum Role {
  SEOULMATE,
  BUDDY,
}

const maxOrderValues = {
  [Role.SEOULMATE]: {
    preference: 7,
    information: 6,
  },
  [Role.BUDDY]: {
    preference: 6,
    information: 7,
  },
};

const convertToPreferenceFormat = (
  options: typeof preferenceOptions,
  lists: typeof preferenceOptionsList,
  role: number,
) => {
  const preferenceFormat = {
    first:
      Object.keys(options).find(
        (key) => options[key as MatchingInfoKeys] === 1,
      ) || '',
    second:
      Object.keys(options).find(
        (key) => options[key as MatchingInfoKeys] === 2,
      ) || '',
    third:
      Object.keys(options).find(
        (key) => options[key as MatchingInfoKeys] === 3,
      ) || '',
    fourth:
      Object.keys(options).find(
        (key) => options[key as MatchingInfoKeys] === 4,
      ) || '',
    fifth:
      Object.keys(options).find(
        (key) => options[key as MatchingInfoKeys] === 5,
      ) || '',
    sixth:
      Object.keys(options).find(
        (key) => options[key as MatchingInfoKeys] === 6,
      ) || '',
    seventh:
      Object.keys(options).find(
        (key) => options[key as MatchingInfoKeys] === 7,
      ) || '',
  };

  return Object.keys(preferenceFormat).reduce(
    (acc, key) => {
      acc[key] = preferenceFormat[key as keyof typeof preferenceFormat];
      acc[`${key}List`] =
        lists[
          preferenceFormat[
            key as keyof typeof preferenceFormat
          ] as keyof typeof lists
        ] || [];
      return acc;
    },
    {} as Record<string, any>,
  );
};

const convertToInfoFormat = (
  lists: typeof preferenceOptionsList,
  role: number,
) => {
  if (role === Role.SEOULMATE) {
    const modifiedSeoulmate = {
      language: lists.language,
      personality: lists.personality,
      hobby: lists.hobby,
      wanttodo: lists.wanttodo,
      major: lists.major[0],
      sex: lists.sex[0],
    };
    return modifiedSeoulmate;
  } else {
    const modifedBuddy = {
      ...lists,
      major: lists.major[0],
      sex: lists.sex[0],
    };
    return modifedBuddy;
  }
};

const MatchingInfo = () => {
  const [order, setOrder] = useState(1);
  const [rankingOptions, setRankingOptions] = useState(preferenceOptions);
  const [currentValue, setCurrentValue] =
    useState<MatchingInfoKeys>('language');
  const [lists, setLists] = useState(preferenceOptionsList);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // api
  const { savePreferenceSeoulmates, saveInfoSeoulmates } = useSeoulmates();

  // preference OR information
  const location = useLocation();
  const enterType: 'preference' | 'information' = location.state;

  // role
  const role = Role.BUDDY;

  const maxOrder = maxOrderValues[role][enterType];

  const handleOptions = (key: MatchingInfoKeys) => {
    setRankingOptions((prev) => {
      const updatedOptions = { ...prev };
      updatedOptions[key] = order;
      return updatedOptions;
    });
  };

  const handleCurrentValue = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
  ) => {
    setCurrentValue(e.currentTarget.title as MatchingInfoKeys);
  };

  const decreaseOrder = () => {
    setOrder((prev) => prev - 1);
  };

  const increaseOrder = () => {
    setOrder((prev) => prev + 1);
  };

  const handleButtonDisabled = (value: boolean) => {
    if (value) setIsButtonDisabled(false);
    else setIsButtonDisabled(true);
  };

  const clickNextButton = () => {
    handleOptions(currentValue);
    if (maxOrder === order) setShowModal(true);
    else increaseOrder();
  };

  const clickBackButton = () => {
    setRankingOptions((prev) => {
      const updatedOptions = { ...prev };
      Object.keys(updatedOptions).forEach((key) => {
        const tempKey = key as MatchingInfoKeys;
        if (updatedOptions[tempKey] >= order - 1) {
          updatedOptions[tempKey] = 0;
        }
      });

      return updatedOptions;
    });
    decreaseOrder();
  };

  const submitCompleted = () => {
    if (enterType === 'information') {
      saveInfoSeoulmates({
        seoulmateIdx: 1, //TODO: 임시로 idx 넣음
        data: convertToInfoFormat(lists, role),
      });
    } else if (enterType === 'preference') {
      savePreferenceSeoulmates({
        seoulmateIdx: 1, //TODO: 임시로 idx 넣음
        data: convertToPreferenceFormat(rankingOptions, lists, role),
      });
    }
  };

  const getRankingDescription = (order: number): string => {
    let suffix: string;

    if (order === 1) {
      suffix = 'st';
    } else if (order === 2) {
      suffix = 'nd';
    } else if (order === 3) {
      suffix = 'rd';
    } else {
      suffix = 'th';
    }
    return order + suffix;
  };

  useEffect(() => {
    setCurrentValue(
      Object.keys(rankingOptions).find(
        (key) => rankingOptions[key as MatchingInfoKeys] === 0,
      ) as MatchingInfoKeys,
    );
  }, [order]);

  // 다른 항목을 선택했을 때 전에 선택했던 항목들 초기화
  useEffect(() => {
    setLists((prevLists) => ({
      ...Object.keys(prevLists).reduce((acc, key) => {
        const tempKey = key as MatchingInfoKeys;
        acc[tempKey] = rankingOptions[tempKey] !== 0 ? prevLists[tempKey] : [];
        return acc;
      }, preferenceOptionsList),
    }));
    console.log(lists);
  }, [currentValue]);
  return (
    <Wrapper>
      <MatchingHeader order={order} handleOrder={clickBackButton} />
      <Container>
        {enterType === 'preference' && (
          <div>
            <MainText>
              Please select your preferred item as your{' '}
              {getRankingDescription(order)} choice.
            </MainText>
            <Dropdown
              options={rankingOptions}
              currentValue={currentValue}
              handleCurrentValue={handleCurrentValue}
            />
            <Line />
          </div>
        )}
        <SelectList
          lists={lists}
          setLists={setLists}
          enterType={enterType}
          currentValue={currentValue}
          handleButtondDisabled={handleButtonDisabled}
        />
      </Container>
      <ButtonWrapper>
        <Button
          text={order === maxOrder ? 'Finish' : 'Next'}
          disabled={isButtonDisabled}
          onClick={clickNextButton}
        />
      </ButtonWrapper>
      <Modal show={showModal} submitCompleted={submitCompleted} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;
  background-color: white;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 25px;
  overflow-y: auto;
  height: calc(100vh - 60px);
`;

const MainText = styled.div`
  color: black;
  font-size: 24px;
  font-weight: 700;
  text-align: left;
  margin-bottom: 20px;
`;

const Line = styled.div`
  padding-top: 30px;
  border-bottom: 1px solid ${(props) => props.theme.colors.lightgray};
`;

const ButtonWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 25px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 0%,
    #ffffff 70.61%
  );
`;
export default MatchingInfo;
