import Header from 'components/Header';
import Layout from 'components/Layout';
import MatchingStartContainer from 'components/Matching/MatchingStart/MatchingStartContainer';
import MatchingCompleteContainer from 'components/Matching/MatchingComplete/MatchingCompleteContainer';
import Main from 'components/Main';

const Matching = () => {
  const isMatchingComplete = false;
  return (
    <Main.Wrapper>
      <Layout.PageContent>
        <Header title="Matching" />
        {isMatchingComplete ? (
          <MatchingCompleteContainer />
        ) : (
          <MatchingStartContainer />
        )}
      </Layout.PageContent>
    </Main.Wrapper>
  );
};

export default Matching;
