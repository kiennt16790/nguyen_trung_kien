import { WalletBalance } from '../types/wallet';

export const useWalletBalances = (): WalletBalance[] => {
  const balances: WalletBalance[] = [
    {
      amount: 100,
      blockchain: 'Ethereum',
      currency: 'ETH',
    },
    {
      amount: 1,
      blockchain: 'Ethereum',
      currency: 'WBTC',
    },
    {
      amount: 300,
      blockchain: 'Ethereum',
      currency: 'USDT',
    },
    {
      amount: 100,
      blockchain: 'Arbitrum',
      currency: 'USDC',
    },
  ];
  return balances;
};
