import {
  getContract,
  OP_20_ABI,
  OP_20Contract,
  JSONRpcProvider,
  TransactionParameters
} from 'opnet';
import { Wallet, Address } from '@btc-vision/transaction';

// 1️⃣ Wallet setup
const mnemonic = process.env.OP_WALLET_MNEMONIC;
if (!mnemonic) throw new Error("Missing OP_WALLET_MNEMONIC env variable");

const wallet = Wallet.fromSeed(mnemonic); // correct method
const yourAddress = new Address(wallet.keypair.publicKey);

// 2️⃣ Network & provider
const NETWORK = "regtest"; // string literal for regtest
const provider = new JSONRpcProvider("https://regtest.opnet.org", NETWORK);

// 3️⃣ Main async function
async function main() {
  // Replace with the test OP_20 contract address you want to interact with
  const CONTRACT_ADDRESS = "bcrt1plz0svv3wl05qrrv0dx8hvh5mgqc7jf3mhqgtw8jnj3l3d3cs6lzsfc3mxh";

  // 4️⃣ Get contract instance
  const example: OP_20Contract = getContract<OP_20Contract>(
    CONTRACT_ADDRESS,
    OP_20_ABI,
    provider,
    NETWORK,
    yourAddress
  );

  // 5️⃣ Read basic info
  const name = await example.name();
  const symbol = await example.symbol();
  const totalSupply = await example.totalSupply();
  const decimals = await example.decimals();
  const myBalance = await example.balanceOf(yourAddress);

  console.log("Name:", name.properties.name);
  console.log("Symbol:", symbol.properties.symbol);
  console.log("Total Supply:", totalSupply.properties.totalSupply);
  console.log("Decimals:", decimals.properties.decimals);
  console.log("My Balance:", myBalance.properties.balance);

  // 6️⃣ Simulate a transfer
  const transferSimulation = await example.transfer(yourAddress, 10000n);
  const txParams: TransactionParameters = {
    signer: wallet.keypair,         // keypair that signs tx
    refundTo: wallet.p2tr,          // leftover funds go here
    maximumAllowedSatToSpend: 5000n, 
    feeRate: 10, 
    network: NETWORK
  };

  const tx = await transferSimulation.sendTransaction(txParams);
  console.log("Transaction created!", tx);
}

// 7️⃣ Run main
main().catch(err => {
  console.error("Error running OP_NET interaction:", err);
  process.exit(1);
});
