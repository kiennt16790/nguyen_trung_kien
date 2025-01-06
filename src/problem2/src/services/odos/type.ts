import { Hex } from 'thirdweb';

export type Token = {
  name: string;
  symbol: string;
  decimals: number;
  assetId: string;
  assetType: string;
  protocolId: string;
  isRebasing: boolean;
  address: string;
};

export type TokenWithBalance = Token & {
  balance: number;
  formattedBalance: number;
};

export type TokensResponse = {
  tokenMap: Record<string, Token>;
};

export type Balance = {
  address: string;
  balance: number;
};

export type WalletBalanceResponse = {
  balances: Balance[];
};

export type QuoteRequestParams = {
  chainId: number;
  inputTokens: [
    {
      tokenAddress: string;
      amount: string;
    },
  ];
  outputTokens: [
    {
      tokenAddress: string;
      proportion: number;
    },
  ];
  userAddr: string;
  slippageLimitPercent: number;
  disableRFQs: boolean;
  compact: boolean;
  pathVizImage?: boolean;
};

export type QuoteResponse = {
  deprecated: string;
  inTokens: string[];
  outTokens: string[];
  inAmounts: string[];
  outAmounts: string[];
  gasEstimate: number;
  dataGasEstimate: number;
  gweiPerGas: number;
  gasEstimateValue: number;
  inValues: number[];
  outValues: number[];
  netOutValue: number;
  priceImpact: number;
  percentDiff: number;
  partnerFeePercent: number;
  pathId: string;
  pathViz: object;
  pathVizImage: string;
  blockNumber: number;
  simulation: {
    success: boolean;
    simulationError: {
      type: string;
      message: string;
    };
  };
};

export type AssembleRequestParams = {
  userAddr: string;
  pathId: string;
};

export type AssembleResponse = {
  blockNumber: number;
  gasEstimate: number;
  gasEstimateValue: number;
  inputTokens: {
    tokenAddress: string;
    amount: string;
  }[];
  netOutValue: number;
  outValues: string;
  transaction: {
    chainId: number;
    gas: number;
    gasPrice: number;
    to: string;
    value: number;
    data: Hex;
    nonce: number;
  };
};
