import { base } from 'viem/chains';
import { queryBirdeye } from './base';
import { BIRDEYE_CHAIN_MAP } from './constants';

import { TokenMetadata } from './types';

export const getTokenMetadata = async (
  address: string,
  chainId: number = base.id
): Promise<TokenMetadata> => {
  return queryBirdeye<TokenMetadata>(
    'defi/v3/token/meta-data/single',
    BIRDEYE_CHAIN_MAP[chainId],
    { address }
  );
};
