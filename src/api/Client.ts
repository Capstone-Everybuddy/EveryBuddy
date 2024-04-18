import { QueryClient } from '@tanstack/react-query';
import { Api } from './Api';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      retryDelay: 1000,
    },
  },
});

export const api = new Api({
  baseURL: `${process.env.REACT_APP_API_HOST}`,
});
