import React from 'react';
import styled from 'styled-components';
import { Role } from 'data/matching';

interface MemberProfileProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  memberRole: Role;
}
const MemberProfile: React.FC<MemberProfileProps> = ({
  name,
  memberRole,
  ...rest
}) => {
  return (
    <Wrapper onClick={rest.onClick}>
      <Name memberRole={memberRole}>{name}</Name>
      <div>{memberRole === Role.SEOULMATE ? 'SeoulMate' : 'Buddy'}</div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 30px 20px;
  border: 1px solid ${(props) => props.theme.colors.gray};
  border-radius: 10px;
`;

const Name = styled.div<{ memberRole: Role }>`
  font-size: 16px;
  font-weight: 700;
  color: ${(props) =>
    props.memberRole === Role.SEOULMATE && props.theme.colors.orange};
`;
export default MemberProfile;
