import { base } from 'viem/chains';
import { queryBirdeye } from './base';
import { BIRDEYE_CHAIN_MAP } from './constants';

import {
  TopTradersByTokenResponse,
  TopTradersByTokenSortBy,
  TopTradersByTokenSortType,
  TopTradersByTokenTimeFrame,
} from './types';

interface GetTopTradersByTokenParams {
  address: string;
  timeFrame?: TopTradersByTokenTimeFrame;
  sortType?: TopTradersByTokenSortType;
  sortBy?: TopTradersByTokenSortBy;
  offset?: number;
  limit?: number;
  chainId?: number;
}

export const getTopTradersByToken = async ({
  address,
  timeFrame = TopTradersByTokenTimeFrame.TwentyFourHours,
  sortType = TopTradersByTokenSortType.Descending,
  sortBy = TopTradersByTokenSortBy.Volume,
  offset = 0,
  limit = 10,
  chainId = base.id,
}: GetTopTradersByTokenParams): Promise<TopTradersByTokenResponse> => {
  return queryBirdeye<TopTradersByTokenResponse>(
    'defi/v2/tokens/top_traders',
    BIRDEYE_CHAIN_MAP[chainId],
    {
      address,
      time_frame: timeFrame,
      sort_type: sortType,
      sort_by: sortBy,
      offset,
      limit,
    }
  );
};
