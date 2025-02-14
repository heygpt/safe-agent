import { base } from 'viem/chains';
import { queryBirdeye } from './base';
import { BIRDEYE_CHAIN_MAP } from './constants';

import type { Price } from './types';

export const getPrices = async (
  addresses: string[],
  chainId: number = base.id
): Promise<Record<string, Price | null>> => {
  return queryBirdeye<Record<string, Price>>(
    'defi/multi_price',
    BIRDEYE_CHAIN_MAP[chainId],
    {
      list_address: addresses.join(','),
      include_liquidity: 'true',
    }
  );
};
