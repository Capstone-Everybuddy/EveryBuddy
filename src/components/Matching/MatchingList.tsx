import React, { useState } from 'react';
import MemberProfile from './MatchingComplete/MemberProfile';
import styled from 'styled-components';
import { Role } from 'data/matching';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import useMatchingState from 'hooks/useMatchingState';
import { matchingInfo } from '../../data/matching';

const MatchingList = () => {
  const { matchingEntire, matchingDelete } = useMatchingState();
  const [selected, setSelected] = useState<number>(0);
  const [showFull, setShowFull] = useState(false);

  const clickSeoulMate = (idx: number) => {
    setSelected((prev) => (prev === idx ? 0 : idx));
  };

  const clickShowFull = () => {
    setShowFull((prev) => {
      if (prev) setSelected(0);
      return !prev;
    });
  };

  return (
    <Wrapper>
      <Button onClick={clickShowFull}>
        <span>{showFull ? '전체 접기' : '전체 펼치기'}</span>
        {showFull ? <FiChevronUp /> : <FiChevronDown />}
      </Button>
      <RedButton onClick={() => matchingDelete()}>
        <span>매칭 초기화</span>
      </RedButton>
      {matchingEntire?.map((item) => (
        <GroupList key={item.seoulmate?.seoulmateIdx}>
          <MemberProfile
            name={item.seoulmate?.name || ''}
            memberRole={Role.SEOULMATE}
            studentId={item.seoulmate?.studentId || ''}
            sex={matchingInfo.sex[item.seoulmate?.sex || 0]}
            major={matchingInfo.major[item.seoulmate?.major || 0]}
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            onClick={() => clickSeoulMate(item.seoulmate?.seoulmateIdx || 0)}
          />
          {(showFull || selected === item.seoulmate?.seoulmateIdx) && (
            <BuddyList>
              {item.buddyList?.map((item) => (
                <MemberProfile
                  key={item.buddyIdx}
                  name={item.name!}
                  sex={matchingInfo.sex[item.sex || 0]}
                  major={matchingInfo.major[item.major || 0]}
                  studentId={item.studentId!}
                  memberRole={Role.BUDDY}
                />
              ))}
            </BuddyList>
          )}
        </GroupList>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const GroupList = styled.div`
  margin: 8px 0px;
`;
const BuddyList = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: all;
`;

const Button = styled.div`
  margin: 10px 0px;
  display: flex;
  align-items: center;
  padding: 0.75rem 1.25rem;
  background-color: #ffa800; /* 단색 배경 사용 */
  color: white;
  font-weight: 600;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #ff8c00; /* 호버 시 배경색 변화 */
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 4px rgba(255, 168, 0, 0.3);
  }

  span {
    margin-right: 0.5rem;
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

const RedButton = styled.div`
  margin: 10px 0px;
  display: flex;
  align-items: center;
  padding: 0.75rem 1.25rem;
  background-color: #ff0000; /* 단색 배경 사용 */
  color: white;
  font-weight: 600;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #cc0000; /* 호버 시 배경색 변화 */
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 4px rgba(255, 0, 0, 0.3);
  }

  span {
    margin-right: 0.5rem;
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

export default MatchingList;
