import { base } from 'viem/chains';
import { queryBirdeye } from './base';
import { BIRDEYE_CHAIN_MAP } from './constants';
import { TradesResponse, TxType } from './types/trades';

interface SeekTradesByTimeParams {
  address: string;
  offset?: number;
  limit?: number;
  txType?: TxType;
  beforeTime?: number;
  afterTime?: number;
  chainId?: number;
}

export const seekTradesByTime = async ({
  address,
  offset = 0,
  limit = 100,
  txType = 'swap',
  beforeTime = 0,
  afterTime = 0,
  chainId = base.id,
}: SeekTradesByTimeParams): Promise<TradesResponse> => {
  return queryBirdeye<TradesResponse>(
    'trader/txs/seek_by_time',
    BIRDEYE_CHAIN_MAP[chainId],
    {
      address,
      offset,
      limit,
      tx_type: txType,
      before_time: beforeTime,
      after_time: afterTime,
    }
  );
};
