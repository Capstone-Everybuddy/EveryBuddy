import Button from 'components/Button';
import styled from 'styled-components';
import { ReactComponent as MatchingSvg } from 'assets/matching_start.svg';
import { useNavigate } from 'react-router-dom';

const MatchingStartContainer = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <SvgWrapper>
        <MatchingSvg width={300} height={300} />
      </SvgWrapper>
      <TextWrapper>
        Enter your information and preferences,
        <br />
        Find the right SeoulMate / Buddy for you!
      </TextWrapper>
      <ButtonWrapper>
        <Button
          text="Enter Preferences"
          onClick={() => navigate('/matching-info', { state: 'preference' })}
        />
        <Button
          text="Enter Information"
          onClick={() => navigate('/matching-info', { state: 'information' })}
        />
      </ButtonWrapper>
    </Container>
  );
};

const SvgWrapper = styled.div`
  margin: 60px 0 0 0;
`;

const TextWrapper = styled.div`
  font-size: 16px;
  text-align: center;
  padding: 30px 0px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  padding-bottom: 150px;

  /* 스크롤바 감추기 */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 및 Edge */

  /* Webkit 기반 브라우저(Chrome, Safari 등)에서 스크롤바 감추기 */
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export default MatchingStartContainer;
