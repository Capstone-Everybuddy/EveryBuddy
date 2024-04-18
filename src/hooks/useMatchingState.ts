import { api } from 'api/Client';
import { useQuery } from '@tanstack/react-query';

/** 매칭 상태 조회 훅 */
const useMatchingState = () => {
  const { data } = useQuery({
    queryKey: ['MatchingState'],
    queryFn: () => api.matchings.getState(),
  });

  return { data };
};

export default useMatchingState;
