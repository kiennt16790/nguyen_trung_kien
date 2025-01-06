import { useMemo } from 'react';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchTokens } from '../services/odos';
import { QUERY_KEYS } from '../constant/queryKey';
import { Token } from '../services/odos/type';
import { useBalances } from './useBalances';
import { toFormattedBalance } from '@/lib/balance';

type FetchTokensOptions = Omit<
  UseQueryOptions<Token[], unknown, Token[], [QUERY_KEYS.TOKENS]>,
  'queryKey'
>;

/**
 * @description useTokens is a hook that fetches supported tokens from odos api
 * @param options - FetchTokensOptions
 * @returns Token[]
 */
export const useTokens = (options?: FetchTokensOptions) => {
  return useQuery({
    queryKey: [QUERY_KEYS.TOKENS],
    queryFn: async () => {
      const response = await fetchTokens();
      return Object.entries(response.tokenMap).map(([key, value]) => ({
        ...value,
        address: key,
      }));
    },
    ...options,
  });
};

/**
 * @description useTokenWithBalance is a hook that merges tokens and balances data
 * @param address - user address
 * @returns { tokens: Token[], isLoading: boolean, refetch: () => void }
 */
export const useTokenWithBalance = (address: string) => {
  const {
    data: tokens,
    isLoading: isLoadingTokens,
    refetch: refetchTokens,
  } = useTokens();
  const {
    data: balances,
    isLoading: isLoadingBalances,
    refetch: refetchBalances,
  } = useBalances(address);

  const sortedTokens = useMemo(() => {
    return tokens
      ?.map((token) => {
        const balance = balances?.[token.address] ?? 0;

        return {
          ...token,
          balance,
          formattedBalance: toFormattedBalance(
            balance.toString(),
            token.decimals,
          ),
        };
      })
      .sort((a, b) => b.balance - a.balance);
  }, [tokens, balances]);

  const refetch = () => {
    refetchTokens();
    refetchBalances();
  };

  return {
    tokens: sortedTokens,
    isLoading: isLoadingTokens || isLoadingBalances,
    refetch,
  };
};
