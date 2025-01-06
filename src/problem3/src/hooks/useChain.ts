import { Chain } from '../types/chain';

const MOCK_CHAINS: Chain[] = [
  {
    name: 'Osmosis',
    priority: 100,
  },
  {
    name: 'Ethereum',
    priority: 50,
  },
  {
    name: 'Arbitrum',
    priority: 30,
  },
  {
    name: 'Zilliqa',
    priority: 20,
  },
  {
    name: 'Neo',
    priority: 20,
  },
];

export const useChain = (): Chain[] => {
  return MOCK_CHAINS;
};
