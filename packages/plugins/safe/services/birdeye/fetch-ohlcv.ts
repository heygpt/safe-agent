import { base } from 'viem/chains';
import { queryBirdeye } from './base';
import { BIRDEYE_CHAIN_MAP } from './constants';
import { OHLCVResponse, OHLCVTimeframe } from './types/ohlcv';

interface FetchOHLCVParams {
  address: string;
  timeframe?: OHLCVTimeframe;
  timeFrom: number;
  timeTo: number;
  chainId?: number;
}

export const fetchOHLCV = async ({
  address,
  timeframe = OHLCVTimeframe.FifteenMinutes,
  timeFrom,
  timeTo,
  chainId = base.id,
}: FetchOHLCVParams): Promise<OHLCVResponse> => {
  return queryBirdeye<OHLCVResponse>('defi/ohlcv', BIRDEYE_CHAIN_MAP[chainId], {
    address,
    type: timeframe,
    time_from: timeFrom,
    time_to: timeTo,
  });
};
