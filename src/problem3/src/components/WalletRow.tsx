type WalletRowProps = {
  amount: number;
  usdValue?: number;
  formattedAmount: string;
  name: string;
};

export const WalletRow = (props: WalletRowProps) => {
  return (
    <div>
      <div>{props.name}</div>
      <div>${props.usdValue || 0}</div>
      <div>{props.formattedAmount}</div>
    </div>
  );
};
