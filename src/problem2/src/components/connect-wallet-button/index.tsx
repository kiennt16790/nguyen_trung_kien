import { ConnectButton as ThirdwebConnectButton } from 'thirdweb/react';
import { client } from '@/config/thirdweb';
import { bsc } from 'thirdweb/chains';
import { createWallet } from 'thirdweb/wallets';

export const ConnectWalletButton = () => {
  return (
    <ThirdwebConnectButton
      client={client}
      chain={bsc}
      wallets={[
        createWallet('io.metamask'),
        createWallet('com.coinbase.wallet'),
        createWallet('me.rainbow'),
        createWallet('io.rabby'),
      ]}
    />
  );
};
