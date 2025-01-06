import { Price } from '../types/prices';

export const usePrices = (): Price => {
  const prices: Price = {
    WBTC: 100000,
    ETH: 4000,
    USDT: 1,
  };
  return prices;
};
