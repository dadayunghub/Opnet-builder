import { Network } from '@btc-vision/bitcoin';
import { JSONRpcProvider } from 'opnet';

export const NETWORK = Network.REGTEST;

export const provider = new JSONRpcProvider(
  'https://regtest.opnet.org',
  NETWORK
);
