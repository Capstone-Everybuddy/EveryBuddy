import React from 'react';
import styled from 'styled-components';
import { FaUserAlt } from 'react-icons/fa';
import { FaEarthAmericas } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

interface TypeButtonProps {
  type: 'MATE' | 'BUDDY';
  description: string;
  onClick: () => void;
}

const TypeButton: React.FC<TypeButtonProps> = ({ type, description }) => {
  return (
    <ButtonWrapper type={type}>
      <TextContainer>
        <ButtonText type={type}>{description}</ButtonText>
        <Description type={type}>
          {type === 'MATE'
            ? 'A foreign exchange student coming to the University of Seoul as a dispatched exchange student'
            : 'A current student who helps the buddy adapt to school life'}
        </Description>
      </TextContainer>
      <IconWrapper type={type}>
        {type === 'MATE' ? (
          <FaEarthAmericas size="80px" />
        ) : (
          <FaUserAlt size="80px" />
        )}
      </IconWrapper>
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled.button<{ type: string }>`
  width: 100%;
  background: 
    ${(props) =>
      props.type === 'MATE'
        ? 'linear-gradient(100deg, rgba(173,217,116,1) 0%, rgba(250,253,246,1) 110%)'
        : 'linear-gradient(100deg, rgba(255,199,0,1) 0%, rgba(255,233,154,1) 100%)'};
  );
  border-radius: 25px;
  height: 200px;
  font-size: 30px;
  font-weight: 700;
  color: white;      
  border: none;
  cursor: pointer;
  margin-bottom: 40px;
  display: flex;
  justify-content: center;
  box-shadow: 5px 5px 6px 0px rgba(0, 0, 0, 0.045);
  align-items: center;
  padding: 26px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const IconWrapper = styled.span<{ type: string }>`
  margin-left: 40px;
  color: white;
`;

const ButtonText = styled.span<{ type: string }>`
  color: white;
`;

const Description = styled.p<{ type: string }>`
  color: white;
  text-align: left;
  font-weight: 600;
  padding-top: 10px;
  line-height: 1.4;
`;

export default TypeButton;
