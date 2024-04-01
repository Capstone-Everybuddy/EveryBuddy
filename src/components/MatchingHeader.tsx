import React from 'react';
import styled from 'styled-components';
import { ReactComponent as ArrowLeft } from 'assets/arrow-left.svg';
import { ReactComponent as Close } from 'assets/close.svg';
import { useNavigate } from 'react-router-dom';

interface MatchingHeaderProps {
  order: number;
}

const MatchingHeader: React.FC<MatchingHeaderProps> = ({ order }) => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <ArrowLeft style={{ cursor: 'pointer' }} />
      <Close
        style={{ cursor: 'pointer' }}
        onClick={() => navigate('/matching')}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: white;
  padding: 26px;
`;

export default MatchingHeader;
