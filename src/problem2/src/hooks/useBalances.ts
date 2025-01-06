import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchWalletBalance } from '../services/odos';
import { QUERY_KEYS } from '../constant/queryKey';

type FetchBalancesOptions = Omit<
  UseQueryOptions<
    Record<string, number>,
    unknown,
    Record<string, number>,
    [QUERY_KEYS.BALANCES, string]
  >,
  'queryKey'
>;

/**
 * @description useBalances is a hook that fetches balances from odos api
 * @param address - user address
 * @param options - FetchBalancesOptions
 * @returns Record<string, number>
 */
export const useBalances = (
  address: string,
  options?: FetchBalancesOptions,
) => {
  return useQuery({
    queryKey: [QUERY_KEYS.BALANCES, address],
    queryFn: async () => {
      const response = await fetchWalletBalance(address);
      return response.reduce<Record<string, number>>((acc, curr) => {
        acc[curr.address] = curr.balance;
        return acc;
      }, {});
    },
    enabled: !!address,
    ...options,
  });
};
