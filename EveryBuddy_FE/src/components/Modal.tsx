import React from 'react';
import styled from 'styled-components';
import BlackScreen from './BlackScreen';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

interface ModalProps {
  show: boolean;
  submitCompleted: () => void;
}

const Modal: React.FC<ModalProps> = ({ show, submitCompleted }) => {
  const navigate = useNavigate();
  return (
    <>
      {show && (
        <>
          <BlackScreen show={show} />
          <ModalContainer>
            <MainText>Submission Complete!</MainText>
            <SubText>
              Thank you for your response. <br />
              The results will be automatically displayed once the matching is
              complete.
            </SubText>
            <Button
              text="Return to Main"
              onClick={() => {
                submitCompleted();
                navigate('/matching');
              }}
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
  text-align: center;
`;

const SubText = styled.div`
  color: #666666;
  font-size: 16px;
  text-align: center;
  padding-bottom: 24px;
`;

export default Modal;
