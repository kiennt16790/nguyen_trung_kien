import { QUERY_KEYS } from '@/constant/queryKey';
import { useQuery, useQueryClient } from '@tanstack/react-query';

type AppState = {
  // indicate the swap dialog is open to prevent prefetching the quote
  isExecutingSwap: boolean;
};

export const useAppState = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.APP_STATE],
    queryFn: () => {
      return {
        isExecutingSwap: false,
      };
    },
    staleTime: Infinity,
  });
};

export const useSetAppState = () => {
  const queryClient = useQueryClient();

  return (state: AppState) => {
    const previousState = queryClient.getQueryData<AppState>([
      QUERY_KEYS.APP_STATE,
    ]);
    queryClient.setQueryData([QUERY_KEYS.APP_STATE], {
      ...previousState,
      ...state,
    });
  };
};
