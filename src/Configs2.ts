import * as bip39 from '@scure/bip39';
import { HDKey } from '@scure/bip32';
import * as secp from '@noble/secp256k1';
import { NETWORK } from '@btc-vision/bitcoin';
import { Address } from '@btc-vision/transaction';

const mnemonic = process.env.OP_WALLET_MNEMONIC;
if (!mnemonic) throw new Error('Missing OP_WALLET_MNEMONIC');

// Seed → key
const seed = await bip39.mnemonicToSeed(mnemonic);
const hd = HDKey.fromMasterSeed(seed);
const child = hd.derive("m/86'/0'/0'/0/0");

if (!child.privateKey) throw new Error('No private key');

const privateKey = child.privateKey;
const publicKey = secp.getPublicKey(privateKey, true);
const address = new Address(publicKey);

export const Configs = {
  NETWORK: NETWORK.TESTNET,
  PRIVATE_KEY: privateKey,
  PUBLIC_KEY: publicKey,
  ADDRESS: address,
};
