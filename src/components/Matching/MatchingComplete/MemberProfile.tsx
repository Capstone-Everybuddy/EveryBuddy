import React from 'react';
import styled from 'styled-components';

interface MemberProfileProps {
  name: string;
}
const MemberProfile: React.FC<MemberProfileProps> = ({ name }) => {
  return (
    <Wrapper>
      <Name>{name}</Name>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 30px 20px;
  border: 1px solid ${(props) => props.theme.colors.gray};
  border-radius: 10px;
`;

const Name = styled.div`
  font-size: 16px;
  font-weight: 700;
`;
export default MemberProfile;
