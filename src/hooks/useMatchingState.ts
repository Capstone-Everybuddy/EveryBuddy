import { useQuery } from '@tanstack/react-query';
import { api } from 'api/Client';

const useMatchingState = () => {
  const { data: matchingState } = useQuery({
    queryKey: ['MatchingState'],
    queryFn: () => api.matchings.getState(),
  });
  return { isMatchingComplete: matchingState?.result?.state };
};

export default useMatchingState;
