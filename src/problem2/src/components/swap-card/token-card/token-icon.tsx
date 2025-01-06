import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getTokenImageUrl } from '@/lib/utils';

export const TokenIcon = ({ symbol }: { symbol: string }) => {
  return (
    <Avatar className="w-8 h-8">
      <AvatarImage src={getTokenImageUrl(symbol)} className="rounded-full" />

      <AvatarFallback>
        <div className="text-xs bg-slate-500 rounded-full flex items-center justify-center text-center w-full h-full">
          {symbol.slice(0, 2)}
        </div>
      </AvatarFallback>
    </Avatar>
  );
};
