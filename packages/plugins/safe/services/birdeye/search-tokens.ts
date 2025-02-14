import { base } from 'viem/chains';
import { queryBirdeye } from './base';

import { BIRDEYE_CHAIN_MAP } from './constants';
import type { SearchResponse } from './types/search';

interface SearchTokensParams {
  keyword: string;
  verifyToken?: boolean;
  offset?: number;
  limit?: number;
  chainId?: number;
}

export const searchTokens = async ({
  keyword,
  verifyToken,
  offset = 0,
  limit = 20,
  chainId = base.id,
}: SearchTokensParams): Promise<SearchResponse> => {
  const params: Record<string, string | number> = {
    keyword,
    chain: BIRDEYE_CHAIN_MAP[chainId],
    target: 'token',
    sort_by: 'liquidity',
    sort_type: 'desc',
    offset,
    limit,
  };

  if (verifyToken !== undefined) {
    params.verify_token = verifyToken.toString();
  }

  return queryBirdeye<SearchResponse>(
    'defi/v3/search',
    BIRDEYE_CHAIN_MAP[chainId],
    params
  );
};
