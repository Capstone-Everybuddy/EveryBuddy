import Header from 'components/Header';
import React from 'react';
import styled from 'styled-components';
import { ReactComponent as MatchingSvg } from 'assets/matching_start.svg';
import Button from 'components/Button';
import { useNavigate } from 'react-router-dom';
import Layout from 'components/Layout';

const Matching = () => {
  const navigate = useNavigate();
  return (
    <Layout.PageContent>
      <Header title="Matching" />
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
    </Layout.PageContent>
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

export default Matching;
