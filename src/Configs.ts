// src/Configs.ts
import { Wallet, Address } from '@btc-vision/transaction';

// Load private key from environment variable (GitHub Actions secret)
const PRIVATE_KEY = process.env.OP_WALLET_PRIVATE_KEY;
if (!PRIVATE_KEY) {
  throw new Error('Missing OP_WALLET_PRIVATE_KEY environment variable');
}

// Create Wallet from private key
export const WALLET = new Wallet(PRIVATE_KEY);

// Derive address (mldsa public key hash)
export const ADDRESS = new Address(WALLET.keypair.publicKey);

// Export all configs together
export const Configs = {
  WALLET,
  ADDRESS,
};
