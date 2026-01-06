import * as bip39 from '@scure/bip39';
import { HDKey } from '@scure/bip32';
import ECPairFactory from 'ecpair';
import * as ecc from 'tiny-secp256k1';
import { Address } from '@btc-vision/transaction';

const ECPair = ECPairFactory(ecc);

const mnemonic = process.env.OP_WALLET_MNEMONIC;
if (!mnemonic) throw new Error('Missing OP_WALLET_MNEMONIC');

const seed = await bip39.mnemonicToSeed(mnemonic);
const hd = HDKey.fromMasterSeed(seed);
const child = hd.derive("m/86'/0'/0'/0/0");

if (!child.privateKey) throw new Error('No private key');

// ✅ This satisfies ECPairInterface
const keypair = ECPair.fromPrivateKey(child.privateKey, {
  compressed: true,
});

export const Configs = {
  SIGNER: keypair,
  ADDRESS: new Address(keypair.publicKey),
};
