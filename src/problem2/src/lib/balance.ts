import { toTokens, formatNumber, toUnits } from 'thirdweb/utils';

export const toFormattedBalance = (
  balance: string,
  decimals: number,
): number => {
  return formatNumber(Number(toTokens(BigInt(balance), decimals)), 4);
};

export const toFormattedUsdValue = (value: number): string => {
  return Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

export const toTokenUnits = (value: string, decimals: number): bigint => {
  return toUnits(value, decimals);
};
