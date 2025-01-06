import { CHAIN_ID } from '@/constant/chain';

export const DEFAULT_QUOTE_CONFIG = {
  chainId: CHAIN_ID,
  disableRFQs: true,
  compact: true,
  pathVizImage: true,
  pathVizImageConfig: {
    linkColors: ['#B386FF', '#FBA499', '#F9EC66', '#F199EE'],
    nodeColor: '#422D4C',
    nodeTextColor: '#D9D5DB',
    legendTextColor: '#FCE6FB',
    height: 300,
  },
  userAddr: '0xdEADBEeF00000000000000000000000000000000',
};

export enum TransactionStatus {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export const MAX_INT256 = 2n ** (256n - 1n) - 1n;
