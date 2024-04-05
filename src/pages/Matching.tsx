import Header from 'components/Header';
import Layout from 'components/Layout';
import MatchingStartContainer from 'components/Matching/MatchingStart/MatchingStartContainer';
import MatchingCompleteContainer from 'components/Matching/MatchingComplete/MatchingCompleteContainer';

const Matching = () => {
  const isMatchingComplete = false;
  return (
    <Layout.PageContent>
      <Header title="Matching" />
      {isMatchingComplete ? (
        <MatchingCompleteContainer />
      ) : (
        <MatchingStartContainer />
      )}
    </Layout.PageContent>
  );
};

export default Matching;
