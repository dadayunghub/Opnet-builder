import {
  getContract,
  OP_20_ABI,
  IOP20Contract,
  TransactionParameters
} from 'opnet';
import { Address } from '@btc-vision/transaction';
import { wallet } from './wallet';
import { provider, NETWORK } from './config';

async function main() {
  const yourAddress = new Address(wallet.keypair.publicKey);

  const contract = getContract<IOP20Contract>(
    'PUT_OP20_CONTRACT_ADDRESS_HERE',
    OP_20_ABI,
    provider,
    NETWORK,
    yourAddress
  );

  const balance = await contract.balanceOf(yourAddress);
  console.log('Balance:', balance.properties.balance);

  const simulation = await contract.transfer(yourAddress, 1000n);

  const txParams: TransactionParameters = {
    signer: wallet.keypair,
    refundTo: wallet.p2tr,
    maximumAllowedSatToSpend: 5000n,
    feeRate: 10,
    network: NETWORK
  };

  const tx = await simulation.sendTransaction(txParams);
  console.log('TX sent:', tx);
}

main();
