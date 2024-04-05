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
        자신의 선호도를 입력하고
        <br />
        나에게 맞는 서울메이트/버디를 찾아보세요!
      </TextWrapper>
      <Button
        text="매칭 시작하기"
        onClick={() => navigate('/matching-start')}
      />
    </Container>
  );
};

const SvgWrapper = styled.div`
  margin: 60px 0 0 0;
`;

const TextWrapper = styled.div`
  font-size: 18px;
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

export default MatchingStartContainer;
