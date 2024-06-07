import React from 'react';
import styled from 'styled-components';
import MemberProfile from './MemberProfile';
import { Role } from 'data/matching';
import useMatching from 'hooks/useMatching';
import { matchingInfo } from '../../../data/matching';

const MatchingCompleteContainer = () => {
  const { matchingArray } = useMatching();

  return (
    <Container>
      <MainText>매칭 정보 확인하기</MainText>
      <SubText>나와 매칭된 사람들의 정보를 확인해보세요</SubText>
      <MemberList>
        {matchingArray.length > 0 && (
          <MemberProfile
            name={matchingArray[0].seoulmateName!}
            studentId={matchingArray[0].seoulmateStudentId!}
            sex={matchingInfo.sex[matchingArray[0].seoulmateSex!]}
            major={matchingInfo.major[matchingArray[0].seoulmateMajor!]}
            memberRole={Role.SEOULMATE}
          />
        )}
        {matchingArray?.map((item) => (
          <MemberProfile
            key={item.buddyStudentId!}
            name={item.buddyName!}
            studentId={item.buddyStudentId!}
            sex={matchingInfo.sex[item.buddySex!]}
            major={matchingInfo.major[item.buddyMajor!]}
            memberRole={Role.BUDDY}
            continent={matchingInfo.continent[item.buddyContinent!]}
          />
        ))}
      </MemberList>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding-bottom: 150px;
`;

const MainText = styled.div`
  color: black;
  font-size: 24px;
  font-weight: 700;
  margin: 40px 0 20px 0;
`;

const SubText = styled.div`
  color: ${(props) => props.theme.colors.gray};
  font-size: 16px;
  text-align: left;
  margin-bottom: 20px;
`;

const MemberList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export default MatchingCompleteContainer;
