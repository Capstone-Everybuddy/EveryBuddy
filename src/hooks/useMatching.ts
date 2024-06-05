import { api } from 'api/Client';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from 'components/AuthContext';

const useMatching = () => {
  const { user } = useAuth();

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
    matchingArray: data?.result,
  };
};

export default useMatching;
