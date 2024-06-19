import styled from 'styled-components';

interface BlackScreenProps {
  show: boolean;
}

const BlackScreen: React.FC<BlackScreenProps> = ({ show }) => {
  return <BlackScreenStyle show={show} />;
};

const BlackScreenStyle = styled.div<{ show: boolean }>`
  transition: all 0.3s ease-in-out;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 1;
  opacity: ${(props) => (props.show ? '1' : '0')};
  pointer-events: ${(props) => (props.show ? 'auto' : 'none')};
  /* backdrop-filter: blur(8px); */
`;

export default BlackScreen;
