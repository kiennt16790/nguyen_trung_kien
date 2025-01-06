import { QuoteRequestParams, QuoteResponse } from '../services/odos/type';
import { fetchQuote } from '../services/odos';
import { QUERY_KEYS } from '../constant/queryKey';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useAppState } from './useAppState';

type FetchQuoteOptions = Omit<
  UseQueryOptions<
    QuoteResponse,
    unknown,
    QuoteResponse,
    [
      QUERY_KEYS.QUOTE,
      QuoteRequestParams['userAddr'],
      QuoteRequestParams['inputTokens'],
      QuoteRequestParams['outputTokens'],
      QuoteRequestParams['slippageLimitPercent'],
    ]
  >,
  'queryKey'
>;

/**
 * @description useQuote is a hook that fetches quote data from odos api
 * @param params - QuoteRequestParams
 * @param options - FetchQuoteOptions
 * @returns QuoteResponse
 */
export const useQuote = (
  params: QuoteRequestParams,
  options?: FetchQuoteOptions,
) => {
  const { data: appState } = useAppState();

  return useQuery({
    queryKey: [
      QUERY_KEYS.QUOTE,
      params.userAddr,
      params.inputTokens,
      params.outputTokens,
      params.slippageLimitPercent,
    ],
    queryFn: async () => {
      const response = await fetchQuote(params);
      return response;
    },
    enabled:
      !!params.inputTokens[0].amount &&
      Number(params.inputTokens[0].amount) > 0 &&
      !!params.inputTokens &&
      !!params.outputTokens &&
      !appState?.isExecutingSwap,
    refetchInterval: 60000,
    staleTime: 60000,
    ...options,
  });
};
