import React, { useState } from 'react';
import MemberProfile from './MatchingComplete/MemberProfile';
import styled from 'styled-components';
import { Role } from 'data/matching';
const arr = [
  {
    seoulmate: {
      seoulmateIdx: 1,
      name: 'Subin',
      password: 'string',
      studentId: 'string',
      profileImg: 'string',
      major: 0,
      sex: 0,
      certified: 0,
      state: 0,
      id: 'string',
    },
    buddyList: [
      {
        buddyIdx: 0,
        name: 'string',
        password: 'string',
        studentId: 'string',
        profileImg: 'string',
        major: 0,
        sex: 0,
        continent: 0,
        motherTongue: 0,
        certified: 0,
        state: 0,
        id: 'string',
      },
      {
        buddyIdx: 0,
        name: 'string',
        password: 'string',
        studentId: 'string',
        profileImg: 'string',
        major: 0,
        sex: 0,
        continent: 0,
        motherTongue: 0,
        certified: 0,
        state: 0,
        id: 'string',
      },
      {
        buddyIdx: 0,
        name: 'string',
        password: 'string',
        studentId: 'string',
        profileImg: 'string',
        major: 0,
        sex: 0,
        continent: 0,
        motherTongue: 0,
        certified: 0,
        state: 0,
        id: 'string',
      },
    ],
  },
  {
    seoulmate: {
      seoulmateIdx: 2,
      name: 'Suyeon',
      password: 'string',
      studentId: 'string',
      profileImg: 'string',
      major: 0,
      sex: 0,
      certified: 0,
      state: 0,
      id: 'string',
    },
    buddyList: [
      {
        buddyIdx: 0,
        name: 'string',
        password: 'string',
        studentId: 'string',
        profileImg: 'string',
        major: 0,
        sex: 0,
        continent: 0,
        motherTongue: 0,
        certified: 0,
        state: 0,
        id: 'string',
      },
      {
        buddyIdx: 0,
        name: 'string',
        password: 'string',
        studentId: 'string',
        profileImg: 'string',
        major: 0,
        sex: 0,
        continent: 0,
        motherTongue: 0,
        certified: 0,
        state: 0,
        id: 'string',
      },
      {
        buddyIdx: 0,
        name: 'string',
        password: 'string',
        studentId: 'string',
        profileImg: 'string',
        major: 0,
        sex: 0,
        continent: 0,
        motherTongue: 0,
        certified: 0,
        state: 0,
        id: 'string',
      },
    ],
  },
  {
    seoulmate: {
      seoulmateIdx: 3,
      name: 'Heesun',
      password: 'string',
      studentId: 'string',
      profileImg: 'string',
      major: 0,
      sex: 0,
      certified: 0,
      state: 0,
      id: 'string',
    },
    buddyList: [
      {
        buddyIdx: 0,
        name: 'string',
        password: 'string',
        studentId: 'string',
        profileImg: 'string',
        major: 0,
        sex: 0,
        continent: 0,
        motherTongue: 0,
        certified: 0,
        state: 0,
        id: 'string',
      },
      {
        buddyIdx: 0,
        name: 'string',
        password: 'string',
        studentId: 'string',
        profileImg: 'string',
        major: 0,
        sex: 0,
        continent: 0,
        motherTongue: 0,
        certified: 0,
        state: 0,
        id: 'string',
      },
      {
        buddyIdx: 0,
        name: 'string',
        password: 'string',
        studentId: 'string',
        profileImg: 'string',
        major: 0,
        sex: 0,
        continent: 0,
        motherTongue: 0,
        certified: 0,
        state: 0,
        id: 'string',
      },
    ],
  },
  {
    seoulmate: {
      seoulmateIdx: 4,
      name: 'Youngjin',
      password: 'string',
      studentId: 'string',
      profileImg: 'string',
      major: 0,
      sex: 0,
      certified: 0,
      state: 0,
      id: 'string',
    },
    buddyList: [
      {
        buddyIdx: 0,
        name: 'string',
        password: 'string',
        studentId: 'string',
        profileImg: 'string',
        major: 0,
        sex: 0,
        continent: 0,
        motherTongue: 0,
        certified: 0,
        state: 0,
        id: 'string',
      },
      {
        buddyIdx: 0,
        name: 'string',
        password: 'string',
        studentId: 'string',
        profileImg: 'string',
        major: 0,
        sex: 0,
        continent: 0,
        motherTongue: 0,
        certified: 0,
        state: 0,
        id: 'string',
      },
      {
        buddyIdx: 0,
        name: 'string',
        password: 'string',
        studentId: 'string',
        profileImg: 'string',
        major: 0,
        sex: 0,
        continent: 0,
        motherTongue: 0,
        certified: 0,
        state: 0,
        id: 'string',
      },
    ],
  },
];

const MatchingList = () => {
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
      <div onClick={clickShowFull}>
        {showFull ? '전체 접기' : '전체 펼치기'}
      </div>
      {arr.map((item) => (
        <GroupList key={item.seoulmate.seoulmateIdx}>
          <MemberProfile
            name={item.seoulmate.name}
            memberRole={Role.SEOULMATE}
            onClick={() => clickSeoulMate(item.seoulmate.seoulmateIdx)}
          />
          {(showFull || selected === item.seoulmate.seoulmateIdx) && (
            <BuddyList>
              {item.buddyList.map((item) => (
                <MemberProfile
                  key={item.buddyIdx}
                  name={item.name}
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
`;

export default MatchingList;
