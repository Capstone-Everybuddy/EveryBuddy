import { useQuery } from '@tanstack/react-query';
import { api } from 'api/Client';
import { User, useAuth } from 'components/AuthContext';
import useMatchingState from './useMatchingState';

const useChat = (user: User) => {
  const { isMatchingComplete } = useMatchingState();

  let roomId: number | undefined;
  if (user && isMatchingComplete) {
    const { data } = useQuery({
      queryKey: ['roomId', user.idx],
      queryFn: () =>
        api.chat.getRoomId(user.idx, user.role === 'seoulmate' ? 's' : 'b'),
    });
    roomId = data;
  }
  return { roomId };
};

export default useChat;
