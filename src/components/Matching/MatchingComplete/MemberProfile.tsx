import React from 'react';
import styled from 'styled-components';
import { Role } from 'data/matching';

interface MemberProfileProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  memberRole: Role;
  studentId: string; // 추가된 학번 속성
}

const MemberProfile: React.FC<MemberProfileProps> = ({
  name,
  memberRole,
  studentId, // 추가된 학번 속성
  ...rest
}) => {
  return (
    <Wrapper onClick={rest.onClick}>
      <div>
        <Name>{name}</Name>
        <StudentId>{studentId}</StudentId>
      </div>

      <RoleDiv memberRole={memberRole}>
        {memberRole === Role.SEOULMATE ? 'SeoulMate' : 'Buddy'}
      </RoleDiv>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 20px;
  border: 1px solid ${(props) => props.theme.colors.gray};
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
    transform: translateY(-1px);
  }

  cursor: pointer;
`;

const Name = styled.div`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 10px;
`;

const StudentId = styled.div`
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 10px;
`;

const RoleDiv = styled.div<{ memberRole: Role }>`
  font-size: 10px;
  font-weight: 700;
  border-radius: 5px;
  padding: 6px;
  color: white;
  background-color: ${(props) =>
    props.memberRole === Role.SEOULMATE
      ? props.theme.colors.orange
      : props.theme.colors.green};
`;

export default MemberProfile;
