
const hexChainId = process.env.NEXT_PUBLIC_HEX_CHAIN_ID;
const rpcUrls = process.env.NEXT_PUBLIC_RPC_URL;

const switchNetwork = async (web3) => {
  try {
    await web3.currentProvider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: hexChainId }],
    });
  } catch (error) {
    console;
    try {
      await web3.currentProvider.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: web3.utils.toHex(process.env.NEXT_PUBLIC_CHAIN_NUMBER),
            chainName: process.env.NEXT_PUBLIC_CHAIN_NAME,
            rpcUrls: [rpcUrls],
            nativeCurrency: {
              name: 'BSC',
              symbol: 'BNB',
              decimals: 18,
            },
            blockExplorerUrls: [process.env.NEXT_PUBLIC_BLOCK_EXPLORER],
          },
        ],
      });
    } catch (err) {
      // alert(error.message);
    }
  }
};


  
const checkChainId = async (web3) => {
  const chainId = await web3.eth.getChainId();
  if(chainId !== process.env.NEXT_PUBLIC_CHAIN_NUMBER) {
    await switchNetwork(web3);
  }
  return;
};
  


export default checkChainId;