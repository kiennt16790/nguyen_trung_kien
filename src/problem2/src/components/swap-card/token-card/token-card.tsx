import { TokenWithBalance } from '@/services/odos/type';
import { TokenSelect } from './token-select';
import { Skeleton } from '../../ui/skeleton';
import { TokenIcon } from './token-icon';
import { useState } from 'react';
import {
  toFormattedBalance,
  toFormattedUsdValue,
  toTokenUnits,
} from '@/lib/balance';
import { TokenType } from '@/constant/token';
import { Input } from '../../ui/input';

type Props = {
  tokens: TokenWithBalance[];
  selectedToken?: TokenWithBalance;
  swapToken?: TokenWithBalance;
  onSelect: (token: TokenWithBalance) => void;
  isLoading: boolean;
  tokenValue: string;
  setTokenValue?: (value: bigint) => void;
  tokenType: TokenType;
  usdValue: number;
  isQuoteLoading: boolean;
  error?: string;
};

export const TokenCard = ({
  tokens,
  selectedToken,
  swapToken,
  onSelect,
  isLoading,
  tokenValue,
  setTokenValue,
  tokenType,
  usdValue,
  isQuoteLoading,
  error,
}: Props) => {
  const [openTokenSelect, setOpenTokenSelect] = useState(false);

  const onMaxClick = () => {
    if (!selectedToken) return;
    setTokenValue?.(BigInt(selectedToken.balance));
  };

  return (
    <div className="flex flex-col justify-between mt-4 rounded-lg p-8 gap-4 text-zinc-300 border border-cyan-200 border-opacity-30">
      <div className="flex justify-between items-center">
        {tokenType === TokenType.FROM ? (
          <div>
            <Input
              className="border-none text-xl md:text-xl -ml-4"
              value={toFormattedBalance(
                tokenValue,
                selectedToken?.decimals ?? 0,
              )}
              onChange={(e) =>
                setTokenValue?.(
                  toTokenUnits(e.target.value, selectedToken?.decimals ?? 0),
                )
              }
            />
            {error && (
              <div className="text-red-500 text-sm mt-2 -ml-2">{error}</div>
            )}
          </div>
        ) : isQuoteLoading ? (
          <Skeleton className="w-16 h-4" />
        ) : (
          <div className="text-xl">
            {toFormattedBalance(tokenValue, selectedToken?.decimals ?? 0)}
          </div>
        )}
        <div
          className="flex items-center gap-2 cursor-pointer bg-gray-500 rounded-full py-2 px-4 hover:bg-gray-600"
          onClick={() => setOpenTokenSelect(true)}
        >
          {isLoading ? (
            <>
              <Skeleton className="w-8 h-8" />
              <Skeleton className="w-16 h-4" />
            </>
          ) : (
            <>
              <TokenIcon symbol={selectedToken?.symbol ?? ''} />
              <div className="text-white">{selectedToken?.symbol}</div>
            </>
          )}
        </div>
        <TokenSelect
          tokens={
            tokens?.filter(
              (token) =>
                token.symbol !== selectedToken?.symbol &&
                token.symbol !== swapToken?.symbol,
            ) ?? []
          }
          selectedToken={selectedToken}
          onSelect={onSelect}
          open={openTokenSelect}
          onOpenChange={setOpenTokenSelect}
        />
      </div>
      <div className="flex justify-between items-center text-sm">
        <div>
          {isQuoteLoading ? (
            <Skeleton className="w-16 h-4" />
          ) : (
            `≈${toFormattedUsdValue(usdValue)}`
          )}
        </div>
        <div>
          Balance: {selectedToken?.formattedBalance ?? 0}{' '}
          {selectedToken?.symbol}{' '}
          {tokenType === TokenType.FROM ? (
            <span
              className="text-xs text-white bg-gray-500 rounded-full px-2 py-1 cursor-pointer ml-1"
              onClick={onMaxClick}
            >
              Max
            </span>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
};
