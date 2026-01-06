import {
  getContract,
  JSONRpcProvider,
  OP_20_ABI,
} from 'opnet';

import { Configs } from './Configs';
import { Address } from '@btc-vision/transaction';

// provider
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
  ) as any;

  const name = await example.name();
  console.log('Name:', name.properties.name);

  const transferSimulation = await example.transfer(yourAddress, 10000n);

  const tx = await transferSimulation.sendTransaction({
    signer: Configs.KEYPAIR,       // ✔ correct object
    refundTo: yourAddress.toString(),
    maximumAllowedSatToSpend: 5000n,
    feeRate: 10,
    network: 'regtest' as any,
  });

  console.log('Transaction sent!', tx);
}

main().catch(console.error);
