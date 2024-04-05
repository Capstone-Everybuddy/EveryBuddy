import React from 'react';
import styled from 'styled-components';
import BlackScreen from './BlackScreen';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

interface ModalProps {
  show: boolean;
}

const Modal: React.FC<ModalProps> = ({ show }) => {
  const navigate = useNavigate();
  return (
    <>
      {show && (
        <>
          <BlackScreen show={show} />
          <ModalContainer>
            <MainText>제출 완료!</MainText>
            <SubText>
              답변 감사합니다. <br />
              그룹 매칭은 0월 00일에 공지될 예정입니다.
            </SubText>
            <Button
              text="메인으로 돌아가기"
              onClick={() => navigate('/matching')}
            />
          </ModalContainer>
        </>
      )}
    </>
  );
};

const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: calc(100% - 56px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 16px;
  padding: 24px;
  z-index: 2;
`;

const MainText = styled.div`
  color: black;
  font-weight: 700;
  font-size: 24px;
  padding: 24px;
`;

const SubText = styled.div`
  color: #666666;
  font-size: 16px;
  text-align: center;
  padding-bottom: 24px;
`;
export default Modal;
