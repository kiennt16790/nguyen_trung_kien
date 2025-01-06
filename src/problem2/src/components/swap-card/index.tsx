import { useState, useEffect, useMemo } from 'react';
import { ArrowUpDown, RotateCw } from 'lucide-react';
import { useActiveAccount } from 'thirdweb/react';
import { TokenWithBalance } from '@/services/odos/type';
import { ConnectWalletButton } from '@/components/connect-wallet-button';
import { useQuote } from '@/hooks/useQuote';
import { TokenType } from '@/constant/token';
import { DEFAULT_QUOTE_CONFIG } from '@/constant/quote';
import { useTokenWithBalance } from '../../hooks/useTokens';
import { TokenCard } from './token-card/token-card';
import { SlippageSetting } from './slippage-setting';
import { Skeleton } from '../ui/skeleton';
import { Button } from '../ui/button';
import { TransactionExecution } from '../transaction-execution';
import { twMerge } from 'tailwind-merge';
import { useAppState, useSetAppState } from '@/hooks/useAppState';
const DEFAULT_SLIPPAGE = 0.5;
const DEFAULT_TOKEN_FROM_VALUE = BigInt(1 * 10 ** 18);

export const SwapCard = () => {
  const account = useActiveAccount();

  const [fromToken, setFromToken] = useState<TokenWithBalance | undefined>();
  const [toToken, setToToken] = useState<TokenWithBalance | undefined>();
  const [slippage, setSlippage] = useState(DEFAULT_SLIPPAGE);
  const [tokenFromValue, setTokenFromValue] = useState<bigint>(
    DEFAULT_TOKEN_FROM_VALUE,
  );

  const { data: appState } = useAppState();

  const setAppState = useSetAppState();

  const { tokens, isLoading: isTokenLoading } = useTokenWithBalance(
    account?.address ?? '',
  );

  const {
    data: quote,
    isLoading: isQuoteLoading,
    isFetching: isQuoteFetching,
    refetch: refetchQuote,
  } = useQuote({
    ...DEFAULT_QUOTE_CONFIG,
    userAddr: account?.address ?? DEFAULT_QUOTE_CONFIG.userAddr,
    inputTokens: [
      {
        tokenAddress: fromToken?.address ?? '',
        amount: tokenFromValue.toString(),
      },
    ],
    outputTokens: [{ tokenAddress: toToken?.address ?? '', proportion: 1 }],
    slippageLimitPercent: slippage,
  });

  const isLoadingQuote = isQuoteLoading || isQuoteFetching;

  // get token info with latest balance
  const latestTokenInInfo = useMemo(
    () => tokens?.find((token) => token.address === fromToken?.address),
    [tokens, fromToken],
  );
  const latestTokenOutInfo = useMemo(
    () => tokens?.find((token) => token.address === toToken?.address),
    [tokens, toToken],
  );

  const tokenInError = useMemo(() => {
    // do not show error when user not connect wallet
    if (!account?.address) {
      return '';
    }
    // show error when user input amount is greater than the balance
    return (latestTokenInInfo?.balance ?? 0) < Number(tokenFromValue)
      ? 'Insufficient balance'
      : '';
  }, [latestTokenInInfo, tokenFromValue, account?.address]);

  useEffect(() => {
    // set default token when user not select any token
    if (tokens && !fromToken && !toToken) {
      setFromToken(tokens[0]);
      setToToken(tokens[1]);
    }
  }, [tokens, fromToken, toToken]);

  const onReverse = () => {
    // swap from token and to token
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
  };

  const onSwap = () => {
    setAppState({ isExecutingSwap: true });
  };

  return (
    <>
      <div className="rounded-xl p-8 w-full md:w-2/3 lg:w-2/5 mx-2 bg-swap-card bg-cover bg-center bg-no-repeat">
        <div className="flex justify-between items-center">
          <div className="text-white text-2xl">Simple Swap</div>
          <div className="flex items-center gap-2">
            <div className="cursor-pointer hover:bg-gray-600 rounded-full p-2">
              <RotateCw
                className={twMerge(isLoadingQuote && 'animate-spin')}
                onClick={() => {
                  refetchQuote();
                }}
              />
            </div>
            <SlippageSetting
              slippage={slippage}
              onSlippageChange={setSlippage}
            />
          </div>
        </div>
        <div className="flex flex-col relative">
          <TokenCard
            tokenType={TokenType.FROM}
            tokens={tokens ?? []}
            selectedToken={latestTokenInInfo}
            swapToken={toToken}
            onSelect={setFromToken}
            isLoading={isTokenLoading}
            tokenValue={tokenFromValue.toString()}
            setTokenValue={setTokenFromValue}
            usdValue={quote?.inValues[0] ?? 0}
            isQuoteLoading={isLoadingQuote}
            error={tokenInError}
          />
          <div className="absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 p-2 bg-slate-800 rounded-full mt-2">
            <div
              className="bg-slate-700 rounded-full p-2 cursor-pointer"
              onClick={onReverse}
            >
              <ArrowUpDown className="transition-transform duration-300 hover:-rotate-180" />
            </div>
          </div>
          <TokenCard
            tokenType={TokenType.TO}
            tokens={tokens ?? []}
            selectedToken={latestTokenOutInfo}
            swapToken={fromToken}
            onSelect={setToToken}
            isLoading={isTokenLoading}
            tokenValue={quote?.outAmounts[0] ?? '0'}
            usdValue={quote?.outValues[0] ?? 0}
            isQuoteLoading={isLoadingQuote}
          />
        </div>
        <div className="mt-4 h-[100px] md:h-[200px]">
          <div className="text-white text-xl">Order Routing</div>
          {quote?.pathVizImage && !isLoadingQuote && (
            <img src={quote?.pathVizImage} alt="path-viz" />
          )}
          {isLoadingQuote && (
            <Skeleton className="w-full h-[80px] md:h-[160px]" />
          )}
          {!isLoadingQuote && !quote?.pathVizImage && (
            <div className="italic text-yellow-500 text-center mt-6">
              No route found
            </div>
          )}
        </div>
        {account?.address ? (
          <Button
            className="mt-4 w-full h-10 font-bold"
            variant="gradient"
            onClick={onSwap}
            disabled={isLoadingQuote || !!tokenInError}
          >
            Swap
          </Button>
        ) : (
          <div className="mt-4 w-full h-10 font-bold [&>button]:w-full [&>button]:h-full [&>button]:font-bold">
            <ConnectWalletButton />
          </div>
        )}
      </div>
      {quote?.pathId && appState?.isExecutingSwap && (
        <TransactionExecution
          pathId={quote.pathId}
          tokenIn={fromToken}
          tokenOut={toToken}
          open={appState?.isExecutingSwap ?? false}
          onOpenChange={(open) => setAppState({ isExecutingSwap: open })}
        />
      )}
    </>
  );
};
