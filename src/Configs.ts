import * as bip39 from '@scure/bip39';
import { HDKey } from '@scure/bip32';
import * as secp from '@noble/secp256k1';

const mnemonic = process.env.OP_WALLET_MNEMONIC;

if (!mnemonic) {
  throw new Error('Missing OP_WALLET_MNEMONIC');
}

// 1. mnemonic → seed
const seed = await bip39.mnemonicToSeed(mnemonic);

// 2. BIP86 path (Taproot)
const hd = HDKey.fromMasterSeed(seed);
const child = hd.derive("m/86'/0'/0'/0/0");

if (!child.privateKey) {
  throw new Error('Failed to derive private key');
}

const privateKey = child.privateKey;
const publicKey = secp.getPublicKey(privateKey, true); // x-only compatible
export const Configs = publicKey;

