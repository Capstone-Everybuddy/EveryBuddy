import React from 'react';
import styled from 'styled-components';
import { ReactComponent as ArrowLeft } from 'assets/arrow-left.svg';
import { ReactComponent as Close } from 'assets/close.svg';
import { useNavigate } from 'react-router-dom';

interface MatchingHeaderProps {
  order: number;
  handleOrder: () => void;
}

const MatchingHeader: React.FC<MatchingHeaderProps> = ({
  order,
  handleOrder,
}) => {
  const navigate = useNavigate();

  const handleArrowClick = () => {
    if (order === 1) {
      navigate('/matching');
    } else {
      handleOrder(); // order가 1이 아닐 때 handleOrder를 실행
    }
  };
  return (
    <Wrapper>
      <ArrowLeft style={{ cursor: 'pointer' }} onClick={handleArrowClick} />
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
