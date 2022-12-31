import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

import { InjectedConnector } from '@web3-react/injected-connector';
const infuraId = process.env.NEXT_PUBLIC_INFURA_ID;
const RPC_URLS = {
  1: `https://mainnet.infura.io/v3/${infuraId}`,
  137: `https://polygon-mainnet.infura.io/v3/${infuraId}`,
  80001:`https://polygon-mumbai.infura.io/v3/${infuraId}`
};

export const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 25,56, 42,97,338, 137, 80001] });

export const walletconnect = new WalletConnectConnector({
  rpc: RPC_URLS,
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  infuraId: '260bf669279d43ea8d79f329cf2fce38',
  chainId: parseInt(process.env.NEXT_PUBLIC_CHAIN_NUMBER,10),
  pollingInterval: 12000,
});
