import { useState, useMemo } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { TokenWithBalance } from '../../../services/odos/type';
import { TokenIcon } from './token-icon';

type Props = {
  tokens: TokenWithBalance[];
  selectedToken?: TokenWithBalance;
  onSelect: (token: TokenWithBalance) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const TokenSelect = ({
  tokens,
  onSelect,
  open,
  onOpenChange,
}: Props) => {
  const [search, setSearch] = useState('');

  const filteredTokens = useMemo(() => {
    if (!search) return tokens;

    return tokens.filter((token) =>
      token.symbol.toLowerCase().includes(search.toLowerCase()),
    );
  }, [tokens, search]);

  const onSelectToken = (token: TokenWithBalance) => {
    onSelect(token);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Token</DialogTitle>
        </DialogHeader>
        <div>
          <Input
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div>
            <div className="text-sm mt-4">Tokens</div>
            <div className="flex flex-col gap-2 overflow-y-auto h-[400px] mt-4">
              {filteredTokens.map((token) => (
                <div
                  key={token.address}
                  className="flex justify-between cursor-pointer hover:bg-gray-800 p-2 px-4 rounded-md"
                  onClick={() => onSelectToken(token)}
                >
                  <div className="flex items-center gap-2">
                    <TokenIcon symbol={token.symbol} />
                    <div className="flex flex-col">
                      <div>{token.symbol}</div>
                      <div className="text-xs text-slate-500">{token.name}</div>
                    </div>
                  </div>
                  <div>{token.formattedBalance}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
