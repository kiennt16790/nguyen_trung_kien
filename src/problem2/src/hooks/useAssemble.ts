import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchAssemble } from '../services/odos';
import { QUERY_KEYS } from '../constant/queryKey';
import { AssembleRequestParams, AssembleResponse } from '@/services/odos/type';

type FetchAssembleOptions = Omit<
  UseQueryOptions<
    AssembleResponse,
    unknown,
    AssembleResponse,
    [QUERY_KEYS.ASSEMBLE, string, string]
  >,
  'queryKey'
>;

/**
 * @description useAssemble is a hook that fetches assemble data from odos api
 * @param params - AssembleRequestParams
 * @param options - FetchAssembleOptions
 * @returns AssembleResponse
 */
export const useAssemble = (
  params: AssembleRequestParams,
  options?: FetchAssembleOptions,
) => {
  return useQuery({
    queryKey: [QUERY_KEYS.ASSEMBLE, params.userAddr, params.pathId],
    queryFn: async () => {
      const response = await fetchAssemble(params);
      return response;
    },
    enabled: !!params.userAddr && !!params.pathId,
    ...options,
  });
};
