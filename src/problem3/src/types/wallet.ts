export interface WalletBalance {
  blockchain: string;
  currency: string;
  amount: number;
}

export interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
  usdValue?: number;
  priority: number;
}
