import { base } from 'viem/chains';
import { queryBirdeye } from './base';
import { BIRDEYE_CHAIN_MAP } from './constants';
import { TrendingTokensResponse } from './types/trending';

export const getTrendingTokens = async (
  offset: number = 0,
  limit: number = 20,
  chainId: number = base.id
): Promise<TrendingTokensResponse> => {
  return queryBirdeye<TrendingTokensResponse>(
    'defi/token_trending',
    BIRDEYE_CHAIN_MAP[chainId],
    {
      sort_by: 'rank',
      sort_type: 'asc',
      offset,
      limit,
    }
  );
};
