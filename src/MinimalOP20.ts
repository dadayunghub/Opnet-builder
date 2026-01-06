import { Address } from '@btc-vision/transaction';

export interface MinimalOP20 {
  transfer(to: string | Address, amount: bigint): Promise<any>;
  balanceOf(address: string | Address): Promise<any>;
  name(): Promise<any>;
  symbol(): Promise<any>;
  totalSupply(): Promise<any>;
  decimals(): Promise<any>;
}
