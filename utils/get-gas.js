const Web3 = require('web3');

const historicalBlocks = 4;

function formatFeeHistory(result, includePending) {
  try {
    let blockNum = Number(result.oldestBlock);
    console.log(blockNum, result.oldestBlock);
    let index = 0;
    const blocks = [];
    while (blockNum < Number(result.oldestBlock) + historicalBlocks) {
      blocks.push({
        number: blockNum,
        baseFeePerGas: Number(result.baseFeePerGas[index]),
        gasUsedRatio: Number(result.gasUsedRatio[index]),
        priorityFeePerGas: result.reward[index].map(x => Number(x)),
      });
      blockNum += 1;
      index += 1;
    }
    if (includePending) {
      blocks.push({
        number: 'pending',
        baseFeePerGas: Number(result.baseFeePerGas[historicalBlocks]),
        gasUsedRatio: NaN,
        priorityFeePerGas: [],
      });
    }
    console.log(blocks);
    return blocks;
  } catch (err) {
    console.log(err);
  }
}

const getGasPrice = async () => {
  const web3 = new Web3(process.env.NEXT_PUBLIC_RPC_URL);
  const feeHistory = await web3.eth.getFeeHistory(historicalBlocks, 'pending', [25, 50, 75]);
  const blocks = formatFeeHistory(feeHistory, false);
  const firstPercentialPriorityFees = blocks.map(b => b.priorityFeePerGas[2]);
  const sum = firstPercentialPriorityFees.reduce((a, v) => a + v);
  const priorityFeePerGasEstimate = Math.round(sum/firstPercentialPriorityFees.length);
  const block = await web3.eth.getBlock('pending');
  const maxFeePerGasEstimate = Number(block.baseFeePerGas) + priorityFeePerGasEstimate;
  return maxFeePerGasEstimate;
};

export default getGasPrice;

