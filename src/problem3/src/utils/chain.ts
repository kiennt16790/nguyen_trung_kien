import { Chain } from '../types/chain';

export const getPriority = (blockchain: string, chains: Chain[]): number => {
  const chain = chains.find((chain) => chain.name === blockchain);
  return chain ? chain.priority : -99;
};
