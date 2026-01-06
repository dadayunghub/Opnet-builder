import { Wallet } from '@btc-vision/transaction';

const mnemonic = process.env.OP_WALLET_MNEMONIC;

if (!mnemonic) {
  throw new Error('Missing OP_WALLET_MNEMONIC env variable');
}

export const wallet = Wallet.fromMnemonic(mnemonic);
