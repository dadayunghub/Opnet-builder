import {
  getContract,
  JSONRpcProvider,
  OP_20_ABI,
} from 'opnet';

import { Configs } from './Configs.js';
import { MinimalOP20 } from './MinimalOP20.js';

// provider (string network)
const provider = new JSONRpcProvider(
  'https://regtest.opnet.org',
  'regtest' as any
);

const yourAddress = Configs.ADDRESS;

async function main() {
  const CONTRACT_ADDRESS =
    'bcrt1plz0svv3wl05qrrv0dx8hvh5mgqc7jf3mhqgtw8jnj3l3d3cs6lzsfc3mxh';

  const example = getContract(
    CONTRACT_ADDRESS,
    OP_20_ABI,
    provider,
    'regtest' as any,
    yourAddress
  ) as unknown as MinimalOP20;

  // Read data
  const name = await example.name();
  console.log('Name:', name.properties.name);

  // Transfer
  const transferSimulation = await example.transfer(yourAddress, 10000n);

  const tx = await transferSimulation.sendTransaction({
    signer: Configs.SIGNER,
    refundTo: yourAddress.toString(),
    maximumAllowedSatToSpend: 5000n,
    feeRate: 10,
    network: 'regtest' as any,
  });

  console.log('Transaction sent:', tx);
}

main().catch(console.error);
