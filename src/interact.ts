import {
  getContract,
  IOP_20Contract,
  JSONRpcProvider,
  OP_20_ABI,
  TransactionParameters,
} from 'opnet';

import { Configs } from './Configs2';
import { NETWORK } from '@btc-vision/bitcoin';
import * as secp from '@noble/secp256k1';
import { sha256 } from '@noble/hashes/sha256';

// Provider
const provider = new JSONRpcProvider(
  'https://regtest.opnet.org',
  Configs.NETWORK
);

const yourAddress = Configs.ADDRESS;

// Manual signer (THIS replaces Wallet.keypair)
const signer = {
  publicKey: Configs.PUBLIC_KEY,
  sign: (data: Uint8Array) => {
    const hash = sha256(data);
    return secp.signSync(hash, Configs.PRIVATE_KEY);
  },
};

async function main() {
  const CONTRACT_ADDRESS =
    'bcrt1plz0svv3wl05qrrv0dx8hvh5mgqc7jf3mhqgtw8jnj3l3d3cs6lzsfc3mxh';

  const example: IOP_20Contract = getContract(
    CONTRACT_ADDRESS,
    OP_20_ABI,
    provider,
    Configs.NETWORK,
    yourAddress
  );

  const name = await example.name();
  console.log('Name:', name.properties.name);

  const transferSimulation = await example.transfer(yourAddress, 10000n);

  const txParams: TransactionParameters = {
    signer,                 // ✅ manual signer
    refundTo: yourAddress,  // ✅ no wallet.p2tr
    maximumAllowedSatToSpend: 5000n,
    feeRate: 10,
    network: Configs.NETWORK,
  };

  const tx = await transferSimulation.sendTransaction(txParams);
  console.log('Transaction created!', tx);
}

main().catch(console.error);
