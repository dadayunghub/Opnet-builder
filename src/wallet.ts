import { Wallet } from '@btc-vision/transaction';
import * as bip39 from '@scure/bip39';
import { HDKey } from '@scure/bip32';

const mnemonic = process.env.OP_WALLET_MNEMONIC;
if (!mnemonic) {
  throw new Error('Missing OP_WALLET_MNEMONIC');
}

// 1. Convert mnemonic → seed
const seed = await bip39.mnemonicToSeed(mnemonic);

// 2. Create wallet from seed
export const Configs = Wallet.fromSeed(seed);
