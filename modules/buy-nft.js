
import abi from '../abis/nft.abi.json';
import getGasPrice from '../utils/get-gas';
const contractAddress = process.env.NEXT_PUBLIC_NFT_ADDRESS;

const buyNft = async ({ web3, address }) => {
  const purchaseAmount = document.querySelector('#nftAmount').value;
  const contract = await new web3.eth.Contract(abi, contractAddress);
  const gas = await getGasPrice();
  const price = await contract.methods.nftPrice().call();
  const value = Math.floor(parseInt(price, 10) * purchaseAmount);
  const gasLimit = await contract.methods.buyNFT(address, purchaseAmount).estimateGas({
    to: contractAddress,
    from: address,
    value: value.toString(),
  });
  const mpf = Math.floor(gas)
  await contract.methods.buyNFT(address, purchaseAmount).send({
    to: contractAddress,
    from: address,
    value: value.toString(),
    gas: gasLimit,
    gasPrice: mpf.toString(),
  });

};

export default buyNft;