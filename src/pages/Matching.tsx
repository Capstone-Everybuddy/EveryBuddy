import React, { useEffect } from 'react';
import Header from 'components/Header';
import Layout from 'components/Layout';
import MatchingStartContainer from 'components/Matching/MatchingStart/MatchingStartContainer';
import MatchingCompleteContainer from 'components/Matching/MatchingComplete/MatchingCompleteContainer';
import Main from 'components/Main';
import { useAuth } from 'components/AuthContext';
import useMatchingState from 'hooks/useMatchingState';

const Matching: React.FC = () => {
  const { isMatchingComplete } = useMatchingState();
  const { user } = useAuth();
  useEffect(() => {
    if (user) {
      console.log(`User role: ${user.role}`);
      console.log(`User idx: ${user.idx}`);
      console.log(`User name: ${user.name}`);
    } else {
      console.log('No user is logged in.');
    }
  }, [user]);

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
