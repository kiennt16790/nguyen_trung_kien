import { useMemo } from 'react';

import { useWalletBalances } from '../hooks/useWalletBalances';
import { FormattedWalletBalance } from '../types/wallet';
import { WalletBalance } from '../types/wallet';
import { getPriority } from '../utils/chain';
import { usePrices } from '../hooks/usePrices';
import { useChain } from '../hooks/useChain';
import { WalletRow } from './WalletRow';

type BoxProps = React.HTMLAttributes<HTMLDivElement>;

export const WalletPage: React.FC<BoxProps> = (props: BoxProps) => {
  const balances = useWalletBalances();
  const prices = usePrices();
  const chains = useChain();

  const sortedBalances = useMemo(() => {
    return (
      balances
        .filter((balance: WalletBalance) => {
          const balancePriority = getPriority(balance.blockchain, chains);
          // filter out the balances with priority less than -99 or amount less than 0
          return balancePriority > -99 && balance.amount > 0;
        })
        .map((balance: WalletBalance) => {
          // add extra info to the balance record
          const priority = getPriority(balance.blockchain, chains);
          return {
            ...balance,
            formatted: balance.amount.toFixed(),
            usdValue: prices[balance.currency] * balance.amount,
            priority,
          };
        })
        // sort by priority
        .sort((lhs: FormattedWalletBalance, rhs: FormattedWalletBalance) => rhs.priority - lhs.priority)
    );
  }, [balances, prices, chains]);

  return (
    <div {...props}>
      {sortedBalances.map((balance: FormattedWalletBalance) => (
        <WalletRow
          name={balance.currency}
          key={`${balance.blockchain}-${balance.currency}`}
          amount={balance.amount}
          usdValue={balance.usdValue}
          formattedAmount={balance.formatted}
        />
      ))}
    </div>
  );
};
