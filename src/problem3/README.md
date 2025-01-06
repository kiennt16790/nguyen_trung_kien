# Task

List out the computational inefficiencies and anti-patterns found in the code block below.

1. This code block uses
   1. ReactJS with TypeScript.
   2. Functional components.
   3. React Hooks
2. You should also provide a refactored version of the code, but more points are awarded to accurately stating the issues and explaining correctly how to improve them.

# Solution

## Run the code

```bash
npm install
npm run dev
```

## Analysis

After analyzing the requirements and the code, I found that the code is not efficient and has some anti-patterns.

### 1. The interface is included in the component file, which is not a good practice.

```typescript
interface WalletBalance {
  currency: string;
  amount: number;
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}
```

- I think it is better to create a separate file for the interfaces or types and import them into the component file. It will make the code more readable and maintainable and avoid circular dependencies. [New code](https://github.com/kiennt16790/nguyen_trung_kien/blob/master/src/problem3/src/types/wallet.ts)

- I noticed that the `FormattedWalletBalance` interface has the same properties as the `WalletBalance` interface. I think it is better to extend the `FormattedWalletBalance` interface from the `WalletBalance` interface. [New code](https://github.com/kiennt16790/nguyen_trung_kien/blob/master/src/problem3/src/types/wallet.ts#L7)

- I saw that the `blockchain` property is missing in the `WalletBalance` interface which is used when sorting the balances. [New code](https://github.com/kiennt16790/nguyen_trung_kien/blob/master/src/problem3/src/types/wallet.ts#L2)

### 2. Props interface declaring no members is equivalent to its supertype

```typescript
interface Props extends BoxProps {}
```

- I saw that the `Props` interface is declaring no members but is extending the `BoxProps` interface. I think we can use the `BoxProps` interface directly instead of creating a new `Props` interface.

### 3. Implicit children prop in the `WalletPage` component

```typescript
const { children, ...rest } = props;
```

- From React 18, the `children` prop is no longer implicit. It should be explicitly defined in the component props. I don't see the `children` prop used in the component so I think it is better to remove it.

### 4. Stateless function defined in the component file, hardcoded values in FE side and any type should be avoided

```typescript
const getPriority = (blockchain: any): number => {
  switch (blockchain) {
    case 'Osmosis':
      return 100;
    case 'Ethereum':
      return 50;
    case 'Arbitrum':
      return 30;
    case 'Zilliqa':
      return 20;
    case 'Neo':
      return 20;
    default:
      return -99;
  }
};
```

- The `getPriority` function is defined inside the `WalletPage` component.I think it is better to define it in a separate file and import it into the `WalletPage` component. This will make the code more maintainable and could be reused in other components. So I created a `utils` folder and moved the `getPriority` function to the `chain.ts` file. [New code](https://github.com/kiennt16790/nguyen_trung_kien/blob/master/src/problem3/src/utils/chain.ts#L1)
- I also found that the values for the `priority` property are hardcoded in the `getPriority` function. Which is hard to maintain and change in the future. Those values should be defined in the backend side. So I created a hook to fetch the chains info with mock data. [New code](https://github.com/kiennt16790/nguyen_trung_kien/blob/master/src/problem3/src/hooks/useChain.ts#L1)

- The `getPriority` function is using the `any` type which is not a good practice. If we're not sure about the type, we should use the `unknown` type instead. I added [Chain](https://github.com/kiennt16790/nguyen_trung_kien/blob/master/src/problem3/src/types/chain.ts) type to the `chain.ts` file.

### 5. Refactor filter and sorting logic

```typescript
const sortedBalances = useMemo(() => {
  return balances
    .filter((balance: WalletBalance) => {
      const balancePriority = getPriority(balance.blockchain);
      if (lhsPriority > -99) {
        if (balance.amount <= 0) {
          return true;
        }
      }
      return false;
    })
    .sort((lhs: WalletBalance, rhs: WalletBalance) => {
      const leftPriority = getPriority(lhs.blockchain);
      const rightPriority = getPriority(rhs.blockchain);
      if (leftPriority > rightPriority) {
        return -1;
      } else if (rightPriority > leftPriority) {
        return 1;
      }
    });
}, [balances, prices]);

const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
  return {
    ...balance,
    formatted: balance.amount.toFixed(),
  };
});
```

- The current logic seems wrong, PCMIIW, I think it should filter out the balances with amount less than 0 and chain priority less than -99, but the current logic is filtering out the balances with amount larger than 0 and chain priority larger than -99.
- I also merge logic to add extra info for balances to prevent multiple loops.
  [New code](https://github.com/kiennt16790/nguyen_trung_kien/blob/master/src/problem3/src/components/WalletPage.tsx#L18)

### 6. The `WalletRow` component is using index as the `key` prop, which may cause performance issues if the list item is changed/removed. I updated the key to `${balance.blockchain}-${balance.currency}` , assuming that `currency` is unique for each blockchain

```typescript
const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
  const usdValue = prices[balance.currency] * balance.amount;
  return (
    <WalletRow
      className={classes.row}
      key={index}
      amount={balance.amount}
      usdValue={usdValue}
      formattedAmount={balance.formatted}
    />
  );
});
```
