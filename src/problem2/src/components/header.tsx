import { ConnectWalletButton } from '@/components/connect-wallet-button';

export const Header = () => {
  return (
    <div className="w-full flex justify-between items-center h-28 px-10">
      <h1 className="text-2xl font-bold">KSwap</h1>
      <div className="flex justify-end">
        <ConnectWalletButton />
      </div>
    </div>
  );
};
