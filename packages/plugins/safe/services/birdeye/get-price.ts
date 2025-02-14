import { base } from 'viem/chains';
import { queryBirdeye } from './base';
import { BIRDEYE_CHAIN_MAP } from './constants';

import type { Price } from './types';

export const getPrice = async (
  address: string,
  chainId: number = base.id
): Promise<Price> => {
  return queryBirdeye<Price>('defi/price', BIRDEYE_CHAIN_MAP[chainId], {
    address,
    include_liquidity: 'true',
  });
};
