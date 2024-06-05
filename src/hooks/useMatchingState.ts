import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from 'api/Client';

const useMatchingState = () => {
  const { data: matchingState } = useQuery({
    queryKey: ['MatchingState'],
    queryFn: () => api.matchings.getState(),
  });

  const { data: matchingResult } = useQuery({
    queryKey: ['MatchingResult'],
    queryFn: () => api.matchings.getEntire(),
  });

  const { mutate: matchingStart } = useMutation({
    mutationFn: () => api.matchings.applyGaleShapley(),
    onSuccess: (data: any) => {
      console.log('success', data);
    },
  });

  const { mutate: matchingDelete } = useMutation({
    mutationFn: () => api.matchings.deleteMatching(),
    onSuccess: (data: any) => {
      console.log('success', data);
    },
  });
  return {
    isMatchingComplete: matchingState?.result?.state,
    matchingStart,
    matchingEntire: matchingResult?.result,
    matchingDelete,
  };
};

export default useMatchingState;
