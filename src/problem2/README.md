# Problem 2: Fancy Form

## Task

Create a currency swap form based on the template provided in the folder. A user would use this form to swap assets from one currency to another.

_You may use any third party plugin, library, and/or framework for this problem._

1. You may add input validation/error messages to make the form interactive.
2. Your submission will be rated on its usage intuitiveness and visual attractiveness.
3. Show us your frontend development and design skills, feel free to totally disregard the provided files for this problem.
4. You may use this [repo](https://github.com/Switcheo/token-icons/tree/main/tokens) for token images, e.g. [SVG image](https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/SWTH.svg).
5. You may use this [URL](https://interview.switcheo.com/prices.json) for token price information and to compute exchange rates (not every token has a price, those that do not can be omitted).

## Solution

After reading the task, as I have experience with some defi protocols, I decided to build an working example of a swap form. Users can connect wallet and swap their assets.

### Tech stack

- I used React, [Shadcn UI](https://ui.shadcn.com/), [TailwindCSS](https://tailwindcss.com/), react-toastify for the UI components and Vite to build the project.
- For state and data-fetching library, I use [TanStack Query](https://tanstack.com/query/v5/docs), which is popular library recently.
- For data, instead of using mock data, I fetch data from [odos.xyz API](https://www.odos.xyz/). Odos is a smart routing solution for swapping assets.
- For wallet connection, I use [thirdweb](https://thirdweb.com/), which is a popular library for wallet connection.

### How to run

- Clone the repo
- Run `npm install` to install the dependencies
- Run `npm run dev` to start the development server

### Architecture

#### 1. Folder structure

```
├── public
└── src
├── pages
│   └── swap
├── components <-- Here are common components (Forms, Tables, etc.)
│   ├── connect-wallet-button
│   ├── swap-card
│   ├── transaction-executor
│   └── ui <-- Here are Shadcn UI components
├── hooks <-- Here are custom hooks
├── services <-- Here are services ( API calls, etc.)
│   ├── odos
└── request <- axios instance
```

#### 2. Flow

1. User can connect wallet
2. User can select the token and enter the amount for swap
3. The app will fetch the quote from odos
4. User click swap button to approve the allowance for odos router and execute the swap

#### 3.Notes

- For now I config the project run on BSC mainnet only
- The odos api rate limit is 600 requests per minute, so It may reach the limit when user interact with the form too frequently
