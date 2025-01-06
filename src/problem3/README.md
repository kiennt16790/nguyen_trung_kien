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

1. The interface is included in the component file, which is not a good practice.
   - I think it is better to create a separate file for the interfaces or types and import them into the component file. It will make the code more readable and maintainable and avoid circular dependencies.
2. The `FormattedWalletBalance` interface could be extended from the `WalletBalance` interface.
   - I noticed that the `FormattedWalletBalance` interface has the same properties as the `WalletBalance` interface. I think it is better to extend the `FormattedWalletBalance` interface from the `WalletBalance` interface.
3. Missing types for the `blockchain` property in the `WalletBalance` interface.
   - I saw that the `blockchain` property is missing in the `WalletBalance` interface which is used when sorting the balances.
4. Props interface declaring no members is equivalent to its supertype

   - I saw that the `Props` interface is declaring no members but is extending the `BoxProps` interface. I think we can use the `BoxProps` interface directly instead of creating a new `Props` interface.

5. Implicit children prop in the `WalletPage` component.
   From React 18, the `children` prop is no longer implicit. It should be explicitly defined in the component props. I don't see the `children` prop used in the component so I think it is better to remove it.

6. Stateless function defined in the component file and hardcoded values in FE side.

   - The `getPriority` function is defined inside the `WalletPage` component.I think it is better to define it in a separate file and import it into the `WalletPage` component. This will make the code more maintainable and could be reused in other components. So I created a `utils` folder and moved the `getPriority` function to the `chain.ts` file.
   - I also found that the values for the `priority` property are hardcoded in the `getPriority` function. Which is hard to maintain and change in the future. Those values should be defined in the backend side. So I created a hook to fetch the chains info with mock data.

7. Any type should be avoided

   - The `getPriority` function is using the `any` type which is not a good practice. If we're not sure about the type, we should use the `unknown` type instead. I added Chain type to the `chain.ts` file.

8. The `WalletRow` component is using index as the `key` prop, which may cause performance issues if the list item is changed/removed. I updated the key to `${balance.blockchain}-${balance.currency}` , assuming that `currency` is unique for each blockchain.
