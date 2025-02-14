import { base } from 'viem/chains';
import { queryBirdeye } from './base';
import { BIRDEYE_CHAIN_MAP } from './constants';

import { TimeFrame, TopTradersResponse } from './types';

export const getTopTraders = async (
  timeFrame: TimeFrame = TimeFrame.Week,
  offset: number = 0,
  limit: number = 10,
  chainId: number = base.id
): Promise<TopTradersResponse> => {
  return queryBirdeye<TopTradersResponse>(
    'trader/gainers-losers',
    BIRDEYE_CHAIN_MAP[chainId],
    {
      type: timeFrame,
      sort_by: 'PnL',
      sort_type: 'desc',
      offset,
      limit,
    }
  );
};
