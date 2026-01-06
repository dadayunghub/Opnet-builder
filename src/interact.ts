// src/interact.ts
import { getContract, JSONRpcProvider, OP_20_ABI } from 'opnet';
import { Configs } from './Configs';
import { Address } from '@btc-vision/transaction';

// RPC provider
const provider = new JSONRpcProvider('https://regtest.opnet.org', 'regtest' as any);

// Contract address
const CONTRACT_ADDRESS =
  'bcrt1plz0svv3wl05qrrv0dx8hvh5mgqc7jf3mhqgtw8jnj3l3d3cs6lzsfc3mxh';

// Minimal OP20 interface
interface MinimalOP20 {
  transfer(to: string | Address, amount: bigint): Promise<any>;
  balanceOf(address: string | Address): Promise<any>;
  name(): Promise<any>;
  symbol(): Promise<any>;
  totalSupply(): Promise<any>;
  decimals(): Promise<any>;
}

// Get contract instance
const example = getContract(
  CONTRACT_ADDRESS,
  OP_20_ABI,
  provider,
  'regtest' as any,
  Configs.ADDRESS
) as unknown as MinimalOP20;

async function main() {
  // Read token info
  const name = await example.name();
  const symbol = await example.symbol();
  const totalSupply = await example.totalSupply();
  const decimals = await example.decimals();
  const myBalance = await example.balanceOf(Configs.ADDRESS);

  console.log('Token Name:', name.properties.name);
  console.log('Symbol:', symbol.properties.symbol);
  console.log('Total Supply:', totalSupply.properties.totalSupply);
  console.log('Decimals:', decimals.properties.decimals);
  console.log('My Balance:', myBalance.properties.balance);

  // Simulate a transfer
  const transferSimulation = await example.transfer(Configs.ADDRESS, 10000n);

  // Send transaction
  const tx = await transferSimulation.sendTransaction({
    signer: Configs.WALLET.keypair,   // ✅ Signer
    refundTo: Configs.ADDRESS.toString(), 
    maximumAllowedSatToSpend: 5000n,
    feeRate: 10,
    network: 'regtest' as any,
  });

  console.log('Transaction sent:', tx);
}

// Run main
main().catch(err => {
  console.error('Error running OP_NET interaction:', err);
  process.exit(1);
});
