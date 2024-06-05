import { api } from 'api/Client';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from 'components/AuthContext';

/** 매칭 상태 조회 훅 */
const useMatching = () => {
  const { user } = useAuth();
  const { data: matchingState } = useQuery({
    queryKey: ['MatchingState'],
    queryFn: () => api.matchings.getState(),
  });

  let data;

  if (user?.role === 'seoulmate') {
    const { data: seoulmateData } = useQuery({
      queryKey: ['matchingSeoulmate', user?.idx],
      queryFn: () => api.matchings.getMatchings(user?.idx),
    });
    data = seoulmateData;
  } else if (user?.role === 'buddy') {
    const { data: buddyData } = useQuery({
      queryKey: ['matchingBuddy', user?.idx],
      queryFn: () => api.matchings.getMatching(user?.idx),
    });
    data = buddyData;
  }

  return {
    isMatchingComplete: matchingState?.result?.state,
    matchingArray: data?.result,
  };
};

export default useMatching;
