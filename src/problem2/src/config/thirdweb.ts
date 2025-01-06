import { createThirdwebClient } from 'thirdweb';
import { bsc } from 'thirdweb/chains';

export const client = createThirdwebClient({
  clientId: import.meta.env.VITE_THIRDWEB_CLIENT_ID!,
});

export const chain = bsc;
